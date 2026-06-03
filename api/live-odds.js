/* ============================================================
   Vercel Serverless — Live Bookmaker Odds (TheOddsAPI)
   GET /api/live-odds → upcoming WC matches with bookmaker odds
   Covers: Betsson, Betano, Bet365, Pinnacle (if available)
   Manual entry (admin) covers: Apuesta Total, Inkabet
   ============================================================ */

const ODDS_KEY = process.env.ODDS_API_KEY;
const BASE     = 'https://api.the-odds-api.com/v4/sports/soccer_fifa_world_cup/odds/';

// Bookmakers to request (those available in TheOddsAPI for soccer)
const BOOKMAKERS = 'betsson,betano,bet365,pinnacle,unibet,williamhill';

// Display name mapping
const BK_NAMES = {
  betsson:     'Betsson',
  betano:      'Betano',
  bet365:      'Bet365',
  pinnacle:    'Pinnacle',
  unibet:      'Unibet',
  williamhill: 'William Hill',
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60'); // cache 5 min

  if (!ODDS_KEY) {
    return res.status(503).json({ error: 'ODDS_API_KEY no configurado.', games: [] });
  }

  try {
    const url = `${BASE}?apiKey=${ODDS_KEY}&regions=eu,us,uk&markets=h2h&oddsFormat=decimal&bookmakers=${BOOKMAKERS}`;
    const r = await fetch(url);
    const data = await r.json();

    if (!r.ok) {
      return res.status(r.status).json({ error: data.message || 'Error de API', games: [] });
    }

    // Remaining requests header
    const remaining = r.headers.get('x-requests-remaining') || '?';
    const used      = r.headers.get('x-requests-used') || '?';

    // Normalize response
    const games = (Array.isArray(data) ? data : []).map(g => {
      const odds = {};
      (g.bookmakers || []).forEach(bk => {
        const h2h = bk.markets?.find(m => m.key === 'h2h');
        if (!h2h) return;
        odds[bk.key] = {
          name: BK_NAMES[bk.key] || bk.title,
          home: h2h.outcomes?.find(o => o.name === g.home_team)?.price ?? null,
          draw: h2h.outcomes?.find(o => o.name === 'Draw')?.price ?? null,
          away: h2h.outcomes?.find(o => o.name === g.away_team)?.price ?? null,
          lastUpdate: h2h.last_update,
        };
      });

      return {
        id:         g.id,
        commenceAt: g.commence_time,
        home:       g.home_team,
        away:       g.away_team,
        odds,
      };
    });

    return res.json({ games, remaining: +remaining, used: +used, updatedAt: new Date().toISOString() });
  } catch (err) {
    return res.status(500).json({ error: err.message, games: [] });
  }
};
