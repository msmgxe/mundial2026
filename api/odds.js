/* ============================================================
   Vercel Serverless — Betting Odds API
   GET  /api/odds              → list all odds (public)
   GET  /api/odds?matchId=N    → odds for one match (public)
   POST /api/odds?action=upsert → create/update odds (admin)
   DELETE /api/odds?matchId=N&bookmaker=X → delete (admin)
   ============================================================ */

const SB_URL      = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANON_KEY    = process.env.SUPABASE_ANON_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'msmgxe@gmail.com';

const svcH = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${SERVICE_KEY}`,
  'apikey': SERVICE_KEY
});

async function verifyAdmin(token) {
  if (!token) return null;
  const r = await fetch(`${SB_URL}/auth/v1/user`, {
    headers: { 'Authorization': `Bearer ${token}`, 'apikey': ANON_KEY }
  });
  const u = await r.json();
  return u?.email === ADMIN_EMAIL ? u : null;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // ── PUBLIC: read odds ──────────────────────────────────────────
  if (req.method === 'GET' && !req.query.action) {
    const matchId = req.query.matchId;
    let url = `${SB_URL}/rest/v1/match_odds?select=*&order=match_id.asc,bookmaker.asc`;
    if (matchId) url += `&match_id=eq.${matchId}`;
    const r = await fetch(url, { headers: svcH() });
    const data = await r.json();
    return res.json(Array.isArray(data) ? data : []);
  }

  // ── PROTECTED: write / delete ──────────────────────────────────
  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  const admin = await verifyAdmin(token);
  if (!admin) return res.status(403).json({ error: 'Solo el administrador puede modificar cuotas.' });

  // Upsert
  if (req.query.action === 'upsert' && req.method === 'POST') {
    const { match_id, team1, team2, bookmaker, odd1, odd_x, odd2, match_date } = req.body || {};
    if (!match_id || !bookmaker) return res.status(400).json({ error: 'match_id y bookmaker requeridos.' });

    const r = await fetch(`${SB_URL}/rest/v1/match_odds`, {
      method: 'POST',
      headers: { ...svcH(), 'Prefer': 'resolution=merge-duplicates,return=representation' },
      body: JSON.stringify({ match_id: +match_id, team1, team2, bookmaker, odd1: +odd1||null, odd_x: +odd_x||null, odd2: +odd2||null, match_date, updated_at: new Date().toISOString() })
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data.message || 'Error guardando cuotas.' });
    return res.json({ success: true, data });
  }

  // Delete
  if (req.method === 'DELETE') {
    const { matchId, bookmaker } = req.query;
    if (!matchId || !bookmaker) return res.status(400).json({ error: 'matchId y bookmaker requeridos.' });
    await fetch(`${SB_URL}/rest/v1/match_odds?match_id=eq.${matchId}&bookmaker=eq.${bookmaker}`, {
      method: 'DELETE', headers: svcH()
    });
    return res.json({ success: true });
  }

  return res.status(400).json({ error: 'Acción no reconocida.' });
};
