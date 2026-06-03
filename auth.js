/* ============================================================
   AUTH MODULE — Mundial 2026 Analytics
   Requires @supabase/supabase-js CDN loaded before this file.
   ============================================================ */

const _SB_URL  = 'https://piqtpwzoewufjwlluniq.supabase.co';
const _SB_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpcXRwd3pvZXd1Zmp3bGx1bmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MDQ5ODgsImV4cCI6MjA5NjA4MDk4OH0.nrsfGr8Oil-EDEHog_HucHx0pQCyvxp0RWlW99yFQI4';
const _ADMIN   = 'msmgxe@gmail.com';

const _sb = window.supabase.createClient(_SB_URL, _SB_ANON);

// Returns { session, profile } or redirects to /login
async function requireAuth() {
  const { data: { session } } = await _sb.auth.getSession();
  if (!session) { window.location.href = '/login'; return null; }

  const { data: profile } = await _sb
    .from('profiles')
    .select('is_active')
    .eq('id', session.user.id)
    .single();

  if (profile && !profile.is_active) {
    await _sb.auth.signOut();
    window.location.href = '/login?suspended=1';
    return null;
  }

  return { session, profile };
}

// Returns session or null (no redirect — use on login page to check existing session)
async function getSession() {
  const { data: { session } } = await _sb.auth.getSession();
  return session;
}

async function signOut() {
  await _sb.auth.signOut();
  window.location.href = '/login';
}

function isAdmin(session) {
  return session?.user?.email === _ADMIN;
}

// Injects a slim top bar showing the logged-in user
function injectUserBar(session) {
  const admin = isAdmin(session);
  const bar = document.createElement('div');
  bar.id = 'wc-user-bar';
  Object.assign(bar.style, {
    position: 'fixed', top: '0', left: '0', right: '0', zIndex: '9999',
    display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
    gap: '0.6rem', padding: '0.35rem 1rem',
    background: 'rgba(4,8,18,0.92)', backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: '#64748b'
  });
  bar.innerHTML = `
    <span>⚽</span>
    <span>Acceso: <strong style="color:#94a3b8">${session.user.email}</strong></span>
    ${admin
      ? `<a href="/admin" style="color:#fbbf24;text-decoration:none;font-weight:700;border:1px solid rgba(251,191,36,0.3);padding:2px 8px;border-radius:4px;white-space:nowrap">⚙ Admin</a>`
      : ''}
    <button onclick="signOut()" style="background:none;border:1px solid rgba(239,68,68,0.35);color:#ef4444;padding:2px 8px;border-radius:4px;cursor:pointer;font-size:0.7rem">Salir</button>
  `;
  document.body.prepend(bar);
  document.body.style.paddingTop = (parseInt(document.body.style.paddingTop) || 0) + 30 + 'px';
}
