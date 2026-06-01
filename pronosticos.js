/* ==========================================
   STATISTICAL ENGINE & RISK ASSISTANT
   Copa Mundial FIFA 2026™
   ========================================== */

const MODEL_METADATA = {
  name: "Modelo interno v0.2",
  updatedAt: "2026-06-01",
  source: "Ratings manuales auditables. Reemplazar por Elo/FIFA/cuotas verificadas antes de apostar dinero real.",
  warning: "Probabilidades estimadas; no garantizan resultados."
};

// 1. Core Team Strength Ratings (manual internal ratings, not official)
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
  // Alias / fallback for teams that might appear with different names
  "México": 83, "Canadá": 80, "Escocia": 76, "Irán": 75, "Cabo Verde": 60
};

// 2. Embedded Group Stage Matches (standalone - does not require index.js)
const GROUP_MATCHES = [
  { id:1, group:"A", t1:"México", t2:"Sudáfrica", date:"11 Jun", phase:"Fase de Grupos" },
  { id:2, group:"A", t1:"Corea del Sur", t2:"República Checa", date:"11 Jun", phase:"Fase de Grupos" },
  { id:25, group:"A", t1:"Sudáfrica", t2:"República Checa", date:"18 Jun", phase:"Fase de Grupos" },
  { id:28, group:"A", t1:"México", t2:"Corea del Sur", date:"18 Jun", phase:"Fase de Grupos" },
  { id:53, group:"A", t1:"República Checa", t2:"México", date:"24 Jun", phase:"Fase de Grupos" },
  { id:54, group:"A", t1:"Sudáfrica", t2:"Corea del Sur", date:"24 Jun", phase:"Fase de Grupos" },
  { id:3, group:"B", t1:"Canadá", t2:"Bosnia y Herzegovina", date:"12 Jun", phase:"Fase de Grupos" },
  { id:8, group:"B", t1:"Catar", t2:"Suiza", date:"13 Jun", phase:"Fase de Grupos" },
  { id:26, group:"B", t1:"Canadá", t2:"Catar", date:"18 Jun", phase:"Fase de Grupos" },
  { id:27, group:"B", t1:"Bosnia y Herzegovina", t2:"Suiza", date:"18 Jun", phase:"Fase de Grupos" },
  { id:51, group:"B", t1:"Suiza", t2:"Canadá", date:"24 Jun", phase:"Fase de Grupos" },
  { id:52, group:"B", t1:"Bosnia y Herzegovina", t2:"Catar", date:"24 Jun", phase:"Fase de Grupos" },
  { id:5, group:"C", t1:"Haití", t2:"Escocia", date:"13 Jun", phase:"Fase de Grupos" },
  { id:7, group:"C", t1:"Brasil", t2:"Marruecos", date:"13 Jun", phase:"Fase de Grupos" },
  { id:29, group:"C", t1:"Brasil", t2:"Haití", date:"19 Jun", phase:"Fase de Grupos" },
  { id:30, group:"C", t1:"Marruecos", t2:"Escocia", date:"19 Jun", phase:"Fase de Grupos" },
  { id:49, group:"C", t1:"Marruecos", t2:"Haití", date:"24 Jun", phase:"Fase de Grupos" },
  { id:50, group:"C", t1:"Escocia", t2:"Brasil", date:"24 Jun", phase:"Fase de Grupos" },
  { id:4, group:"D", t1:"Estados Unidos", t2:"Paraguay", date:"12 Jun", phase:"Fase de Grupos" },
  { id:6, group:"D", t1:"Australia", t2:"Turquía", date:"13 Jun", phase:"Fase de Grupos" },
  { id:31, group:"D", t1:"Turquía", t2:"Paraguay", date:"19 Jun", phase:"Fase de Grupos" },
  { id:32, group:"D", t1:"Estados Unidos", t2:"Australia", date:"19 Jun", phase:"Fase de Grupos" },
  { id:59, group:"D", t1:"Estados Unidos", t2:"Turquía", date:"25 Jun", phase:"Fase de Grupos" },
  { id:60, group:"D", t1:"Paraguay", t2:"Australia", date:"25 Jun", phase:"Fase de Grupos" },
  { id:9, group:"E", t1:"Costa de Marfil", t2:"Ecuador", date:"14 Jun", phase:"Fase de Grupos" },
  { id:10, group:"E", t1:"Alemania", t2:"Curazao", date:"14 Jun", phase:"Fase de Grupos" },
  { id:33, group:"E", t1:"Alemania", t2:"Costa de Marfil", date:"20 Jun", phase:"Fase de Grupos" },
  { id:34, group:"E", t1:"Ecuador", t2:"Curazao", date:"20 Jun", phase:"Fase de Grupos" },
  { id:55, group:"E", t1:"Curazao", t2:"Costa de Marfil", date:"25 Jun", phase:"Fase de Grupos" },
  { id:56, group:"E", t1:"Ecuador", t2:"Alemania", date:"25 Jun", phase:"Fase de Grupos" },
  { id:11, group:"F", t1:"Países Bajos", t2:"Japón", date:"14 Jun", phase:"Fase de Grupos" },
  { id:12, group:"F", t1:"Suecia", t2:"Túnez", date:"14 Jun", phase:"Fase de Grupos" },
  { id:35, group:"F", t1:"Países Bajos", t2:"Suecia", date:"20 Jun", phase:"Fase de Grupos" },
  { id:36, group:"F", t1:"Japón", t2:"Túnez", date:"20 Jun", phase:"Fase de Grupos" },
  { id:57, group:"F", t1:"Túnez", t2:"Países Bajos", date:"25 Jun", phase:"Fase de Grupos" },
  { id:58, group:"F", t1:"Japón", t2:"Suecia", date:"25 Jun", phase:"Fase de Grupos" },
  { id:15, group:"G", t1:"Irán", t2:"Nueva Zelanda", date:"15 Jun", phase:"Fase de Grupos" },
  { id:16, group:"G", t1:"Bélgica", t2:"Egipto", date:"15 Jun", phase:"Fase de Grupos" },
  { id:39, group:"G", t1:"Bélgica", t2:"Irán", date:"21 Jun", phase:"Fase de Grupos" },
  { id:40, group:"G", t1:"Nueva Zelanda", t2:"Egipto", date:"21 Jun", phase:"Fase de Grupos" },
  { id:63, group:"G", t1:"Egipto", t2:"Irán", date:"26 Jun", phase:"Fase de Grupos" },
  { id:64, group:"G", t1:"Nueva Zelanda", t2:"Bélgica", date:"26 Jun", phase:"Fase de Grupos" },
  { id:13, group:"H", t1:"Arabia Saudita", t2:"Uruguay", date:"15 Jun", phase:"Fase de Grupos" },
  { id:14, group:"H", t1:"España", t2:"Cabo Verde", date:"15 Jun", phase:"Fase de Grupos" },
  { id:37, group:"H", t1:"Uruguay", t2:"Cabo Verde", date:"21 Jun", phase:"Fase de Grupos" },
  { id:38, group:"H", t1:"España", t2:"Arabia Saudita", date:"21 Jun", phase:"Fase de Grupos" },
  { id:65, group:"H", t1:"Arabia Saudita", t2:"Cabo Verde", date:"26 Jun", phase:"Fase de Grupos" },
  { id:66, group:"H", t1:"España", t2:"Uruguay", date:"26 Jun", phase:"Fase de Grupos" },
  { id:17, group:"I", t1:"Francia", t2:"Senegal", date:"16 Jun", phase:"Fase de Grupos" },
  { id:18, group:"I", t1:"Irak", t2:"Noruega", date:"16 Jun", phase:"Fase de Grupos" },
  { id:41, group:"I", t1:"Noruega", t2:"Senegal", date:"22 Jun", phase:"Fase de Grupos" },
  { id:42, group:"I", t1:"Francia", t2:"Irak", date:"22 Jun", phase:"Fase de Grupos" },
  { id:61, group:"I", t1:"Irak", t2:"Senegal", date:"26 Jun", phase:"Fase de Grupos" },
  { id:62, group:"I", t1:"Noruega", t2:"Francia", date:"26 Jun", phase:"Fase de Grupos" },
  { id:19, group:"J", t1:"Argentina", t2:"Argelia", date:"16 Jun", phase:"Fase de Grupos" },
  { id:20, group:"J", t1:"Austria", t2:"Jordania", date:"16 Jun", phase:"Fase de Grupos" },
  { id:43, group:"J", t1:"Argentina", t2:"Austria", date:"22 Jun", phase:"Fase de Grupos" },
  { id:44, group:"J", t1:"Argelia", t2:"Jordania", date:"22 Jun", phase:"Fase de Grupos" },
  { id:69, group:"J", t1:"Argelia", t2:"Austria", date:"27 Jun", phase:"Fase de Grupos" },
  { id:70, group:"J", t1:"Jordania", t2:"Argentina", date:"27 Jun", phase:"Fase de Grupos" },
  { id:21, group:"K", t1:"Portugal", t2:"RD Congo", date:"17 Jun", phase:"Fase de Grupos" },
  { id:24, group:"K", t1:"Uzbekistán", t2:"Colombia", date:"17 Jun", phase:"Fase de Grupos" },
  { id:47, group:"K", t1:"Portugal", t2:"Uzbekistán", date:"23 Jun", phase:"Fase de Grupos" },
  { id:48, group:"K", t1:"Colombia", t2:"RD Congo", date:"23 Jun", phase:"Fase de Grupos" },
  { id:71, group:"K", t1:"Colombia", t2:"Portugal", date:"27 Jun", phase:"Fase de Grupos" },
  { id:72, group:"K", t1:"RD Congo", t2:"Uzbekistán", date:"27 Jun", phase:"Fase de Grupos" },
  { id:22, group:"L", t1:"Inglaterra", t2:"Croacia", date:"17 Jun", phase:"Fase de Grupos" },
  { id:23, group:"L", t1:"Ghana", t2:"Panamá", date:"17 Jun", phase:"Fase de Grupos" },
  { id:45, group:"L", t1:"Inglaterra", t2:"Ghana", date:"23 Jun", phase:"Fase de Grupos" },
  { id:46, group:"L", t1:"Panamá", t2:"Croacia", date:"23 Jun", phase:"Fase de Grupos" },
  { id:67, group:"L", t1:"Panamá", t2:"Inglaterra", date:"27 Jun", phase:"Fase de Grupos" },
  { id:68, group:"L", t1:"Croacia", t2:"Ghana", date:"27 Jun", phase:"Fase de Grupos" }
];


// 3. Mathematical Probability Calculator (Elo-based)
function calculateMatchProbabilities(team1, team2) {
  const r1 = TEAM_RATINGS[team1] || 70;
  const r2 = TEAM_RATINGS[team2] || 70;

  // Home advantage boost (+3 for hosts)
  const hosts = ["México", "Estados Unidos", "Canadá"];
  const h1 = hosts.includes(team1) ? 3 : 0;
  const h2 = hosts.includes(team2) ? 3 : 0;

  const ratingDiff = (r1 + h1) - (r2 + h2);
  
  // Logistic Win/Loss curves
  const win1 = 1 / (1 + Math.pow(10, -ratingDiff / 20));
  const win2 = 1 / (1 + Math.pow(10, ratingDiff / 20));
  
  // Draw probability peaks when team strengths are equal
  const drawProb = 0.26 * Math.exp(-Math.pow(ratingDiff / 15, 2));

  // Normalize to sum up to 100%
  const total = win1 + win2 + drawProb;
  const p1 = Math.round((win1 / total) * 100);
  const p2 = Math.round((win2 / total) * 100);
  const pDraw = 100 - p1 - p2;

  // Determine scenario recommendation and risk level.
  let recommendation = "";
  let riskLevel = "";
  let suggestedBet = "";
  let estimatedScore1 = 0;
  let estimatedScore2 = 0;

  if (p1 >= 75) {
    recommendation = `Gana ${team1}`;
    riskLevel = "Riesgo menor / Favorito fuerte";
    suggestedBet = `Evaluar victoria de ${team1} o doble oportunidad`;
    estimatedScore1 = ratingDiff > 25 ? 3 : 2;
    estimatedScore2 = 0;
  } else if (p2 >= 75) {
    recommendation = `Gana ${team2}`;
    riskLevel = "Riesgo menor / Favorito fuerte";
    suggestedBet = `Evaluar victoria de ${team2} o doble oportunidad`;
    estimatedScore1 = 0;
    estimatedScore2 = ratingDiff < -25 ? 3 : 2;
  } else if (p1 >= 55) {
    recommendation = `Gana ${team1} o Empata`;
    riskLevel = "Riesgo medio / Favorito moderado";
    suggestedBet = `Evaluar doble oportunidad: ${team1} o empate`;
    estimatedScore1 = 2;
    estimatedScore2 = 1;
  } else if (p2 >= 55) {
    recommendation = `Gana ${team2} o Empata`;
    riskLevel = "Riesgo medio / Favorito moderado";
    suggestedBet = `Evaluar doble oportunidad: ${team2} o empate`;
    estimatedScore1 = 1;
    estimatedScore2 = 2;
  } else {
    recommendation = "Partido muy cerrado / Posible Empate";
    riskLevel = "Riesgo alto / Evitar apuesta directa";
    suggestedBet = "Evaluar no apostar o buscar cuotas con valor claro";
    estimatedScore1 = 1;
    estimatedScore2 = 1;
  }

  return {
    p1, p2, pDraw,
    recommendation, riskLevel, suggestedBet,
    estimatedScore1, estimatedScore2
  };
}


// 4. Generate high-probability scenarios
function renderSafePicks() {
  const container = document.getElementById("safe-picks-container");
  if (!container) return;

  // Calculate probabilities for all group matches
  const calculated = GROUP_MATCHES.map(m => {
    const probs = calculateMatchProbabilities(m.t1, m.t2);
    return { match: m, probs };
  });

  // Sort by highest single-team win probability.
  calculated.sort((a, b) => {
    const maxA = Math.max(a.probs.p1, a.probs.p2);
    const maxB = Math.max(b.probs.p1, b.probs.p2);
    return maxB - maxA;
  });

  // Show top 8
  const top8 = calculated.slice(0, 8);
  container.innerHTML = "";

  top8.forEach((item, idx) => {
    const m = item.match;
    const p = item.probs;
    const card = document.createElement("div");
    card.className = "value-card";
    card.style.animationDelay = `${idx * 0.06}s`;

    const winner = p.p1 > p.p2 ? m.t1 : m.t2;
    const winPct = Math.max(p.p1, p.p2);
    const badgeClass = winPct >= 75 ? "badge-safe" : winPct >= 55 ? "badge-medium" : "badge-danger";

    card.innerHTML = `
      <div class="value-card-header">
        <span class="badge ${badgeClass}">${p.riskLevel.split("/")[0].trim()}</span>
        <span style="font-weight: 700; color: var(--text-muted);">P${m.id} · Grupo ${m.group}</span>
      </div>
      <div style="font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; text-align: center; margin: var(--space-sm) 0; color: var(--text-primary);">
        ${m.t1} <span style="color: var(--text-muted); font-weight: 400;">vs</span> ${m.t2}
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 2px;">
        <span>${m.t1}: ${p.p1}%</span>
        <span>Empate: ${p.pDraw}%</span>
        <span>${m.t2}: ${p.p2}%</span>
      </div>
      <div class="prob-bar-container">
        <div class="prob-fill" style="width: ${winPct}%; background: linear-gradient(90deg, var(--primary), #34d399);"></div>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-secondary); margin: var(--space-xs) 0 var(--space-sm);">
        <span>Favorito del modelo: <strong style="color: var(--primary);">${winner}</strong></span>
        <strong style="color: var(--primary);">${winPct}%</strong>
      </div>
      <div class="suggested-bet-box">
        <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 0.04em;">Mercado a evaluar</div>
        <div style="font-weight: 700; color: var(--secondary); margin-top: 2px; font-size: 0.9rem;">${p.suggestedBet}</div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">Resultado estimado: <strong style="color: var(--text-primary);">${p.estimatedScore1} - ${p.estimatedScore2}</strong></div>
      </div>
    `;
    container.appendChild(card);
  });
}


// 5. Interactive H2H Simulator
function setupH2HSimulator() {
  const select1 = document.getElementById("sim-team1");
  const select2 = document.getElementById("sim-team2");
  if (!select1 || !select2) return;

  const teams = Object.keys(TEAM_RATINGS).sort();

  teams.forEach(t => {
    const opt1 = document.createElement("option");
    opt1.value = t;
    opt1.textContent = `${t} (${TEAM_RATINGS[t]})`;
    select1.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = t;
    opt2.textContent = `${t} (${TEAM_RATINGS[t]})`;
    select2.appendChild(opt2);
  });

  // Default
  select1.value = "Argentina";
  select2.value = "Francia";

  const runSimulation = () => {
    const t1 = select1.value;
    const t2 = select2.value;

    if (t1 === t2) return;

    const p = calculateMatchProbabilities(t1, t2);

    // Update probability bars
    document.getElementById("sim-prob-t1").textContent = `${p.p1}%`;
    document.getElementById("sim-prob-draw").textContent = `${p.pDraw}%`;
    document.getElementById("sim-prob-t2").textContent = `${p.p2}%`;

    document.getElementById("bar-t1").style.width = `${p.p1}%`;
    document.getElementById("bar-draw").style.width = `${p.pDraw}%`;
    document.getElementById("bar-t2").style.width = `${p.p2}%`;

    // Update advice
    document.getElementById("sim-suggested").textContent = p.suggestedBet;
    document.getElementById("sim-score").textContent = `${p.estimatedScore1} - ${p.estimatedScore2}`;
    
    const riskBadge = document.getElementById("sim-risk-badge");
    riskBadge.textContent = p.riskLevel;
    riskBadge.className = "badge";
    if (p.p1 >= 75 || p.p2 >= 75) riskBadge.classList.add("badge-safe");
    else if (p.p1 >= 55 || p.p2 >= 55) riskBadge.classList.add("badge-medium");
    else riskBadge.classList.add("badge-danger");

    // Update probability bar labels
    const probLabels = document.querySelectorAll(".prob-label");
    if (probLabels.length >= 3) {
      probLabels[0].textContent = t1;
      probLabels[2].textContent = t2;
    }
  };

  select1.addEventListener("change", runSimulation);
  select2.addEventListener("change", runSimulation);
  
  runSimulation();
}


// 6. Interactive Betting Bankroll Calculator
function setupBettingCalculator() {
  const inputAmount = document.getElementById("bet-amount");
  const inputOdds = document.getElementById("bet-odds");
  const selectRisk = document.getElementById("bet-risk");
  if (!inputAmount || !inputOdds || !selectRisk) return;

  const calculateReturn = () => {
    const amount = parseFloat(inputAmount.value) || 0;
    const odds = parseFloat(inputOdds.value) || 1.0;
    const risk = selectRisk.value;

    const returnGross = amount * odds;
    const profitNet = returnGross - amount;

    document.getElementById("calc-gross").textContent = returnGross > 0 ? `S/ ${returnGross.toFixed(2)}` : "S/ 0.00";
    document.getElementById("calc-net").textContent = profitNet > 0 ? `S/ ${profitNet.toFixed(2)}` : "S/ 0.00";

    // Stake suggestion based on Kelly Criterion simplifications
    let recommendedStake = "1/10 (Súper Conservador)";
    if (risk === "low" && odds < 1.5) {
      recommendedStake = "6/10 (Confianza Alta)";
    } else if (risk === "low" && odds >= 1.5) {
      recommendedStake = "4/10 (Confianza Buena)";
    } else if (risk === "medium" && odds < 2.0) {
      recommendedStake = "3/10 (Confianza Moderada)";
    } else if (risk === "medium" && odds >= 2.0) {
      recommendedStake = "2/10 (Precaución)";
    } else if (risk === "high") {
      recommendedStake = "1/10 (Solo Para Diversión)";
    }

    document.getElementById("calc-recommendation").textContent = recommendedStake;
  };

  inputAmount.addEventListener("input", calculateReturn);
  inputOdds.addEventListener("input", calculateReturn);
  selectRisk.addEventListener("change", calculateReturn);

  calculateReturn();
}


// 7. Auto-Fill main predictor matches via localStorage
function setupAutofillFeature() {
  const autofillBtn = document.getElementById("autofill-btn");
  if (!autofillBtn) return;

  autofillBtn.addEventListener("click", () => {
    if (!confirm("¿Deseas autocompletar la Fase de Grupos del fixture principal con los resultados estimados por este modelo?\n\nEsto guardará marcadores de simulación en el almacenamiento local. No son resultados garantizados.")) {
      return;
    }

    // Build predictions object keyed by match ID
    const predictions = {};
    GROUP_MATCHES.forEach(m => {
      const p = calculateMatchProbabilities(m.t1, m.t2);
      predictions[m.id] = {
        score1: p.estimatedScore1,
        score2: p.estimatedScore2
      };
    });

    // Save to the same key consumed by the main fixture.
    localStorage.setItem("wc_2026_predictions", JSON.stringify(predictions));
    
    alert("Estimaciones guardadas.\n\nAbre el Fixture Principal (index.html) y los marcadores se cargarán automáticamente.\n\nSi ya está abierto, recárgalo para sincronizar.");
  });
}

// 8. Full probability table
function renderFullProbabilityTable() {
  const wrapper = document.getElementById("full-table-wrapper");
  if (!wrapper) return;

  const rows = GROUP_MATCHES.map(m => {
    const p = calculateMatchProbabilities(m.t1, m.t2);
    const maxP = Math.max(p.p1, p.p2);
    let dotClass = "high";
    if (maxP >= 75) dotClass = "low";
    else if (maxP >= 55) dotClass = "medium";

    return `
      <tr>
        <td style="color: var(--text-muted);">P${m.id}</td>
        <td><span style="color: var(--primary); font-weight: 700;">Grupo ${m.group}</span></td>
        <td>${m.date}</td>
        <td class="match-teams-cell">${m.t1} vs ${m.t2}</td>
        <td style="text-align: center;"><span style="color: var(--primary); font-weight: 800;">${p.p1}%</span></td>
        <td style="text-align: center;"><span style="color: var(--text-muted); font-weight: 700;">${p.pDraw}%</span></td>
        <td style="text-align: center;"><span style="color: var(--info); font-weight: 800;">${p.p2}%</span></td>
        <td style="text-align: center;">${p.estimatedScore1} - ${p.estimatedScore2}</td>
        <td><span class="risk-dot ${dotClass}"></span>${p.riskLevel.split("/")[0].trim()}</td>
        <td style="color: var(--secondary); font-weight: 700; font-size: 0.8rem;">${p.suggestedBet}</td>
      </tr>
    `;
  }).join("");

  wrapper.innerHTML = `
    <table class="full-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Grupo</th>
          <th>Fecha</th>
          <th>Partido</th>
          <th style="text-align:center;">Gana 1</th>
          <th style="text-align:center;">Empate</th>
          <th style="text-align:center;">Gana 2</th>
          <th style="text-align:center;">Score Est.</th>
          <th>Riesgo</th>
          <th>Mercado a Evaluar</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderModelNote() {
  const note = document.getElementById("model-note");
  if (!note) return;

  note.innerHTML = `
    <strong>Fuente del modelo:</strong> ${MODEL_METADATA.name}, actualizado el ${MODEL_METADATA.updatedAt}.
    ${MODEL_METADATA.source} ${MODEL_METADATA.warning}
  `;
}

// 9. Initialize Page
document.addEventListener("DOMContentLoaded", () => {
  renderModelNote();
  renderSafePicks();
  setupH2HSimulator();
  setupBettingCalculator();
  setupAutofillFeature();
  renderFullProbabilityTable();
});
