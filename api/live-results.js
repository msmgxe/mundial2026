/* ============================================================
   Vercel Serverless — Live Results Proxy
   Proxies football-data.org for World Cup 2026 match results.
   Requires: FOOTBALL_API_KEY env var (free at football-data.org)
   GET /api/live-results → all WC 2026 matches with scores
   ============================================================ */

const API_KEY = process.env.FOOTBALL_API_KEY;
const WC_URL  = 'https://api.football-data.org/v4/competitions/WC/matches?season=2026';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=60'); // cache 2 min

  if (!API_KEY) {
    return res.status(503).json({ error: 'FOOTBALL_API_KEY no configurado.', matches: [] });
  }

  try {
    const r = await fetch(WC_URL, {
      headers: { 'X-Auth-Token': API_KEY }
    });

    if (!r.ok) {
      const txt = await r.text();
      return res.status(r.status).json({ error: `API error: ${txt}`, matches: [] });
    }

    const data = await r.json();
    // Normalize to what the frontend expects
    const matches = (data.matches || []).map(m => ({
      id:       m.id,
      date:     m.utcDate,
      status:   m.status,           // SCHEDULED | IN_PLAY | PAUSED | FINISHED | POSTPONED
      stage:    m.stage,            // GROUP_STAGE | ROUND_OF_32 | etc.
      group:    m.group,            // GROUP_A … GROUP_L
      home:     m.homeTeam?.name,
      away:     m.awayTeam?.name,
      score1:   m.score?.fullTime?.home ?? null,
      score2:   m.score?.fullTime?.away ?? null,
      score1ht: m.score?.halfTime?.home ?? null,
      score2ht: m.score?.halfTime?.away ?? null,
    }));

    return res.json({ matches, updatedAt: new Date().toISOString() });
  } catch (err) {
    return res.status(500).json({ error: err.message, matches: [] });
  }
};
