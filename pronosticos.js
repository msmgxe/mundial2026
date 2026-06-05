/* ============================================================
   STATISTICAL ENGINE v2.0 — 5 PREDICTION MODELS
   Copa Mundial FIFA 2026™
   ============================================================ */

// Backward-compat alias used by bracket.html
const MODEL_METADATA = {
  name: "Modelo v2.0 · 5 Modelos combinados",
  updatedAt: "2026-06-04",
  source: "Manual · FIFA Ranking · Elo · Dixon-Coles · Ensemble",
  warning: "Probabilidades estimadas; no garantizan resultados reales."
};

// ── MODEL REGISTRY ────────────────────────────────────────────────
const PREDICTION_MODELS = [
  {
    id: "manual",
    name: "Rating Manual",
    shortName: "Manual",
    description: "Ratings subjetivos del analista (60–96). Sencillo y auditable.",
    color: "#E64A26",
    stars: 2,
    source: "Elaboración propia"
  },
  {
    id: "fifa",
    name: "FIFA Ranking",
    shortName: "FIFA",
    description: "Puntos oficiales FIFA (Jun 2026). Datos reales del organismo rector.",
    color: "#3B82F6",
    stars: 3,
    source: "fifa.com · Jun 2026"
  },
  {
    id: "elo",
    name: "Elo Fútbol",
    shortName: "Elo",
    description: "Sistema Elo histórico desde 1872. Estándar académico para fútbol.",
    color: "#8B5CF6",
    stars: 4,
    source: "eloratings.net"
  },
  {
    id: "poisson",
    name: "Dixon-Coles",
    shortName: "Poisson",
    description: "Modelo de Poisson con corrección DC. Simula goles por separado. El más preciso.",
    color: "#10B981",
    stars: 5,
    source: "Dixon & Coles (1997)"
  },
  {
    id: "combined",
    name: "Combinado",
    shortName: "Mixto",
    description: "Promedio ponderado de los 4 modelos. Mayor margen y robustez estadística.",
    color: "#F5C400",
    stars: 5,
    source: "Ensemble — 4 modelos"
  }
];

let activeModelId = "combined";

// ── MODEL 1: MANUAL RATINGS ───────────────────────────────────────
const TEAM_RATINGS = {
  "Argentina": 96, "Francia": 95, "España": 94, "Inglaterra": 94, "Brasil": 93,
  "Países Bajos": 92, "Portugal": 92, "Bélgica": 90, "Colombia": 89, "Uruguay": 89,
  "Alemania": 88, "Marruecos": 86, "Estados Unidos": 85, "Suiza": 84, "Japón": 84,
  "Croacia": 84, "Senegal": 82, "Corea del Sur": 81, "Ecuador": 80, "Suecia": 80,
  "Noruega": 79, "Austria": 78, "Turquía": 78, "Australia": 78, "República Checa": 78,
  "Egipto": 77, "Costa de Marfil": 75, "Paraguay": 74, "Argelia": 73, "Arabia Saudita": 73,
  "Ghana": 72, "Bosnia y Herzegovina": 72, "Túnez": 71, "Panamá": 70, "Catar": 70,
  "Sudáfrica": 69, "Irak": 68, "Uzbekistán": 68, "RD Congo": 67, "Jordania": 66,
  "Nueva Zelanda": 65, "Haití": 62, "Curazao": 60,
  "México": 83, "Canadá": 80, "Escocia": 76, "Irán": 75, "Cabo Verde": 60
};

function calcManual(t1, t2) {
  const r1 = TEAM_RATINGS[t1] || 70, r2 = TEAM_RATINGS[t2] || 70;
  const hosts = ["México","Estados Unidos","Canadá"];
  const h1 = hosts.includes(t1) ? 3 : 0, h2 = hosts.includes(t2) ? 3 : 0;
  const diff = (r1+h1) - (r2+h2);
  const w1 = 1/(1+Math.pow(10,-diff/20)), w2 = 1/(1+Math.pow(10,diff/20));
  const dr = 0.26*Math.exp(-Math.pow(diff/15,2));
  const tot = w1+w2+dr;
  const p1=Math.round(w1/tot*100), p2=Math.round(w2/tot*100);
  return { p1, p2, pDraw: 100-p1-p2 };
}

// ── MODEL 2: FIFA WORLD RANKING ───────────────────────────────────
// Approximate FIFA points as of June 2026
const FIFA_POINTS = {
  "Argentina": 1800, "Francia": 1756, "España": 1742, "Inglaterra": 1720, "Brasil": 1710,
  "Bélgica": 1703, "Portugal": 1692, "Países Bajos": 1680, "Colombia": 1658, "Uruguay": 1641,
  "Alemania": 1623, "Marruecos": 1600, "Japón": 1590, "Estados Unidos": 1578, "México": 1568,
  "Croacia": 1556, "Senegal": 1545, "Ecuador": 1530, "Suiza": 1518, "Corea del Sur": 1508,
  "Austria": 1498, "Turquía": 1488, "Australia": 1473, "Noruega": 1460, "Suecia": 1448,
  "República Checa": 1437, "Argelia": 1428, "Canadá": 1418, "Ghana": 1408, "Egipto": 1398,
  "Paraguay": 1388, "Costa de Marfil": 1378, "Arabia Saudita": 1358, "Túnez": 1348,
  "Bosnia y Herzegovina": 1338, "Irán": 1318, "Escocia": 1308, "Uzbekistán": 1290,
  "RD Congo": 1275, "Nueva Zelanda": 1260, "Catar": 1248, "Panamá": 1238,
  "Sudáfrica": 1228, "Irak": 1213, "Jordania": 1198, "Haití": 1178,
  "Cabo Verde": 1168, "Curazao": 1138
};

function calcFIFA(t1, t2) {
  const r1 = FIFA_POINTS[t1]||1200, r2 = FIFA_POINTS[t2]||1200;
  const hosts = ["México","Estados Unidos","Canadá"];
  const h1 = hosts.includes(t1)?50:0, h2 = hosts.includes(t2)?50:0;
  const diff = (r1+h1)-(r2+h2);
  const w1=1/(1+Math.pow(10,-diff/400)), w2=1/(1+Math.pow(10,diff/400));
  const dr=0.26*Math.exp(-Math.pow(diff/300,2));
  const tot=w1+w2+dr;
  const p1=Math.round(w1/tot*100), p2=Math.round(w2/tot*100);
  return { p1, p2, pDraw: 100-p1-p2 };
}

// ── MODEL 3: ELO FOOTBALL ─────────────────────────────────────────
// From eloratings.net (approximate June 2026)
const ELO_RATINGS = {
  "Argentina": 2052, "Francia": 2010, "España": 2005, "Inglaterra": 1996, "Brasil": 1988,
  "Portugal": 1975, "Países Bajos": 1970, "Alemania": 1965, "Colombia": 1955, "Bélgica": 1950,
  "Uruguay": 1944, "Marruecos": 1930, "Japón": 1924, "Croacia": 1918, "Estados Unidos": 1908,
  "México": 1903, "Suiza": 1898, "Senegal": 1893, "Ecuador": 1883, "Corea del Sur": 1878,
  "Canadá": 1870, "Austria": 1862, "Turquía": 1857, "Australia": 1848, "Noruega": 1842,
  "Suecia": 1835, "República Checa": 1825, "Argelia": 1815, "Egipto": 1810, "Ghana": 1805,
  "Paraguay": 1798, "Costa de Marfil": 1790, "Arabia Saudita": 1778, "Irán": 1768,
  "Túnez": 1760, "Bosnia y Herzegovina": 1750, "Escocia": 1742, "Uzbekistán": 1730,
  "RD Congo": 1718, "Catar": 1705, "Nueva Zelanda": 1695, "Panamá": 1685,
  "Sudáfrica": 1675, "Irak": 1662, "Jordania": 1648, "Haití": 1630,
  "Cabo Verde": 1618, "Curazao": 1592
};

function calcElo(t1, t2) {
  const r1=ELO_RATINGS[t1]||1650, r2=ELO_RATINGS[t2]||1650;
  const hosts = ["México","Estados Unidos","Canadá"];
  const h1=hosts.includes(t1)?65:0, h2=hosts.includes(t2)?65:0;
  const diff=(r1+h1)-(r2+h2);
  const w1=1/(1+Math.pow(10,-diff/400)), w2=1/(1+Math.pow(10,diff/400));
  const dr=0.28*Math.exp(-Math.pow(diff/300,2));
  const tot=w1+w2+dr;
  const p1=Math.round(w1/tot*100), p2=Math.round(w2/tot*100);
  return { p1, p2, pDraw: 100-p1-p2 };
}

// ── MODEL 4: DIXON-COLES (POISSON) ───────────────────────────────
// Attack/Defense strengths (avg WC goal rate ≈ 1.35 per team per game)
const DC_STRENGTHS = {
  "Argentina":            { atk:1.90, def:0.62 },
  "Brasil":               { atk:1.78, def:0.68 },
  "Francia":              { atk:1.75, def:0.65 },
  "España":               { atk:1.72, def:0.63 },
  "Inglaterra":           { atk:1.68, def:0.72 },
  "Portugal":             { atk:1.70, def:0.74 },
  "Alemania":             { atk:1.65, def:0.80 },
  "Países Bajos":         { atk:1.62, def:0.77 },
  "Bélgica":              { atk:1.58, def:0.82 },
  "Colombia":             { atk:1.50, def:0.88 },
  "Uruguay":              { atk:1.45, def:0.82 },
  "Marruecos":            { atk:1.30, def:0.70 },
  "Japón":                { atk:1.38, def:0.87 },
  "Croacia":              { atk:1.32, def:0.76 },
  "Estados Unidos":       { atk:1.32, def:0.93 },
  "México":               { atk:1.38, def:0.97 },
  "Suiza":                { atk:1.28, def:0.87 },
  "Senegal":              { atk:1.28, def:0.92 },
  "Ecuador":              { atk:1.22, def:0.97 },
  "Corea del Sur":        { atk:1.22, def:1.02 },
  "Canadá":               { atk:1.18, def:1.03 },
  "Austria":              { atk:1.20, def:0.98 },
  "Turquía":              { atk:1.18, def:1.00 },
  "Australia":            { atk:1.15, def:1.02 },
  "Noruega":              { atk:1.18, def:1.05 },
  "Suecia":               { atk:1.15, def:1.08 },
  "República Checa":      { atk:1.12, def:1.05 },
  "Argelia":              { atk:1.10, def:1.07 },
  "Egipto":               { atk:1.08, def:1.05 },
  "Ghana":                { atk:1.10, def:1.10 },
  "Paraguay":             { atk:1.05, def:1.08 },
  "Costa de Marfil":      { atk:1.10, def:1.12 },
  "Arabia Saudita":       { atk:1.05, def:1.12 },
  "Irán":                 { atk:1.00, def:1.05 },
  "Túnez":                { atk:1.02, def:1.10 },
  "Bosnia y Herzegovina": { atk:1.05, def:1.15 },
  "Escocia":              { atk:1.02, def:1.12 },
  "Uzbekistán":           { atk:0.98, def:1.15 },
  "RD Congo":             { atk:0.95, def:1.18 },
  "Catar":                { atk:0.92, def:1.25 },
  "Nueva Zelanda":        { atk:0.90, def:1.28 },
  "Panamá":               { atk:0.88, def:1.22 },
  "Sudáfrica":            { atk:0.90, def:1.25 },
  "Irak":                 { atk:0.88, def:1.20 },
  "Jordania":             { atk:0.85, def:1.22 },
  "Haití":                { atk:0.80, def:1.35 },
  "Cabo Verde":           { atk:0.78, def:1.35 },
  "Curazao":              { atk:0.72, def:1.45 }
};

function poissonPMF(lam, k) {
  if (lam <= 0) return k === 0 ? 1 : 0;
  let r = Math.exp(-lam);
  for (let i=1;i<=k;i++) r *= lam/i;
  return r;
}

function calcDixonColes(t1, t2) {
  const s1 = DC_STRENGTHS[t1]||{atk:1.05,def:1.1};
  const s2 = DC_STRENGTHS[t2]||{atk:1.05,def:1.1};
  const hosts = ["México","Estados Unidos","Canadá"];
  const ha1=hosts.includes(t1)?0.18:0, ha2=hosts.includes(t2)?0.18:0;
  const lam1=(s1.atk+ha1)*s2.def, lam2=(s2.atk+ha2)*s1.def;
  const rho=-0.13;
  const dcCorr=(i,j)=>{
    if(i===0&&j===0) return 1-lam1*lam2*rho;
    if(i===1&&j===0) return 1+lam2*rho;
    if(i===0&&j===1) return 1+lam1*rho;
    if(i===1&&j===1) return 1-rho;
    return 1;
  };
  let w1=0,dr=0,w2=0;
  for(let i=0;i<=8;i++) for(let j=0;j<=8;j++) {
    const p=poissonPMF(lam1,i)*poissonPMF(lam2,j)*dcCorr(i,j);
    if(i>j) w1+=p; else if(i===j) dr+=p; else w2+=p;
  }
  const tot=w1+dr+w2;
  const p1=Math.round(w1/tot*100), p2=Math.round(w2/tot*100);
  return { p1, p2, pDraw:100-p1-p2, lambda1:lam1.toFixed(2), lambda2:lam2.toFixed(2) };
}

// ── MODEL 5: WEIGHTED ENSEMBLE ────────────────────────────────────
function calcCombined(t1, t2) {
  const m1=calcManual(t1,t2), m2=calcFIFA(t1,t2);
  const m3=calcElo(t1,t2), m4=calcDixonColes(t1,t2);
  const w=[1,2,2,3], sum=8;
  const p1=Math.round((m1.p1*w[0]+m2.p1*w[1]+m3.p1*w[2]+m4.p1*w[3])/sum);
  const p2=Math.round((m1.p2*w[0]+m2.p2*w[1]+m3.p2*w[2]+m4.p2*w[3])/sum);
  return { p1, p2, pDraw:100-p1-p2 };
}

// ── UNIFIED CALCULATOR ────────────────────────────────────────────
function calculateMatchProbabilities(t1, t2, modelId=null) {
  const mid = modelId||activeModelId;
  let r;
  switch(mid){
    case "manual":  r=calcManual(t1,t2); break;
    case "fifa":    r=calcFIFA(t1,t2); break;
    case "elo":     r=calcElo(t1,t2); break;
    case "poisson": r=calcDixonColes(t1,t2); break;
    default:        r=calcCombined(t1,t2);
  }
  const { p1, p2, pDraw } = r;
  let recommendation, riskLevel, suggestedBet, estimatedScore1, estimatedScore2;
  if(p1>=75){
    recommendation=`Gana ${t1}`; riskLevel="Bajo";
    suggestedBet=`Victoria de ${t1} o doble oportunidad`;
    estimatedScore1=p1>85?3:2; estimatedScore2=0;
  } else if(p2>=75){
    recommendation=`Gana ${t2}`; riskLevel="Bajo";
    suggestedBet=`Victoria de ${t2} o doble oportunidad`;
    estimatedScore1=0; estimatedScore2=p2>85?3:2;
  } else if(p1>=55){
    recommendation=`${t1} o Empate`; riskLevel="Medio";
    suggestedBet=`Doble oportunidad: ${t1} o empate`;
    estimatedScore1=2; estimatedScore2=1;
  } else if(p2>=55){
    recommendation=`${t2} o Empate`; riskLevel="Medio";
    suggestedBet=`Doble oportunidad: ${t2} o empate`;
    estimatedScore1=1; estimatedScore2=2;
  } else {
    recommendation="Partido muy cerrado"; riskLevel="Alto";
    suggestedBet="Partido equilibrado — evaluar no apostar";
    estimatedScore1=1; estimatedScore2=1;
  }
  return { p1, p2, pDraw, recommendation, riskLevel, suggestedBet, estimatedScore1, estimatedScore2, ...r };
}

// All 5 models for comparison view
function getAllModelResults(t1, t2) {
  return [
    { ...calcManual(t1,t2),       model: PREDICTION_MODELS[0] },
    { ...calcFIFA(t1,t2),         model: PREDICTION_MODELS[1] },
    { ...calcElo(t1,t2),          model: PREDICTION_MODELS[2] },
    { ...calcDixonColes(t1,t2),   model: PREDICTION_MODELS[3] },
    { ...calcCombined(t1,t2),     model: PREDICTION_MODELS[4] },
  ];
}


// ── GROUP STAGE MATCHES ───────────────────────────────────────────
const GROUP_MATCHES = [
  { id:1,  group:"A", t1:"México",        t2:"Sudáfrica",          date:"11 Jun", phase:"Fase de Grupos" },
  { id:2,  group:"A", t1:"Corea del Sur", t2:"República Checa",    date:"11 Jun", phase:"Fase de Grupos" },
  { id:25, group:"A", t1:"Sudáfrica",     t2:"República Checa",    date:"18 Jun", phase:"Fase de Grupos" },
  { id:28, group:"A", t1:"México",        t2:"Corea del Sur",      date:"18 Jun", phase:"Fase de Grupos" },
  { id:53, group:"A", t1:"República Checa",t2:"México",            date:"24 Jun", phase:"Fase de Grupos" },
  { id:54, group:"A", t1:"Sudáfrica",     t2:"Corea del Sur",      date:"24 Jun", phase:"Fase de Grupos" },
  { id:3,  group:"B", t1:"Canadá",        t2:"Bosnia y Herzegovina",date:"12 Jun",phase:"Fase de Grupos" },
  { id:8,  group:"B", t1:"Catar",         t2:"Suiza",              date:"13 Jun", phase:"Fase de Grupos" },
  { id:26, group:"B", t1:"Canadá",        t2:"Catar",              date:"18 Jun", phase:"Fase de Grupos" },
  { id:27, group:"B", t1:"Bosnia y Herzegovina",t2:"Suiza",        date:"18 Jun", phase:"Fase de Grupos" },
  { id:51, group:"B", t1:"Suiza",         t2:"Canadá",             date:"24 Jun", phase:"Fase de Grupos" },
  { id:52, group:"B", t1:"Bosnia y Herzegovina",t2:"Catar",        date:"24 Jun", phase:"Fase de Grupos" },
  { id:5,  group:"C", t1:"Haití",         t2:"Escocia",            date:"13 Jun", phase:"Fase de Grupos" },
  { id:7,  group:"C", t1:"Brasil",        t2:"Marruecos",          date:"13 Jun", phase:"Fase de Grupos" },
  { id:29, group:"C", t1:"Brasil",        t2:"Haití",              date:"19 Jun", phase:"Fase de Grupos" },
  { id:30, group:"C", t1:"Marruecos",     t2:"Escocia",            date:"19 Jun", phase:"Fase de Grupos" },
  { id:49, group:"C", t1:"Marruecos",     t2:"Haití",              date:"24 Jun", phase:"Fase de Grupos" },
  { id:50, group:"C", t1:"Escocia",       t2:"Brasil",             date:"24 Jun", phase:"Fase de Grupos" },
  { id:4,  group:"D", t1:"Estados Unidos",t2:"Paraguay",           date:"12 Jun", phase:"Fase de Grupos" },
  { id:6,  group:"D", t1:"Australia",     t2:"Turquía",            date:"13 Jun", phase:"Fase de Grupos" },
  { id:31, group:"D", t1:"Turquía",       t2:"Paraguay",           date:"19 Jun", phase:"Fase de Grupos" },
  { id:32, group:"D", t1:"Estados Unidos",t2:"Australia",          date:"19 Jun", phase:"Fase de Grupos" },
  { id:59, group:"D", t1:"Estados Unidos",t2:"Turquía",            date:"25 Jun", phase:"Fase de Grupos" },
  { id:60, group:"D", t1:"Paraguay",      t2:"Australia",          date:"25 Jun", phase:"Fase de Grupos" },
  { id:9,  group:"E", t1:"Costa de Marfil",t2:"Ecuador",           date:"14 Jun", phase:"Fase de Grupos" },
  { id:10, group:"E", t1:"Alemania",      t2:"Curazao",            date:"14 Jun", phase:"Fase de Grupos" },
  { id:33, group:"E", t1:"Alemania",      t2:"Costa de Marfil",    date:"20 Jun", phase:"Fase de Grupos" },
  { id:34, group:"E", t1:"Ecuador",       t2:"Curazao",            date:"20 Jun", phase:"Fase de Grupos" },
  { id:55, group:"E", t1:"Curazao",       t2:"Costa de Marfil",    date:"25 Jun", phase:"Fase de Grupos" },
  { id:56, group:"E", t1:"Ecuador",       t2:"Alemania",           date:"25 Jun", phase:"Fase de Grupos" },
  { id:11, group:"F", t1:"Países Bajos",  t2:"Japón",              date:"14 Jun", phase:"Fase de Grupos" },
  { id:12, group:"F", t1:"Suecia",        t2:"Túnez",              date:"14 Jun", phase:"Fase de Grupos" },
  { id:35, group:"F", t1:"Países Bajos",  t2:"Suecia",             date:"20 Jun", phase:"Fase de Grupos" },
  { id:36, group:"F", t1:"Japón",         t2:"Túnez",              date:"20 Jun", phase:"Fase de Grupos" },
  { id:57, group:"F", t1:"Túnez",         t2:"Países Bajos",       date:"25 Jun", phase:"Fase de Grupos" },
  { id:58, group:"F", t1:"Japón",         t2:"Suecia",             date:"25 Jun", phase:"Fase de Grupos" },
  { id:15, group:"G", t1:"Irán",          t2:"Nueva Zelanda",      date:"15 Jun", phase:"Fase de Grupos" },
  { id:16, group:"G", t1:"Bélgica",       t2:"Egipto",             date:"15 Jun", phase:"Fase de Grupos" },
  { id:39, group:"G", t1:"Bélgica",       t2:"Irán",               date:"21 Jun", phase:"Fase de Grupos" },
  { id:40, group:"G", t1:"Nueva Zelanda", t2:"Egipto",             date:"21 Jun", phase:"Fase de Grupos" },
  { id:63, group:"G", t1:"Egipto",        t2:"Irán",               date:"26 Jun", phase:"Fase de Grupos" },
  { id:64, group:"G", t1:"Nueva Zelanda", t2:"Bélgica",            date:"26 Jun", phase:"Fase de Grupos" },
  { id:13, group:"H", t1:"Arabia Saudita",t2:"Uruguay",            date:"15 Jun", phase:"Fase de Grupos" },
  { id:14, group:"H", t1:"España",        t2:"Cabo Verde",         date:"15 Jun", phase:"Fase de Grupos" },
  { id:37, group:"H", t1:"Uruguay",       t2:"Cabo Verde",         date:"21 Jun", phase:"Fase de Grupos" },
  { id:38, group:"H", t1:"España",        t2:"Arabia Saudita",     date:"21 Jun", phase:"Fase de Grupos" },
  { id:65, group:"H", t1:"Arabia Saudita",t2:"Cabo Verde",         date:"26 Jun", phase:"Fase de Grupos" },
  { id:66, group:"H", t1:"España",        t2:"Uruguay",            date:"26 Jun", phase:"Fase de Grupos" },
  { id:17, group:"I", t1:"Francia",       t2:"Senegal",            date:"16 Jun", phase:"Fase de Grupos" },
  { id:18, group:"I", t1:"Irak",          t2:"Noruega",            date:"16 Jun", phase:"Fase de Grupos" },
  { id:41, group:"I", t1:"Noruega",       t2:"Senegal",            date:"22 Jun", phase:"Fase de Grupos" },
  { id:42, group:"I", t1:"Francia",       t2:"Irak",               date:"22 Jun", phase:"Fase de Grupos" },
  { id:61, group:"I", t1:"Irak",          t2:"Senegal",            date:"26 Jun", phase:"Fase de Grupos" },
  { id:62, group:"I", t1:"Noruega",       t2:"Francia",            date:"26 Jun", phase:"Fase de Grupos" },
  { id:19, group:"J", t1:"Argentina",     t2:"Argelia",            date:"16 Jun", phase:"Fase de Grupos" },
  { id:20, group:"J", t1:"Austria",       t2:"Jordania",           date:"16 Jun", phase:"Fase de Grupos" },
  { id:43, group:"J", t1:"Argentina",     t2:"Austria",            date:"22 Jun", phase:"Fase de Grupos" },
  { id:44, group:"J", t1:"Argelia",       t2:"Jordania",           date:"22 Jun", phase:"Fase de Grupos" },
  { id:69, group:"J", t1:"Argelia",       t2:"Austria",            date:"27 Jun", phase:"Fase de Grupos" },
  { id:70, group:"J", t1:"Jordania",      t2:"Argentina",          date:"27 Jun", phase:"Fase de Grupos" },
  { id:21, group:"K", t1:"Portugal",      t2:"RD Congo",           date:"17 Jun", phase:"Fase de Grupos" },
  { id:24, group:"K", t1:"Uzbekistán",    t2:"Colombia",           date:"17 Jun", phase:"Fase de Grupos" },
  { id:47, group:"K", t1:"Portugal",      t2:"Uzbekistán",         date:"23 Jun", phase:"Fase de Grupos" },
  { id:48, group:"K", t1:"Colombia",      t2:"RD Congo",           date:"23 Jun", phase:"Fase de Grupos" },
  { id:71, group:"K", t1:"Colombia",      t2:"Portugal",           date:"27 Jun", phase:"Fase de Grupos" },
  { id:72, group:"K", t1:"RD Congo",      t2:"Uzbekistán",         date:"27 Jun", phase:"Fase de Grupos" },
  { id:22, group:"L", t1:"Inglaterra",    t2:"Croacia",            date:"17 Jun", phase:"Fase de Grupos" },
  { id:23, group:"L", t1:"Ghana",         t2:"Panamá",             date:"17 Jun", phase:"Fase de Grupos" },
  { id:45, group:"L", t1:"Inglaterra",    t2:"Ghana",              date:"23 Jun", phase:"Fase de Grupos" },
  { id:46, group:"L", t1:"Panamá",        t2:"Croacia",            date:"23 Jun", phase:"Fase de Grupos" },
  { id:67, group:"L", t1:"Panamá",        t2:"Inglaterra",         date:"27 Jun", phase:"Fase de Grupos" },
  { id:68, group:"L", t1:"Croacia",       t2:"Ghana",              date:"27 Jun", phase:"Fase de Grupos" }
];


// ── RENDER: SAFE PICKS ────────────────────────────────────────────
function renderSafePicks() {
  const container = document.getElementById("safe-picks-container");
  if (!container) return;
  const calculated = GROUP_MATCHES.map(m => ({
    match: m, probs: calculateMatchProbabilities(m.t1, m.t2)
  })).sort((a,b) => Math.max(b.probs.p1,b.probs.p2) - Math.max(a.probs.p1,a.probs.p2));

  container.innerHTML = calculated.slice(0,9).map((item, idx) => {
    const m=item.match, p=item.probs;
    const winner = p.p1>p.p2 ? m.t1 : m.t2;
    const winPct = Math.max(p.p1, p.p2);
    const risk = winPct>=75 ? "low" : winPct>=55 ? "mid" : "high";
    const riskLabel = winPct>=75 ? "Bajo" : winPct>=55 ? "Medio" : "Alto";
    const riskColor = winPct>=75 ? "#10B981" : winPct>=55 ? "#F5C400" : "#EF4444";
    const barColor = winPct>=75 ? "linear-gradient(90deg,#059669,#34d399)"
                   : winPct>=55 ? "linear-gradient(90deg,#d97706,#fbbf24)"
                   : "linear-gradient(90deg,#dc2626,#f87171)";
    return `
      <div class="pick-card" style="animation-delay:${idx*0.05}s">
        <div class="pick-card-top">
          <span class="pick-group">Grupo ${m.group} · P${m.id}</span>
          <span class="pick-risk" style="--rc:${riskColor}">Riesgo ${riskLabel}</span>
        </div>
        <div class="pick-teams">
          <span class="pick-team">${m.t1}</span>
          <span class="pick-vs">vs</span>
          <span class="pick-team">${m.t2}</span>
        </div>
        <div class="pick-probs-row">
          <span class="pick-pct" style="color:#10B981">${p.p1}%</span>
          <span class="pick-pct" style="color:#6B7280">${p.pDraw}%</span>
          <span class="pick-pct" style="color:#3B82F6">${p.p2}%</span>
        </div>
        <div class="pick-bar">
          <div class="pick-bar-fill" style="width:${winPct}%;background:${barColor}"></div>
        </div>
        <div class="pick-footer">
          <span class="pick-fav">Favorito: <strong>${winner}</strong> · ${winPct}%</span>
          <span class="pick-score">${p.estimatedScore1}–${p.estimatedScore2}</span>
        </div>
        <div class="pick-market">${p.suggestedBet}</div>
      </div>
    `;
  }).join('');
}


// ── RENDER: MODEL COMPARISON TABLE ───────────────────────────────
function renderModelComparison(t1, t2, containerId) {
  const el = document.getElementById(containerId);
  if (!el || !t1 || !t2 || t1===t2) return;
  const results = getAllModelResults(t1, t2);
  el.innerHTML = results.map(r => {
    const m = r.model;
    const stars = '★'.repeat(m.stars) + '☆'.repeat(5-m.stars);
    const fav = r.p1>r.p2 ? `${t1} ${r.p1}%` : r.p2>r.p1 ? `${t2} ${r.p2}%` : `Empate ${r.pDraw}%`;
    return `
      <div class="cmp-row" style="--mc:${m.color}">
        <div class="cmp-model">
          <span class="cmp-dot" style="background:${m.color}"></span>
          <div>
            <div class="cmp-name">${m.name}</div>
            <div class="cmp-stars" title="${m.stars}/5 estrellas de precisión">${stars}</div>
          </div>
        </div>
        <div class="cmp-bar-group">
          <div class="cmp-bar-wrap" title="${t1}: ${r.p1}%">
            <div class="cmp-bar-fill" style="width:${r.p1}%;background:${m.color}88"></div>
            <span class="cmp-bar-label">${r.p1}%</span>
          </div>
          <div class="cmp-bar-wrap draw-bar" title="Empate: ${r.pDraw}%">
            <div class="cmp-bar-fill" style="width:${r.pDraw}%;background:#6B7280aa"></div>
            <span class="cmp-bar-label">${r.pDraw}%</span>
          </div>
          <div class="cmp-bar-wrap" title="${t2}: ${r.p2}%">
            <div class="cmp-bar-fill" style="width:${r.p2}%;background:#3B82F688"></div>
            <span class="cmp-bar-label">${r.p2}%</span>
          </div>
        </div>
        <div class="cmp-fav">${fav}</div>
      </div>
    `;
  }).join('');
}


// ── RENDER: H2H SIMULATOR ────────────────────────────────────────
function setupH2HSimulator() {
  const s1=document.getElementById("sim-team1"), s2=document.getElementById("sim-team2");
  if(!s1||!s2) return;
  const teams = [...new Set([...Object.keys(TEAM_RATINGS),...Object.keys(FIFA_POINTS),...Object.keys(ELO_RATINGS)])].sort();
  [s1,s2].forEach((sel,i) => {
    teams.forEach(t => {
      const o=document.createElement("option");
      o.value=t; o.textContent=t; sel.appendChild(o);
    });
    sel.value = i===0 ? "Argentina" : "Francia";
  });

  const run = () => {
    const t1=s1.value, t2=s2.value;
    if(t1===t2) return;
    const p = calculateMatchProbabilities(t1, t2);

    // Update big bars
    ["t1","draw","t2"].forEach((k,i) => {
      const pct = [p.p1,p.pDraw,p.p2][i];
      const el = document.getElementById(`bar-${k}`);
      const lbl = document.getElementById(`sim-prob-${k}`);
      if(el) el.style.width=`${pct}%`;
      if(lbl) lbl.textContent=`${pct}%`;
    });

    // Update labels
    const labels=document.querySelectorAll(".prob-label");
    if(labels[0]) labels[0].textContent=t1;
    if(labels[2]) labels[2].textContent=t2;

    // Dixon-Coles expected goals
    const dc = calcDixonColes(t1,t2);
    const xg1=document.getElementById("sim-xg1"), xg2=document.getElementById("sim-xg2");
    if(xg1) xg1.textContent=dc.lambda1||"—";
    if(xg2) xg2.textContent=dc.lambda2||"—";

    // Advice panel
    const sug=document.getElementById("sim-suggested");
    const scr=document.getElementById("sim-score");
    const rbadge=document.getElementById("sim-risk-badge");
    if(sug) sug.textContent=p.suggestedBet;
    if(scr) scr.textContent=`${p.estimatedScore1}–${p.estimatedScore2}`;
    if(rbadge){
      rbadge.textContent=p.riskLevel;
      rbadge.className="risk-chip "+({Bajo:"risk-low",Medio:"risk-mid",Alto:"risk-high"}[p.riskLevel]||"");
    }

    // Multi-model comparison
    renderModelComparison(t1, t2, "model-comparison-grid");
  };

  s1.addEventListener("change", run);
  s2.addEventListener("change", run);
  run();
}


// ── RENDER: FULL TABLE ───────────────────────────────────────────
function renderFullProbabilityTable() {
  const wrapper = document.getElementById("full-table-wrapper");
  if(!wrapper) return;
  const model = PREDICTION_MODELS.find(m=>m.id===activeModelId);
  const rows = GROUP_MATCHES.map(m => {
    const p = calculateMatchProbabilities(m.t1, m.t2);
    const win = p.p1>p.p2?m.t1:m.t2, winPct=Math.max(p.p1,p.p2);
    const riskColor = winPct>=75?"#10B981":winPct>=55?"#F5C400":"#EF4444";
    return `<tr>
      <td class="td-muted">P${m.id}</td>
      <td><span class="group-pill">Grupo ${m.group}</span></td>
      <td class="td-muted">${m.date}</td>
      <td class="td-teams">${m.t1} <span class="td-vs">vs</span> ${m.t2}</td>
      <td class="td-center td-green">${p.p1}%</td>
      <td class="td-center td-gray">${p.pDraw}%</td>
      <td class="td-center td-blue">${p.p2}%</td>
      <td class="td-center">${p.estimatedScore1}–${p.estimatedScore2}</td>
      <td><span style="color:${riskColor};font-weight:700;font-size:0.78rem;">${p.riskLevel}</span></td>
    </tr>`;
  }).join('');
  wrapper.innerHTML = `
    <div class="table-model-badge">Modelo activo: <strong style="color:${model?.color||'#F5C400'}">${model?.name||'Combinado'}</strong></div>
    <div class="full-table-scroll">
      <table class="full-table">
        <thead><tr>
          <th>#</th><th>Grupo</th><th>Fecha</th><th>Partido</th>
          <th class="th-center">Gana 1</th><th class="th-center">Empate</th>
          <th class="th-center">Gana 2</th><th class="th-center">Marcador est.</th>
          <th>Riesgo</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}


// ── BETTING CALCULATOR ────────────────────────────────────────────
function setupBettingCalculator() {
  const inputAmount=document.getElementById("bet-amount");
  const inputOdds=document.getElementById("bet-odds");
  const selectRisk=document.getElementById("bet-risk");
  if(!inputAmount||!inputOdds||!selectRisk) return;
  const calc = () => {
    const amount=parseFloat(inputAmount.value)||0;
    const odds=parseFloat(inputOdds.value)||1.0;
    const risk=selectRisk.value;
    document.getElementById("calc-gross").textContent=`S/ ${(amount*odds).toFixed(2)}`;
    document.getElementById("calc-net").textContent=`S/ ${(amount*odds-amount).toFixed(2)}`;
    let stake="1/10 (Súper conservador)";
    if(risk==="low"&&odds<1.5) stake="6/10 (Confianza alta)";
    else if(risk==="low"&&odds>=1.5) stake="4/10 (Confianza buena)";
    else if(risk==="medium"&&odds<2) stake="3/10 (Moderado)";
    else if(risk==="medium"&&odds>=2) stake="2/10 (Precaución)";
    else if(risk==="high") stake="1/10 (Solo diversión)";
    document.getElementById("calc-recommendation").textContent=stake;
  };
  inputAmount.addEventListener("input",calc);
  inputOdds.addEventListener("input",calc);
  selectRisk.addEventListener("change",calc);
  calc();
}


// ── AUTOFILL ──────────────────────────────────────────────────────
function setupAutofillFeature() {
  const btn=document.getElementById("autofill-btn");
  if(!btn) return;
  btn.addEventListener("click", () => {
    if(!confirm("¿Autocompletar el Fixture Principal con marcadores estimados?\n\nNo son resultados garantizados.")) return;
    const predictions={};
    GROUP_MATCHES.forEach(m => {
      const p=calculateMatchProbabilities(m.t1,m.t2);
      predictions[m.id]={score1:p.estimatedScore1,score2:p.estimatedScore2};
    });
    localStorage.setItem("wc_2026_predictions",JSON.stringify(predictions));
    alert("Estimaciones guardadas.\n\nAbre el Fixture Principal y recárgalo para sincronizar.");
  });
}


// ── INIT ──────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderSafePicks();
  setupH2HSimulator();
  setupBettingCalculator();
  setupAutofillFeature();
  renderFullProbabilityTable();
});
