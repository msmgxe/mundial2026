/* ============================================================
   Vercel Serverless — Live Results Proxy (ESPN, sin API key)
   GET /api/live-results → 104 partidos del Mundial 2026
   ============================================================ */

const ESPN_URL =
  'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard' +
  '?dates=20260611-20260719&limit=120';

// ESPN displayName → nombre en español (igual que matchesData en index.js)
const ESPN_MAP = {
  "Mexico":"México","South Africa":"Sudáfrica","South Korea":"Corea del Sur",
  "Czechia":"República Checa","Czech Republic":"República Checa",
  "Canada":"Canadá","Bosnia-Herzegovina":"Bosnia y Herzegovina",
  "Qatar":"Catar","Switzerland":"Suiza","Brazil":"Brasil","Morocco":"Marruecos",
  "Haiti":"Haití","Scotland":"Escocia","United States":"Estados Unidos",
  "Paraguay":"Paraguay","Australia":"Australia",
  "Türkiye":"Turquía","Turkey":"Turquía","Germany":"Alemania",
  "Curaçao":"Curazao","Curacao":"Curazao","Ivory Coast":"Costa de Marfil",
  "Ecuador":"Ecuador","Netherlands":"Países Bajos","Japan":"Japón",
  "Sweden":"Suecia","Tunisia":"Túnez","Belgium":"Bélgica","Egypt":"Egipto",
  "Iran":"Irán","New Zealand":"Nueva Zelanda","Spain":"España",
  "Cape Verde":"Cabo Verde","Saudi Arabia":"Arabia Saudita","Uruguay":"Uruguay",
  "France":"Francia","Senegal":"Senegal","Iraq":"Irak","Norway":"Noruega",
  "Argentina":"Argentina","Algeria":"Argelia","Austria":"Austria",
  "Jordan":"Jordania","Portugal":"Portugal","Congo DR":"RD Congo",
  "DR Congo":"RD Congo","Uzbekistan":"Uzbekistán","Colombia":"Colombia",
  "England":"Inglaterra","Croatia":"Croacia","Ghana":"Ghana","Panama":"Panamá"
};

// ESPN status → estado normalizado
function normalizeStatus(espnStatus) {
  switch (espnStatus) {
    case 'STATUS_FULL_TIME':
    case 'STATUS_FINAL_AET':
    case 'STATUS_FINAL_PEN':  return 'FINISHED';
    case 'STATUS_IN_PROGRESS': return 'IN_PLAY';
    case 'STATUS_HALFTIME':   return 'PAUSED';
    default:                   return 'SCHEDULED';
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=60');

  try {
    const r = await fetch(ESPN_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Mundial2026/1.0)' }
    });

    if (!r.ok) {
      return res.status(r.status).json({ error: `ESPN API error ${r.status}`, matches: [] });
    }

    const data = await r.json();

    const matches = (data.events || []).map(event => {
      const comp   = event.competitions?.[0];
      const status = normalizeStatus(comp?.status?.type?.name);
      const home   = comp?.competitors?.find(c => c.homeAway === 'home');
      const away   = comp?.competitors?.find(c => c.homeAway === 'away');

      const isLive = status === 'FINISHED' || status === 'IN_PLAY' || status === 'PAUSED';
      const s1 = isLive && home?.score != null ? parseInt(home.score, 10) : null;
      const s2 = isLive && away?.score != null ? parseInt(away.score, 10) : null;

      return {
        id:       event.id,
        date:     event.date,
        status,
        home:     ESPN_MAP[home?.team?.displayName] || home?.team?.displayName,
        away:     ESPN_MAP[away?.team?.displayName] || away?.team?.displayName,
        score1:   s1,
        score2:   s2,
      };
    });

    return res.json({ matches, updatedAt: new Date().toISOString(), source: 'espn' });
  } catch (err) {
    return res.status(500).json({ error: err.message, matches: [] });
  }
};
