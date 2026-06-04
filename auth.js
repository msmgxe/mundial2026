/* ============================================================
   AUTH MODULE — Mundial 2026 Analytics
   - Single-device enforcement via Supabase user metadata
   - 5-minute inactivity timeout with 30-second warning
   Requires @supabase/supabase-js CDN loaded before this file.
   ============================================================ */

const _SB_URL  = 'https://piqtpwzoewufjwlluniq.supabase.co';
const _SB_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpcXRwd3pvZXd1Zmp3bGx1bmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MDQ5ODgsImV4cCI6MjA5NjA4MDk4OH0.nrsfGr8Oil-EDEHog_HucHx0pQCyvxp0RWlW99yFQI4';
const _ADMIN   = 'msmgxe@gmail.com';

const _sb = window.supabase.createClient(_SB_URL, _SB_ANON);

/* ── Theme init — before render to avoid flash ─────────────── */
(function() {
  const saved = localStorage.getItem('wc2026-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
})();

function toggleTheme() {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('wc2026-theme', next);
  const icon  = document.getElementById('wc-theme-icon');
  const label = document.getElementById('wc-theme-label');
  if (icon)  icon.textContent  = next === 'dark' ? '☀️' : '🌙';
  if (label) label.textContent = next === 'dark' ? 'Día' : 'Noche';
}

/* ── Device ID ─────────────────────────────────────────────── */
function _getDeviceId() {
  let id = localStorage.getItem('wc2026-device');
  if (!id) {
    id = 'dev_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 9);
    localStorage.setItem('wc2026-device', id);
  }
  return id;
}

/* ── requireAuth ───────────────────────────────────────────── */
async function requireAuth() {
  const { data: { session } } = await _sb.auth.getSession();
  if (!session) { window.location.href = '/login'; return null; }

  /* Profile check */
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

  /* Single-device check via user metadata */
  const deviceId = _getDeviceId();
  const storedDevice = session.user.user_metadata?.device_id;

  if (storedDevice && storedDevice !== deviceId) {
    await _sb.auth.signOut();
    window.location.href = '/login?kicked=1';
    return null;
  }

  return { session, profile };
}

async function getSession() {
  const { data: { session } } = await _sb.auth.getSession();
  return session;
}

async function signOut() {
  _clearActivityTimer();
  await _sb.auth.signOut();
  window.location.href = '/login';
}

function isAdmin(session) {
  return session?.user?.email === _ADMIN;
}

/* ── Activity Timeout (5 min = 300 s, warning at 30 s left) ─ */
const TIMEOUT_MS  = 5 * 60 * 1000;   // 5 minutes
const WARNING_MS  = 30 * 1000;        // warn 30 s before
let   _activityTimer = null;
let   _warningTimer  = null;
let   _countdownInterval = null;

function _clearActivityTimer() {
  clearTimeout(_activityTimer);
  clearTimeout(_warningTimer);
  clearInterval(_countdownInterval);
}

function _hideWarning() {
  const el = document.getElementById('session-warning');
  if (el) el.classList.remove('show');
  clearInterval(_countdownInterval);
}

function _showWarning() {
  const el = document.getElementById('session-warning');
  const countEl = document.getElementById('sw-countdown');
  if (!el) return;
  el.classList.add('show');
  let secs = Math.ceil(WARNING_MS / 1000);
  if (countEl) countEl.textContent = secs;
  _countdownInterval = setInterval(() => {
    secs--;
    if (countEl) countEl.textContent = secs;
    if (secs <= 0) clearInterval(_countdownInterval);
  }, 1000);
}

function _resetTimer() {
  _clearActivityTimer();
  _hideWarning();
  _activityTimer = setTimeout(async () => {
    _showWarning();
    _warningTimer = setTimeout(async () => {
      _clearActivityTimer();
      await _sb.auth.signOut();
      window.location.href = '/login?timeout=1';
    }, WARNING_MS);
  }, TIMEOUT_MS - WARNING_MS);
}

function _initActivityTracker() {
  const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
  let throttle = false;
  const handler = () => {
    if (throttle) return;
    throttle = true;
    setTimeout(() => { throttle = false; }, 3000); // throttle to once per 3s
    _resetTimer();
  };
  events.forEach(e => window.addEventListener(e, handler, { passive: true }));
  _resetTimer(); // start on load
}

/* ── Nav Bar ───────────────────────────────────────────────── */
function injectUserBar(session) {
  /* Inject session-warning toast */
  if (!document.getElementById('session-warning')) {
    const toast = document.createElement('div');
    toast.id = 'session-warning';
    toast.innerHTML = `
      <span>⏱ Sesión expira en</span>
      <span class="sw-time"><span id="sw-countdown">30</span>s</span>
      <button onclick="(function(){_resetTimer();document.getElementById('session-warning').classList.remove('show')})()">
        Continuar
      </button>`;
    document.body.appendChild(toast);
  }

  /* Start activity tracker */
  _initActivityTracker();

  const admin   = isAdmin(session);
  const current = location.pathname.replace(/\/$/, '') || '/';

  const navLink = (href, label) => {
    const active = current === href || (href === '/' && current === '');
    return `<a href="${href}" style="
      color:${active ? '#E64A26' : '#3D3F52'};
      text-decoration:none;
      font-weight:${active ? 800 : 600};
      padding:4px 10px;
      border-radius:6px;
      white-space:nowrap;
      font-size:0.75rem;
      font-family:'Outfit',sans-serif;
      background:${active ? 'rgba(230,74,38,0.08)' : 'none'};
      border:1px solid ${active ? 'rgba(230,74,38,0.25)' : 'transparent'};
      transition:all 0.15s">${label}</a>`;
  };

  const bar = document.createElement('div');
  bar.id = 'wc-user-bar';
  document.body.prepend(bar);
  document.body.style.paddingTop = (parseInt(document.body.style.paddingTop) || 0) + 44 + 'px';

  const curTheme = document.documentElement.getAttribute('data-theme') || 'light';

  bar.innerHTML = `
    <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
      <span style="font-family:'Bebas Neue','Outfit',sans-serif;font-size:1rem;color:#E64A26;letter-spacing:0.06em;margin-right:4px;font-weight:900;">WC26</span>
      ${navLink('/', '⚽ Fixture')}
      ${navLink('/pronosticos', '📊 Pronósticos')}
      ${navLink('/bracket', '🌳 Bracket')}
    </div>
    <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;font-family:'Inter',sans-serif;">
      <!-- Theme toggle -->
      <button onclick="toggleTheme()" id="wc-theme-toggle"
        style="display:inline-flex;align-items:center;gap:4px;background:none;border:1px solid rgba(0,0,0,0.15);color:#6A6458;padding:3px 10px;border-radius:6px;cursor:pointer;font-size:0.68rem;font-family:'Outfit',sans-serif;font-weight:700;transition:all 0.15s;"
        title="Cambiar tema">
        <span id="wc-theme-icon">${curTheme === 'dark' ? '☀️' : '🌙'}</span>
        <span id="wc-theme-label">${curTheme === 'dark' ? 'Día' : 'Noche'}</span>
      </button>
      <span style="font-size:0.7rem;color:#6A6458;max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${session.user.email}</span>
      ${admin ? `<a href="/admin" style="color:#9A6B00;text-decoration:none;font-weight:700;border:1px solid rgba(154,107,0,0.3);padding:3px 10px;border-radius:6px;white-space:nowrap;font-size:0.72rem;font-family:'Outfit',sans-serif">⚙ Admin</a>` : ''}
      <button onclick="signOut()" style="background:none;border:1px solid rgba(192,40,30,0.3);color:#C0281E;padding:3px 10px;border-radius:6px;cursor:pointer;font-size:0.72rem;font-family:'Outfit',sans-serif;font-weight:700">Salir</button>
    </div>`;
}
