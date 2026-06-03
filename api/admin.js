/* ============================================================
   Vercel Serverless Function — Admin API
   /api/admin
   Uses Supabase REST API via native fetch (Node 18+)
   ============================================================ */

const SB_URL      = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANON_KEY    = process.env.SUPABASE_ANON_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'msmgxe@gmail.com';

const adminH = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${SERVICE_KEY}`,
  'apikey': SERVICE_KEY
});

// Verify that the request comes from the admin user
async function verifyAdmin(token) {
  if (!token) return null;
  const r = await fetch(`${SB_URL}/auth/v1/user`, {
    headers: { 'Authorization': `Bearer ${token}`, 'apikey': ANON_KEY }
  });
  if (!r.ok) return null;
  const user = await r.json();
  return user?.email === ADMIN_EMAIL ? user : null;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  const admin = await verifyAdmin(token);
  if (!admin) return res.status(403).json({ error: 'Solo el administrador puede acceder.' });

  const { action } = req.query;

  // ---- LIST USERS ----
  if (action === 'list') {
    const [usersRes, profilesRes] = await Promise.all([
      fetch(`${SB_URL}/auth/v1/admin/users?per_page=200`, { headers: adminH() }),
      fetch(`${SB_URL}/rest/v1/profiles?select=*`, { headers: adminH() })
    ]);
    const { users = [] } = await usersRes.json();
    const profiles = await profilesRes.json();
    const pMap = {};
    (Array.isArray(profiles) ? profiles : []).forEach(p => { pMap[p.id] = p; });
    const combined = users.map(u => ({ ...u, profile: pMap[u.id] || null }));
    return res.json({ users: combined });
  }

  // ---- CREATE USER ----
  if (action === 'create' && req.method === 'POST') {
    const { email, password, notes = '' } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email y contraseña requeridos.' });
    if (password.length < 6) return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });

    const r = await fetch(`${SB_URL}/auth/v1/admin/users`, {
      method: 'POST',
      headers: adminH(),
      body: JSON.stringify({ email, password, email_confirm: true })
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data.message || data.msg || 'Error creando usuario.' });

    // Save notes (including initial password hint if admin put it there)
    if (notes && data.id) {
      await fetch(`${SB_URL}/rest/v1/profiles?id=eq.${data.id}`, {
        method: 'PATCH',
        headers: { ...adminH(), 'Prefer': 'return=minimal' },
        body: JSON.stringify({ access_notes: notes })
      });
    }
    return res.json({ user: data });
  }

  // ---- TOGGLE ACTIVE ----
  if (action === 'toggle' && req.method === 'POST') {
    const { userId, isActive, notes } = req.body || {};
    if (!userId) return res.status(400).json({ error: 'userId requerido.' });
    const patch = { is_active: !!isActive };
    if (notes !== undefined) patch.access_notes = notes;
    const r = await fetch(`${SB_URL}/rest/v1/profiles?id=eq.${userId}`, {
      method: 'PATCH',
      headers: { ...adminH(), 'Prefer': 'return=minimal' },
      body: JSON.stringify(patch)
    });
    if (!r.ok) return res.status(r.status).json({ error: 'Error actualizando estado.' });
    return res.json({ success: true });
  }

  // ---- RESET PASSWORD ----
  if (action === 'resetPassword' && req.method === 'POST') {
    const { userId, newPassword, notes } = req.body || {};
    if (!userId || !newPassword) return res.status(400).json({ error: 'userId y newPassword requeridos.' });
    if (newPassword.length < 6) return res.status(400).json({ error: 'Mínimo 6 caracteres.' });

    const r = await fetch(`${SB_URL}/auth/v1/admin/users/${userId}`, {
      method: 'PUT',
      headers: adminH(),
      body: JSON.stringify({ password: newPassword })
    });
    if (!r.ok) {
      const d = await r.json();
      return res.status(r.status).json({ error: d.message || 'Error cambiando contraseña.' });
    }
    // Update notes with new password hint
    if (notes !== undefined) {
      await fetch(`${SB_URL}/rest/v1/profiles?id=eq.${userId}`, {
        method: 'PATCH',
        headers: { ...adminH(), 'Prefer': 'return=minimal' },
        body: JSON.stringify({ access_notes: notes })
      });
    }
    return res.json({ success: true });
  }

  // ---- DELETE USER ----
  if (action === 'delete' && req.method === 'DELETE') {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ error: 'userId requerido.' });
    const r = await fetch(`${SB_URL}/auth/v1/admin/users/${userId}`, {
      method: 'DELETE',
      headers: adminH()
    });
    if (!r.ok && r.status !== 404) return res.status(r.status).json({ error: 'Error eliminando usuario.' });
    return res.json({ success: true });
  }

  return res.status(400).json({ error: `Acción desconocida: ${action}` });
};
