/* ==========================================
   INTERACTIVE ENGINE - FIFA WORLD CUP 2026
   ========================================== */

// 1. Group Configurations & Initial Teams
const GROUPS_CONFIG = {
  "Grupo A": ["México", "Sudáfrica", "Corea del Sur", "República Checa"],
  "Grupo B": ["Canadá", "Bosnia y Herzegovina", "Catar", "Suiza"],
  "Grupo C": ["Brasil", "Marruecos", "Haití", "Escocia"],
  "Grupo D": ["Estados Unidos", "Paraguay", "Australia", "Turquía"],
  "Grupo E": ["Alemania", "Curazao", "Costa de Marfil", "Ecuador"],
  "Grupo F": ["Países Bajos", "Japón", "Suecia", "Túnez"],
  "Grupo G": ["Bélgica", "Egipto", "Irán", "Nueva Zelanda"],
  "Grupo H": ["España", "Cabo Verde", "Arabia Saudita", "Uruguay"],
  "Grupo I": ["Francia", "Senegal", "Irak", "Noruega"],
  "Grupo J": ["Argentina", "Argelia", "Austria", "Jordania"],
  "Grupo K": ["Portugal", "RD Congo", "Uzbekistán", "Colombia"],
  "Grupo L": ["Inglaterra", "Croacia", "Ghana", "Panamá"]
};

const TEAM_FLAGS = {
  "México": "🇲🇽", "Sudáfrica": "🇿🇦", "Corea del Sur": "🇰🇷", "República Checa": "🇨🇿",
  "Canadá": "🇨🇦", "Bosnia y Herzegovina": "🇧🇦", "Catar": "🇶🇦", "Suiza": "🇨🇭",
  "Brasil": "🇧🇷", "Marruecos": "🇲🇦", "Haití": "🇭🇹", "Escocia": "🏴_󠁧󠁢󠁳󠁣󠁴󠁿",
  "Estados Unidos": "🇺🇸", "Paraguay": "🇵🇾", "Australia": "🇦🇺", "Turquía": "🇹🇷",
  "Alemania": "🇩🇪", "Curazao": "🇨🇼", "Costa de Marfil": "🇨🇮", "Ecuador": "🇪🇨",
  "Países Bajos": "🇳🇱", "Japón": "🇯🇵", "Suecia": "🇸🇪", "Túnez": "🇹🇳",
  "Bélgica": "🇧🇪", "Egipto": "🇪🇬", "Irán": "🇮🇷", "Nueva Zelanda": "🇳🇿",
  "España": "🇪🇸", "Cabo Verde": "🇨🇻", "Arabia Saudita": "🇸🇦", "Uruguay": "🇺🇾",
  "Francia": "🇫🇷", "Senegal": "🇸🇳", "Irak": "🇮🇶", "Noruega": "🇳🇴",
  "Argentina": "🇦🇷", "Argelia": "🇩🇿", "Austria": "🇦🇹", "Jordania": "🇯🇴",
  "Portugal": "🇵🇹", "RD Congo": "🇨🇩", "Uzbekistán": "🇺🇿", "Colombia": "🇨🇴",
  "Inglaterra": "🏴_󠁧󠁢󠁥󠁮󠁧󠁿", "Croacia": "🇭🇷", "Ghana": "🇬🇭", "Panamá": "🇵🇦"
};

// 2. Full 104 Matches Database
let matchesData = [
  // --- GRUPO A ---
  { id: 1, phase: "Fase de Grupos", group: "Grupo A", team1: "México", team2: "Sudáfrica", date: "11 Jun 2026", time: "14:00", venue: "Estadio Azteca, CDMX (MEX)", score1: 2, score2: 0 },
  { id: 2, phase: "Fase de Grupos", group: "Grupo A", team1: "Corea del Sur", team2: "República Checa", date: "11 Jun 2026", time: "21:00", venue: "Estadio Guadalajara, Guadalajara (MEX)", score1: 2, score2: 1 },
  { id: 25, phase: "Fase de Grupos", group: "Grupo A", team1: "Sudáfrica", team2: "República Checa", date: "18 Jun 2026", time: "11:00", venue: "Mercedes-Benz Stadium, Atlanta (USA)", score1: null, score2: null },
  { id: 28, phase: "Fase de Grupos", group: "Grupo A", team1: "México", team2: "Corea del Sur", date: "18 Jun 2026", time: "20:00", venue: "Estadio Guadalajara, Guadalajara (MEX)", score1: null, score2: null },
  { id: 53, phase: "Fase de Grupos", group: "Grupo A", team1: "República Checa", team2: "México", date: "24 Jun 2026", time: "20:00", venue: "Estadio Azteca, CDMX (MEX)", score1: null, score2: null },
  { id: 54, phase: "Fase de Grupos", group: "Grupo A", team1: "Sudáfrica", team2: "Corea del Sur", date: "24 Jun 2026", time: "20:00", venue: "Estadio Monterrey, Monterrey (MEX)", score1: null, score2: null },

  // --- GRUPO B ---
  { id: 3, phase: "Fase de Grupos", group: "Grupo B", team1: "Canadá", team2: "Bosnia y Herzegovina", date: "12 Jun 2026", time: "14:00", venue: "BMO Field, Toronto (CAN)", score1: 1, score2: 1 },
  { id: 8, phase: "Fase de Grupos", group: "Grupo B", team1: "Catar", team2: "Suiza", date: "13 Jun 2026", time: "14:00", venue: "Levi's Stadium, San Francisco (USA)", score1: 1, score2: 1 },
  { id: 26, phase: "Fase de Grupos", group: "Grupo B", team1: "Canadá", team2: "Catar", date: "18 Jun 2026", time: "17:00", venue: "SoFi Stadium, Los Angeles (USA)", score1: null, score2: null },
  { id: 27, phase: "Fase de Grupos", group: "Grupo B", team1: "Bosnia y Herzegovina", team2: "Suiza", date: "18 Jun 2026", time: "14:00", venue: "BC Place, Vancouver (CAN)", score1: null, score2: null },
  { id: 51, phase: "Fase de Grupos", group: "Grupo B", team1: "Suiza", team2: "Canadá", date: "24 Jun 2026", time: "14:00", venue: "BC Place, Vancouver (CAN)", score1: null, score2: null },
  { id: 52, phase: "Fase de Grupos", group: "Grupo B", team1: "Bosnia y Herzegovina", team2: "Catar", date: "24 Jun 2026", time: "14:00", venue: "Lumen Field, Seattle (USA)", score1: null, score2: null },

  // --- GRUPO C ---
  { id: 5, phase: "Fase de Grupos", group: "Grupo C", team1: "Haití", team2: "Escocia", date: "13 Jun 2026", time: "20:00", venue: "Gillette Stadium, Boston (USA)", score1: 0, score2: 1 },
  { id: 7, phase: "Fase de Grupos", group: "Grupo C", team1: "Brasil", team2: "Marruecos", date: "13 Jun 2026", time: "17:00", venue: "MetLife Stadium, New York (USA)", score1: 1, score2: 1 },
  { id: 29, phase: "Fase de Grupos", group: "Grupo C", team1: "Brasil", team2: "Haití", date: "19 Jun 2026", time: "19:30", venue: "Lincoln Financial Field, Philadelphia (USA)", score1: null, score2: null },
  { id: 30, phase: "Fase de Grupos", group: "Grupo C", team1: "Marruecos", team2: "Escocia", date: "19 Jun 2026", time: "17:00", venue: "Gillette Stadium, Boston (USA)", score1: null, score2: null },
  { id: 49, phase: "Fase de Grupos", group: "Grupo C", team1: "Marruecos", team2: "Haití", date: "24 Jun 2026", time: "17:00", venue: "Hard Rock Stadium, Miami (USA)", score1: null, score2: null },
  { id: 50, phase: "Fase de Grupos", group: "Grupo C", team1: "Escocia", team2: "Brasil", date: "24 Jun 2026", time: "17:00", venue: "Mercedes-Benz Stadium, Atlanta (USA)", score1: null, score2: null },

  // --- GRUPO D ---
  { id: 4, phase: "Fase de Grupos", group: "Grupo D", team1: "Estados Unidos", team2: "Paraguay", date: "12 Jun 2026", time: "20:00", venue: "SoFi Stadium, Los Angeles (USA)", score1: 4, score2: 1 },
  { id: 6, phase: "Fase de Grupos", group: "Grupo D", team1: "Australia", team2: "Turquía", date: "13 Jun 2026", time: "23:00", venue: "BC Place, Vancouver (CAN)", score1: 2, score2: 0 },
  { id: 31, phase: "Fase de Grupos", group: "Grupo D", team1: "Turquía", team2: "Paraguay", date: "19 Jun 2026", time: "22:00", venue: "Levi's Stadium, San Francisco (USA)", score1: null, score2: null },
  { id: 32, phase: "Fase de Grupos", group: "Grupo D", team1: "Estados Unidos", team2: "Australia", date: "19 Jun 2026", time: "14:00", venue: "Lumen Field, Seattle (USA)", score1: null, score2: null },
  { id: 59, phase: "Fase de Grupos", group: "Grupo D", team1: "Estados Unidos", team2: "Turquía", date: "25 Jun 2026", time: "21:00", venue: "SoFi Stadium, Los Angeles (USA)", score1: null, score2: null },
  { id: 60, phase: "Fase de Grupos", group: "Grupo D", team1: "Paraguay", team2: "Australia", date: "25 Jun 2026", time: "21:00", venue: "Levi's Stadium, San Francisco (USA)", score1: null, score2: null },

  // --- GRUPO E ---
  { id: 9, phase: "Fase de Grupos", group: "Grupo E", team1: "Costa de Marfil", team2: "Ecuador", date: "14 Jun 2026", time: "18:00", venue: "Lincoln Financial Field, Philadelphia (USA)", score1: 1, score2: 0 },
  { id: 10, phase: "Fase de Grupos", group: "Grupo E", team1: "Alemania", team2: "Curazao", date: "14 Jun 2026", time: "12:00", venue: "NRG Stadium, Houston (USA)", score1: 7, score2: 1 },
  { id: 33, phase: "Fase de Grupos", group: "Grupo E", team1: "Alemania", team2: "Costa de Marfil", date: "20 Jun 2026", time: "15:00", venue: "BMO Field, Toronto (CAN)", score1: null, score2: null },
  { id: 34, phase: "Fase de Grupos", group: "Grupo E", team1: "Ecuador", team2: "Curazao", date: "20 Jun 2026", time: "19:00", venue: "Arrowhead Stadium, Kansas City (USA)", score1: null, score2: null },
  { id: 55, phase: "Fase de Grupos", group: "Grupo E", team1: "Curazao", team2: "Costa de Marfil", date: "25 Jun 2026", time: "15:00", venue: "Lincoln Financial Field, Philadelphia (USA)", score1: null, score2: null },
  { id: 56, phase: "Fase de Grupos", group: "Grupo E", team1: "Ecuador", team2: "Alemania", date: "25 Jun 2026", time: "15:00", venue: "MetLife Stadium, New York (USA)", score1: null, score2: null },

  // --- GRUPO F ---
  { id: 11, phase: "Fase de Grupos", group: "Grupo F", team1: "Países Bajos", team2: "Japón", date: "14 Jun 2026", time: "15:00", venue: "AT&T Stadium, Dallas (USA)", score1: 2, score2: 2 },
  { id: 12, phase: "Fase de Grupos", group: "Grupo F", team1: "Suecia", team2: "Túnez", date: "14 Jun 2026", time: "21:00", venue: "Estadio Monterrey, Monterrey (MEX)", score1: null, score2: null },
  { id: 35, phase: "Fase de Grupos", group: "Grupo F", team1: "Países Bajos", team2: "Suecia", date: "20 Jun 2026", time: "12:00", venue: "NRG Stadium, Houston (USA)", score1: null, score2: null },
  { id: 36, phase: "Fase de Grupos", group: "Grupo F", team1: "Japón", team2: "Túnez", date: "20 Jun 2026", time: "23:00", venue: "Estadio Monterrey, Monterrey (MEX)", score1: null, score2: null },
  { id: 57, phase: "Fase de Grupos", group: "Grupo F", team1: "Túnez", team2: "Países Bajos", date: "25 Jun 2026", time: "18:00", venue: "AT&T Stadium, Dallas (USA)", score1: null, score2: null },
  { id: 58, phase: "Fase de Grupos", group: "Grupo F", team1: "Japón", team2: "Suecia", date: "25 Jun 2026", time: "18:00", venue: "Arrowhead Stadium, Kansas City (USA)", score1: null, score2: null },

  // --- GRUPO G ---
  { id: 15, phase: "Fase de Grupos", group: "Grupo G", team1: "Irán", team2: "Nueva Zelanda", date: "15 Jun 2026", time: "20:00", venue: "SoFi Stadium, Los Angeles (USA)", score1: null, score2: null },
  { id: 16, phase: "Fase de Grupos", group: "Grupo G", team1: "Bélgica", team2: "Egipto", date: "15 Jun 2026", time: "14:00", venue: "Lumen Field, Seattle (USA)", score1: null, score2: null },
  { id: 39, phase: "Fase de Grupos", group: "Grupo G", team1: "Bélgica", team2: "Irán", date: "21 Jun 2026", time: "14:00", venue: "SoFi Stadium, Los Angeles (USA)", score1: null, score2: null },
  { id: 40, phase: "Fase de Grupos", group: "Grupo G", team1: "Nueva Zelanda", team2: "Egipto", date: "21 Jun 2026", time: "20:00", venue: "BC Place, Vancouver (CAN)", score1: null, score2: null },
  { id: 63, phase: "Fase de Grupos", group: "Grupo G", team1: "Egipto", team2: "Irán", date: "26 Jun 2026", time: "22:00", venue: "Lumen Field, Seattle (USA)", score1: null, score2: null },
  { id: 64, phase: "Fase de Grupos", group: "Grupo G", team1: "Nueva Zelanda", team2: "Bélgica", date: "26 Jun 2026", time: "22:00", venue: "BC Place, Vancouver (CAN)", score1: null, score2: null },

  // --- GRUPO H ---
  { id: 13, phase: "Fase de Grupos", group: "Grupo H", team1: "Arabia Saudita", team2: "Uruguay", date: "15 Jun 2026", time: "17:00", venue: "Hard Rock Stadium, Miami (USA)", score1: null, score2: null },
  { id: 14, phase: "Fase de Grupos", group: "Grupo H", team1: "España", team2: "Cabo Verde", date: "15 Jun 2026", time: "11:00", venue: "Mercedes-Benz Stadium, Atlanta (USA)", score1: null, score2: null },
  { id: 37, phase: "Fase de Grupos", group: "Grupo H", team1: "Uruguay", team2: "Cabo Verde", date: "21 Jun 2026", time: "17:00", venue: "Hard Rock Stadium, Miami (USA)", score1: null, score2: null },
  { id: 38, phase: "Fase de Grupos", group: "Grupo H", team1: "España", team2: "Arabia Saudita", date: "21 Jun 2026", time: "11:00", venue: "Mercedes-Benz Stadium, Atlanta (USA)", score1: null, score2: null },
  { id: 65, phase: "Fase de Grupos", group: "Grupo H", team1: "Arabia Saudita", team2: "Cabo Verde", date: "26 Jun 2026", time: "19:00", venue: "NRG Stadium, Houston (USA)", score1: null, score2: null },
  { id: 66, phase: "Fase de Grupos", group: "Grupo H", team1: "España", team2: "Uruguay", date: "26 Jun 2026", time: "19:00", venue: "Estadio Akron, Guadalajara (MEX)", score1: null, score2: null },

  // --- GRUPO I ---
  { id: 17, phase: "Fase de Grupos", group: "Grupo I", team1: "Francia", team2: "Senegal", date: "16 Jun 2026", time: "14:00", venue: "MetLife Stadium, New York (USA)", score1: null, score2: null },
  { id: 18, phase: "Fase de Grupos", group: "Grupo I", team1: "Irak", team2: "Noruega", date: "16 Jun 2026", time: "17:00", venue: "Gillette Stadium, Boston (USA)", score1: null, score2: null },
  { id: 41, phase: "Fase de Grupos", group: "Grupo I", team1: "Noruega", team2: "Senegal", date: "22 Jun 2026", time: "19:00", venue: "MetLife Stadium, New York (USA)", score1: null, score2: null },
  { id: 42, phase: "Fase de Grupos", group: "Grupo I", team1: "Francia", team2: "Irak", date: "22 Jun 2026", time: "16:00", venue: "Lincoln Financial Field, Philadelphia (USA)", score1: null, score2: null },
  { id: 61, phase: "Fase de Grupos", group: "Grupo I", team1: "Irak", team2: "Senegal", date: "26 Jun 2026", time: "14:00", venue: "Gillette Stadium, Boston (USA)", score1: null, score2: null },
  { id: 62, phase: "Fase de Grupos", group: "Grupo I", team1: "Noruega", team2: "Francia", date: "26 Jun 2026", time: "14:00", venue: "BMO Field, Toronto (CAN)", score1: null, score2: null },

  // --- GRUPO J ---
  { id: 19, phase: "Fase de Grupos", group: "Grupo J", team1: "Argentina", team2: "Argelia", date: "16 Jun 2026", time: "20:00", venue: "Arrowhead Stadium, Kansas City (USA)", score1: null, score2: null },
  { id: 20, phase: "Fase de Grupos", group: "Grupo J", team1: "Austria", team2: "Jordania", date: "16 Jun 2026", time: "23:00", venue: "Levi's Stadium, San Francisco (USA)", score1: null, score2: null },
  { id: 43, phase: "Fase de Grupos", group: "Grupo J", team1: "Argentina", team2: "Austria", date: "22 Jun 2026", time: "12:00", venue: "AT&T Stadium, Dallas (USA)", score1: null, score2: null },
  { id: 44, phase: "Fase de Grupos", group: "Grupo J", team1: "Argelia", team2: "Jordania", date: "22 Jun 2026", time: "22:00", venue: "Levi's Stadium, San Francisco (USA)", score1: null, score2: null },
  { id: 69, phase: "Fase de Grupos", group: "Grupo J", team1: "Argelia", team2: "Austria", date: "27 Jun 2026", time: "21:00", venue: "Arrowhead Stadium, Kansas City (USA)", score1: null, score2: null },
  { id: 70, phase: "Fase de Grupos", group: "Grupo J", team1: "Jordania", team2: "Argentina", date: "27 Jun 2026", time: "21:00", venue: "AT&T Stadium, Dallas (USA)", score1: null, score2: null },

  // --- GRUPO K ---
  { id: 21, phase: "Fase de Grupos", group: "Grupo K", team1: "Portugal", team2: "RD Congo", date: "17 Jun 2026", time: "12:00", venue: "NRG Stadium, Houston (USA)", score1: null, score2: null },
  { id: 24, phase: "Fase de Grupos", group: "Grupo K", team1: "Uzbekistán", team2: "Colombia", date: "17 Jun 2026", time: "21:00", venue: "Estadio Azteca, CDMX (MEX)", score1: null, score2: null },
  { id: 47, phase: "Fase de Grupos", group: "Grupo K", team1: "Portugal", team2: "Uzbekistán", date: "23 Jun 2026", time: "12:00", venue: "NRG Stadium, Houston (USA)", score1: null, score2: null },
  { id: 48, phase: "Fase de Grupos", group: "Grupo K", team1: "Colombia", team2: "RD Congo", date: "23 Jun 2026", time: "21:00", venue: "Estadio Akron, Guadalajara (MEX)", score1: null, score2: null },
  { id: 71, phase: "Fase de Grupos", group: "Grupo K", team1: "Colombia", team2: "Portugal", date: "27 Jun 2026", time: "18:30", venue: "Hard Rock Stadium, Miami (USA)", score1: null, score2: null },
  { id: 72, phase: "Fase de Grupos", group: "Grupo K", team1: "RD Congo", team2: "Uzbekistán", date: "27 Jun 2026", time: "18:30", venue: "Mercedes-Benz Stadium, Atlanta (USA)", score1: null, score2: null },

  // --- GRUPO L ---
  { id: 22, phase: "Fase de Grupos", group: "Grupo L", team1: "Inglaterra", team2: "Croacia", date: "17 Jun 2026", time: "15:00", venue: "AT&T Stadium, Dallas (USA)", score1: null, score2: null },
  { id: 23, phase: "Fase de Grupos", group: "Grupo L", team1: "Ghana", team2: "Panamá", date: "17 Jun 2026", time: "18:00", venue: "BMO Field, Toronto (CAN)", score1: null, score2: null },
  { id: 45, phase: "Fase de Grupos", group: "Grupo L", team1: "Inglaterra", team2: "Ghana", date: "23 Jun 2026", time: "15:00", venue: "Gillette Stadium, Boston (USA)", score1: null, score2: null },
  { id: 46, phase: "Fase de Grupos", group: "Grupo L", team1: "Panamá", team2: "Croacia", date: "23 Jun 2026", time: "18:00", venue: "BMO Field, Toronto (CAN)", score1: null, score2: null },
  { id: 67, phase: "Fase de Grupos", group: "Grupo L", team1: "Panamá", team2: "Inglaterra", date: "27 Jun 2026", time: "16:00", venue: "MetLife Stadium, New York (USA)", score1: null, score2: null },
  { id: 68, phase: "Fase de Grupos", group: "Grupo L", team1: "Croacia", team2: "Ghana", date: "27 Jun 2026", time: "16:00", venue: "Lincoln Financial Field, Philadelphia (USA)", score1: null, score2: null },

  // --- DIECISEISAVOS DE FINAL (ROUND OF 32) ---
  { id: 73, phase: "16avos de Final", group: null, team1: "2° Grupo A", team2: "2° Grupo B", date: "28 Jun 2026", time: "14:00", venue: "SoFi Stadium, Los Angeles (USA)", score1: null, score2: null },
  { id: 74, phase: "16avos de Final", group: null, team1: "1° Grupo E", team2: "3° Grupo A/B/C/D/F", date: "29 Jun 2026", time: "15:30", venue: "Gillette Stadium, Boston (USA)", score1: null, score2: null },
  { id: 76, phase: "16avos de Final", group: null, team1: "1° Grupo C", team2: "2° Grupo F", date: "29 Jun 2026", time: "12:00", venue: "NRG Stadium, Houston (USA)", score1: null, score2: null },
  { id: 75, phase: "16avos de Final", group: null, team1: "1° Grupo F", team2: "2° Grupo C", date: "29 Jun 2026", time: "20:00", venue: "Estadio Monterrey, Monterrey (MEX)", score1: null, score2: null },
  { id: 77, phase: "16avos de Final", group: null, team1: "1° Grupo I", team2: "3° Grupo C/D/F/G/H", date: "30 Jun 2026", time: "16:00", venue: "MetLife Stadium, New York (USA)", score1: null, score2: null },
  { id: 78, phase: "16avos de Final", group: null, team1: "2° Grupo E", team2: "2° Grupo I", date: "30 Jun 2026", time: "12:00", venue: "AT&T Stadium, Dallas (USA)", score1: null, score2: null },
  { id: 79, phase: "16avos de Final", group: null, team1: "1° Grupo A", team2: "3° Grupo C/E/F/H/I", date: "30 Jun 2026", time: "20:00", venue: "Estadio Azteca, CDMX (MEX)", score1: null, score2: null },
  { id: 80, phase: "16avos de Final", group: null, team1: "1° Grupo L", team2: "3° E/H/I/J/K", date: "01 Jul 2026", time: "11:00", venue: "Mercedes-Benz Stadium, Atlanta (USA)", score1: null, score2: null },
  { id: 81, phase: "16avos de Final", group: null, team1: "1° Grupo D", team2: "3° B/E/F/I/J", date: "01 Jul 2026", time: "19:00", venue: "Levi's Stadium, San Francisco (USA)", score1: null, score2: null },
  { id: 82, phase: "16avos de Final", group: null, team1: "1° Grupo G", team2: "3° A/E/H/I/J", date: "01 Jul 2026", time: "15:00", venue: "Lumen Field, Seattle (USA)", score1: null, score2: null },
  { id: 83, phase: "16avos de Final", group: null, team1: "2° Grupo K", team2: "2° Grupo L", date: "02 Jul 2026", time: "18:00", venue: "BMO Field, Toronto (CAN)", score1: null, score2: null },
  { id: 84, phase: "16avos de Final", group: null, team1: "1° Grupo H", team2: "2° Grupo J", date: "02 Jul 2026", time: "14:00", venue: "SoFi Stadium, Los Angeles (USA)", score1: null, score2: null },
  { id: 85, phase: "16avos de Final", group: null, team1: "1° Grupo B", team2: "3° E/F/G/I/J", date: "02 Jul 2026", time: "22:00", venue: "BC Place, Vancouver (CAN)", score1: null, score2: null },
  { id: 86, phase: "16avos de Final", group: null, team1: "1° Grupo J", team2: "2° Grupo H", date: "03 Jul 2026", time: "17:00", venue: "Hard Rock Stadium, Miami (USA)", score1: null, score2: null },
  { id: 87, phase: "16avos de Final", group: null, team1: "1° Grupo K", team2: "3° D/E/I/J/L", date: "03 Jul 2026", time: "20:30", venue: "Arrowhead Stadium, Kansas City (USA)", score1: null, score2: null },
  { id: 88, phase: "16avos de Final", group: null, team1: "2° Grupo D", team2: "2° Grupo G", date: "03 Jul 2026", time: "13:00", venue: "AT&T Stadium, Dallas (USA)", score1: null, score2: null },

  // --- OCTAVOS DE FINAL ---
  { id: 89, phase: "Octavos de Final", group: null, team1: "Ganador 74", team2: "Ganador 77", date: "04 Jul 2026", time: "12:00", venue: "Lincoln Financial Field, Philadelphia (USA)", score1: null, score2: null },
  { id: 90, phase: "Octavos de Final", group: null, team1: "Ganador 73", team2: "Ganador 75", date: "04 Jul 2026", time: "16:00", venue: "NRG Stadium, Houston (USA)", score1: null, score2: null },
  { id: 91, phase: "Octavos de Final", group: null, team1: "Ganador 76", team2: "Ganador 78", date: "05 Jul 2026", time: "15:00", venue: "MetLife Stadium, New York (USA)", score1: null, score2: null },
  { id: 92, phase: "Octavos de Final", group: null, team1: "Ganador 79", team2: "Ganador 80", date: "05 Jul 2026", time: "19:00", venue: "Estadio Azteca, CDMX (MEX)", score1: null, score2: null },
  { id: 93, phase: "Octavos de Final", group: null, team1: "Ganador 83", team2: "Ganador 84", date: "06 Jul 2026", time: "14:00", venue: "AT&T Stadium, Dallas (USA)", score1: null, score2: null },
  { id: 94, phase: "Octavos de Final", group: null, team1: "Ganador 81", team2: "Ganador 82", date: "06 Jul 2026", time: "19:00", venue: "Lumen Field, Seattle (USA)", score1: null, score2: null },
  { id: 95, phase: "Octavos de Final", group: null, team1: "Ganador 86", team2: "Ganador 88", date: "07 Jul 2026", time: "11:00", venue: "Mercedes-Benz Stadium, Atlanta (USA)", score1: null, score2: null },
  { id: 96, phase: "Octavos de Final", group: null, team1: "Ganador 85", team2: "Ganador 87", date: "07 Jul 2026", time: "15:00", venue: "BC Place, Vancouver (CAN)", score1: null, score2: null },

  // --- CUARTOS DE FINAL ---
  { id: 97, phase: "Cuartos de Final", group: null, team1: "Ganador 89", team2: "Ganador 90", date: "09 Jul 2026", time: "15:00", venue: "Gillette Stadium, Boston (USA)", score1: null, score2: null },
  { id: 98, phase: "Cuartos de Final", group: null, team1: "Ganador 93", team2: "Ganador 94", date: "10 Jul 2026", time: "14:00", venue: "SoFi Stadium, Los Angeles (USA)", score1: null, score2: null },
  { id: 99, phase: "Cuartos de Final", group: null, team1: "Ganador 91", team2: "Ganador 92", date: "11 Jul 2026", time: "16:00", venue: "Hard Rock Stadium, Miami (USA)", score1: null, score2: null },
  { id: 100, phase: "Cuartos de Final", group: null, team1: "Ganador 95", team2: "Ganador 96", date: "11 Jul 2026", time: "20:00", venue: "Arrowhead Stadium, Kansas City (USA)", score1: null, score2: null },

  // --- SEMIFINALES ---
  { id: 101, phase: "Semifinal", group: null, team1: "Ganador 97", team2: "Ganador 98", date: "14 Jul 2026", time: "14:00", venue: "AT&T Stadium, Dallas (USA)", score1: null, score2: null },
  { id: 102, phase: "Semifinal", group: null, team1: "Ganador 99", team2: "Ganador 100", date: "15 Jul 2026", time: "14:00", venue: "Mercedes-Benz Stadium, Atlanta (USA)", score1: null, score2: null },

  // --- TERCER PUESTO ---
  { id: 103, phase: "Tercer Puesto", group: null, team1: "Perdedor 101", team2: "Perdedor 102", date: "18 Jul 2026", time: "16:00", venue: "Hard Rock Stadium, Miami (USA)", score1: null, score2: null },

  // --- FINAL ---
  { id: 104, phase: "Final", group: null, team1: "Ganador 101", team2: "Ganador 102", date: "19 Jul 2026", time: "14:00", venue: "MetLife Stadium, New York (USA)", score1: null, score2: null }
];

// 3. Application State & Storage
let activeTab = "fase-grupos";
let activeGroupFilter = "Todos";
let activeSedeFilter = "Todos";
let searchQuery = "";
let favoriteTeam = localStorage.getItem("wc_2026_fav") || "Todos";

// Previous standings cache to calculate rank shifts
let previousStandingsCache = null;

// Seed localStorage with hardcoded official results so resetPredictions() los preserve
(function seedOfficialScores() {
  const _LIVE_KEY = 'wc_2026_live_ids';
  const saved    = JSON.parse(localStorage.getItem('wc_2026_predictions') || '{}');
  const liveIds  = new Set(JSON.parse(localStorage.getItem(_LIVE_KEY) || '[]').map(Number));
  let changed = false;
  matchesData.forEach(m => {
    if (m.score1 !== null && m.score2 !== null) {
      if (!saved[m.id]) {
        saved[m.id] = { score1: m.score1, score2: m.score2 };
        changed = true;
      }
      if (!liveIds.has(m.id)) {
        liveIds.add(m.id);
        changed = true;
      }
    }
  });
  if (changed) {
    localStorage.setItem('wc_2026_predictions', JSON.stringify(saved));
    localStorage.setItem(_LIVE_KEY, JSON.stringify([...liveIds]));
  }
})();

// Load predictions from localStorage (overrides hardcoded scores if user has saved different values)
if (localStorage.getItem("wc_2026_predictions")) {
  try {
    const saved = JSON.parse(localStorage.getItem("wc_2026_predictions"));
    matchesData.forEach(m => {
      if (saved[m.id]) {
        m.score1 = saved[m.id].score1;
        m.score2 = saved[m.id].score2;
      }
    });
  } catch (e) {
    console.error("Error loading saved predictions:", e);
  }
}

// 4. Core Calculations & Standings Generator
function calculateStandings() {
  const standings = {};
  
  for (const [groupName, teams] of Object.entries(GROUPS_CONFIG)) {
    standings[groupName] = teams.map(team => ({
      name: team,
      pj: 0, pg: 0, pe: 0, pp: 0,
      gf: 0, gc: 0, gd: 0, pts: 0
    }));
  }

  matchesData.forEach(match => {
    if (match.phase === "Fase de Grupos" && match.score1 !== null && match.score2 !== null) {
      const gName = match.group;
      const t1 = standings[gName].find(t => t.name === match.team1);
      const t2 = standings[gName].find(t => t.name === match.team2);

      if (t1 && t2) {
        t1.pj++; t2.pj++;
        t1.gf += match.score1; t2.gf += match.score2;
        t1.gc += match.score2; t2.gc += match.score1;
        t1.gd = t1.gf - t1.gc;
        t2.gd = t2.gf - t2.gc;

        if (match.score1 > match.score2) {
          t1.pg++; t1.pts += 3; t2.pp++;
        } else if (match.score1 < match.score2) {
          t2.pg++; t2.pts += 3; t1.pp++;
        } else {
          t1.pe++; t1.pts += 1;
          t2.pe++; t2.pts += 1;
        }
      }
    }
  });

  for (const groupName of Object.keys(standings)) {
    standings[groupName].sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.gd !== a.gd) return b.gd - a.gd;
      if (b.gf !== a.gf) return b.gf - a.gf;
      return a.name.localeCompare(b.name);
    });
  }

  return standings;
}

// Update the visual Stepper Progress indicator
function updateProgressStepper() {
  const phases = [
    { name: "Fase de Grupos", matches: matchesData.filter(m => m.phase === "Fase de Grupos"), node: "step-grupos" },
    { name: "16avos de Final", matches: matchesData.filter(m => m.phase === "16avos de Final"), node: "step-16avos" },
    { name: "Octavos de Final", matches: matchesData.filter(m => m.phase === "Octavos de Final"), node: "step-octavos" },
    { name: "Cuartos de Final", matches: matchesData.filter(m => m.phase === "Cuartos de Final"), node: "step-cuartos" },
    { name: "Semifinal", matches: matchesData.filter(m => m.phase === "Semifinal"), node: "step-semifinal" },
    { name: "Final", matches: matchesData.filter(m => m.phase === "Final" || m.phase === "Tercer Puesto"), node: "step-final" }
  ];

  phases.forEach(p => {
    const total = p.matches.length;
    const completed = p.matches.filter(m => m.score1 !== null && m.score2 !== null).length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    const nodeEl = document.getElementById(p.node);
    if (nodeEl) {
      const pctEl = nodeEl.querySelector(".step-percentage");
      if (pctEl) pctEl.textContent = `${pct}%`;

      nodeEl.classList.remove("active", "completed");
      if (pct === 100) {
        nodeEl.classList.add("completed");
      } else if (completed > 0 || activeTab === getTabByNode(p.node)) {
        nodeEl.classList.add("active");
      }
    }
  });
}

function getTabByNode(nodeId) {
  if (nodeId === "step-grupos") return "fase-grupos";
  if (nodeId === "step-16avos") return "eliminatorias";
  if (nodeId === "step-octavos") return "eliminatorias";
  if (nodeId === "step-cuartos") return "eliminatorias";
  if (nodeId === "step-semifinal") return "eliminatorias";
  return "eliminatorias";
}

// Automatically populate the Round of 32 qualifiers
function updateKnockoutQualifiers() {
  const standings = calculateStandings();
  
  const qualifiers = {};
  const thirdPlaceTeams = [];

  for (const [groupName, teams] of Object.entries(standings)) {
    const letter = groupName.replace("Grupo ", "");
    qualifiers[`1${letter}`] = teams[0].pj > 0 ? teams[0].name : `1° Grupo ${letter}`;
    qualifiers[`2${letter}`] = teams[1].pj > 0 ? teams[1].name : `2° Grupo ${letter}`;
    
    if (teams[2].pj > 0) {
      thirdPlaceTeams.push({
        name: teams[2].name,
        group: letter,
        pts: teams[2].pts,
        gd: teams[2].gd,
        gf: teams[2].gf
      });
    }
  }

  thirdPlaceTeams.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return 0;
  });

  const top8Thirds = thirdPlaceTeams.slice(0, 8);
  const thirdsList = top8Thirds.map(t => t.name);

  // Map qualifiers to Round of 32 games
  updateMatchTeams(73, qualifiers["2A"] || "2° Grupo A", qualifiers["2B"] || "2° Grupo B");
  const t3_74 = thirdsList.find(t => ["A", "B", "C", "D", "F"].includes(getGroupOfTeam(t))) || "3° A/B/C/D/F";
  updateMatchTeams(74, qualifiers["1E"] || "1° Grupo E", t3_74);
  updateMatchTeams(76, qualifiers["1C"] || "1° Grupo C", qualifiers["2F"] || "2° Grupo F");
  updateMatchTeams(75, qualifiers["1F"] || "1° Grupo F", qualifiers["2C"] || "2° Grupo C");
  
  const t3_77 = thirdsList.find(t => ["C", "D", "F", "G", "H"].includes(getGroupOfTeam(t)) && t !== t3_74) || "3° C/D/F/G/H";
  updateMatchTeams(77, qualifiers["1I"] || "1° Grupo I", t3_77);
  updateMatchTeams(78, qualifiers["2E"] || "2° Grupo E", qualifiers["2I"] || "2° Grupo I");
  
  const t3_79 = thirdsList.find(t => ["C", "E", "F", "H", "I"].includes(getGroupOfTeam(t)) && t !== t3_74 && t !== t3_77) || "3° C/E/F/H/I";
  updateMatchTeams(79, qualifiers["1A"] || "1° Grupo A", t3_79);
  
  const t3_80 = thirdsList.find(t => ["E", "H", "I", "J", "K"].includes(getGroupOfTeam(t)) && t !== t3_74 && t !== t3_77 && t !== t3_79) || "3° E/H/I/J/K";
  updateMatchTeams(80, qualifiers["1L"] || "1° Grupo L", t3_80);
  
  const t3_81 = thirdsList.find(t => ["B", "E", "F", "I", "J"].includes(getGroupOfTeam(t)) && t !== t3_74 && t !== t3_77 && t !== t3_79 && t !== t3_80) || "3° B/E/F/I/J";
  updateMatchTeams(81, qualifiers["1D"] || "1° Grupo D", t3_81);
  
  const t3_82 = thirdsList.find(t => ["A", "E", "H", "I", "J"].includes(getGroupOfTeam(t)) && t !== t3_74 && t !== t3_77 && t !== t3_79 && t !== t3_80 && t !== t3_81) || "3° A/E/H/I/J";
  updateMatchTeams(82, qualifiers["1G"] || "1° Grupo G", t3_82);
  
  updateMatchTeams(83, qualifiers["2K"] || "2° Grupo K", qualifiers["2L"] || "2° Grupo L");
  updateMatchTeams(84, qualifiers["1H"] || "1° Grupo H", qualifiers["2J"] || "2° Grupo J");
  
  const t3_85 = thirdsList.find(t => ["E", "F", "G", "I", "J"].includes(getGroupOfTeam(t)) && t !== t3_74 && t !== t3_77 && t !== t3_79 && t !== t3_80 && t !== t3_81 && t !== t3_82) || "3° E/F/G/I/J";
  updateMatchTeams(85, qualifiers["1B"] || "1° Grupo B", t3_85);
  
  updateMatchTeams(86, qualifiers["1J"] || "1° Grupo J", qualifiers["2H"] || "2° Grupo H");
  
  const t3_87 = thirdsList.find(t => ["D", "E", "I", "J", "L"].includes(getGroupOfTeam(t)) && t !== t3_74 && t !== t3_77 && t !== t3_79 && t !== t3_80 && t !== t3_81 && t !== t3_82 && t !== t3_85) || "3° D/E/I/J/L";
  updateMatchTeams(87, qualifiers["1K"] || "1° Grupo K", t3_87);
  updateMatchTeams(88, qualifiers["2D"] || "2° Grupo D", qualifiers["2G"] || "2° Grupo G");

  propagateKnockoutResults();
}

function propagateKnockoutResults() {
  // R32 -> R16
  propagateWinner(74, 77, 89);
  propagateWinner(73, 75, 90);
  propagateWinner(76, 78, 91);
  propagateWinner(79, 80, 92);
  propagateWinner(83, 84, 93);
  propagateWinner(81, 82, 94);
  propagateWinner(86, 88, 95);
  propagateWinner(85, 87, 96);

  // R16 -> QF
  propagateWinner(89, 90, 97);
  propagateWinner(93, 94, 98);
  propagateWinner(91, 92, 99);
  propagateWinner(95, 96, 100);

  // QF -> SF
  propagateWinner(97, 98, 101);
  propagateWinner(99, 100, 102);

  // SF -> Final & 3rd Place
  const sf1 = matchesData.find(m => m.id === 101);
  const sf2 = matchesData.find(m => m.id === 102);
  const finalMatch = matchesData.find(m => m.id === 104);
  const thirdMatch = matchesData.find(m => m.id === 103);

  if (sf1.score1 !== null && sf1.score2 !== null) {
    if (sf1.score1 > sf1.score2) {
      finalMatch.team1 = sf1.team1;
      thirdMatch.team1 = sf1.team2;
    } else {
      finalMatch.team1 = sf1.team2;
      thirdMatch.team1 = sf1.team1;
    }
  } else {
    finalMatch.team1 = "Ganador 101";
    thirdMatch.team1 = "Perdedor 101";
  }

  if (sf2.score1 !== null && sf2.score2 !== null) {
    if (sf2.score1 > sf2.score2) {
      finalMatch.team2 = sf2.team1;
      thirdMatch.team2 = sf2.team2;
    } else {
      finalMatch.team2 = sf2.team2;
      thirdMatch.team2 = sf2.team1;
    }
  } else {
    finalMatch.team2 = "Ganador 102";
    thirdMatch.team2 = "Perdedor 102";
  }
}

// Helpers for Bracket calculations
function getGroupOfTeam(teamName) {
  if (!teamName) return null;
  for (const [groupName, teams] of Object.entries(GROUPS_CONFIG)) {
    if (teams.includes(teamName)) {
      return groupName.replace("Grupo ", "");
    }
  }
  return null;
}

function updateMatchTeams(matchId, t1, t2) {
  const m = matchesData.find(match => match.id === matchId);
  if (m) {
    m.team1 = t1;
    m.team2 = t2;
  }
}

function propagateWinner(prevMatchId1, prevMatchId2, nextMatchId) {
  const prev1 = matchesData.find(m => m.id === prevMatchId1);
  const prev2 = matchesData.find(m => m.id === prevMatchId2);
  const next = matchesData.find(m => m.id === nextMatchId);

  if (next) {
    if (prev1 && prev1.score1 !== null && prev1.score2 !== null) {
      next.team1 = prev1.score1 > prev1.score2 ? prev1.team1 : prev1.team2;
    } else {
      next.team1 = `Ganador ${prevMatchId1}`;
    }

    if (prev2 && prev2.score1 !== null && prev2.score2 !== null) {
      next.team2 = prev2.score1 > prev2.score2 ? prev2.team1 : prev2.team2;
    } else {
      next.team2 = `Ganador ${prevMatchId2}`;
    }
  }
}

// Save predictions
function savePredictions() {
  const saveObj = {};
  matchesData.forEach(m => {
    if (m.score1 !== null || m.score2 !== null) {
      saveObj[m.id] = { score1: m.score1, score2: m.score2 };
    }
  });
  localStorage.setItem("wc_2026_predictions", JSON.stringify(saveObj));
}

// Reset predictions — conserva resultados oficiales sincronizados de la API
function resetPredictions() {
  const liveIds = new Set(
    JSON.parse(localStorage.getItem('wc_2026_live_ids') || '[]').map(Number)
  );

  matchesData.forEach(m => {
    if (!liveIds.has(m.id)) {
      m.score1 = null;
      m.score2 = null;
    }
  });

  // Reconstruye localStorage conservando solo los scores oficiales
  const saveObj = {};
  matchesData.forEach(m => {
    if (m.score1 !== null || m.score2 !== null) {
      saveObj[m.id] = { score1: m.score1, score2: m.score2 };
    }
  });
  localStorage.setItem("wc_2026_predictions", JSON.stringify(saveObj));

  updateKnockoutQualifiers();
  updateProgressStepper();
  updateFanZoneStats();
  renderApp();
}

// 5. Template Renderers
function getTeamBadgeHtml(teamName) {
  if (TEAM_FLAGS[teamName]) {
    return `<div class="team-badge t-primary" title="${teamName}">${TEAM_FLAGS[teamName]}</div>`;
  }
  return `<div class="team-badge" title="${teamName}">🏆</div>`;
}

/**
 * Construye una mini-barra de probabilidades (Gana1 / Empate / Gana2) para un partido.
 * Usa calculateMatchProbabilities() del motor de pronosticos.js con el modelo activo
 * (persistido en localStorage). Devuelve "" si el motor no está cargado o si algún
 * equipo aún no está definido (ej. "Ganador A" en eliminatorias).
 *
 * @param {string} team1 - Nombre del equipo local
 * @param {string} team2 - Nombre del equipo visitante
 * @returns {string} HTML de la barra o cadena vacía
 */
function getMatchProbBar(team1, team2) {
  // El motor vive en pronosticos.js; si no está cargado, no mostramos nada.
  if (typeof calculateMatchProbabilities !== "function") return "";
  if (typeof TEAM_RATINGS === "undefined") return "";
  // Sólo calculamos cuando ambos equipos son selecciones reales (con rating).
  if (!TEAM_RATINGS[team1] || !TEAM_RATINGS[team2]) return "";

  const p = calculateMatchProbabilities(team1, team2);
  const modelName = (typeof PREDICTION_MODELS !== "undefined" && typeof activeModelId !== "undefined")
    ? (PREDICTION_MODELS.find(m => m.id === activeModelId)?.shortName || "Combinado")
    : "Combinado";

  return `
    <div class="prob-strip" title="Probabilidad según modelo ${modelName}">
      <div class="prob-strip-bar">
        <div class="prob-seg prob-seg-1" style="width:${p.p1}%"></div>
        <div class="prob-seg prob-seg-d" style="width:${p.pDraw}%"></div>
        <div class="prob-seg prob-seg-2" style="width:${p.p2}%"></div>
      </div>
      <div class="prob-strip-labels">
        <span class="prob-lbl prob-lbl-1">${p.p1}%</span>
        <span class="prob-lbl prob-lbl-d">Empate ${p.pDraw}%</span>
        <span class="prob-lbl prob-lbl-2">${p.p2}%</span>
      </div>
    </div>`;
}

/**
 * Genera el HTML de un nombre de equipo como enlace que abre el modal de
 * estadísticas del país. Si el equipo no es una selección real (placeholder
 * de eliminatorias), se devuelve texto plano sin enlace.
 *
 * @param {string} team - Nombre del equipo
 * @param {boolean} isFavorite - Si es el equipo favorito (para resaltar)
 * @returns {string} HTML del nombre
 */
function getTeamNameHtml(team, isFavorite) {
  const favStyle = isFavorite ? "color:var(--secondary);font-weight:800;" : "";
  // Es link sólo si tenemos datos del equipo (existe en el catálogo de banderas).
  const isReal = typeof TEAM_FLAGS !== "undefined" && TEAM_FLAGS[team];
  if (isReal) {
    return `<span class="team-name team-name-link" style="${favStyle}"
      onclick="openTeamModal('${team.replace(/'/g, "\\'")}')"
      title="Ver estadísticas de ${team}" role="button" tabindex="0"
      onkeydown="if(event.key==='Enter'||event.key===' ')openTeamModal('${team.replace(/'/g, "\\'")}')">${team}</span>`;
  }
  return `<span class="team-name" style="${favStyle}">${team}</span>`;
}

function renderMatchesList(targetContainerId = "matches-container") {
  const container = document.getElementById(targetContainerId);
  container.innerHTML = "";

  let filtered = matchesData;

  // Search filter
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(m => 
      (m.team1 && m.team1.toLowerCase().includes(q)) || 
      (m.team2 && m.team2.toLowerCase().includes(q)) ||
      (m.group && m.group.toLowerCase().includes(q)) ||
      (m.phase && m.phase.toLowerCase().includes(q)) ||
      (m.venue && m.venue.toLowerCase().includes(q))
    );
  }

  // Tab filter
  if (activeTab === "fase-grupos") {
    filtered = filtered.filter(m => m.phase === "Fase de Grupos");
    if (activeGroupFilter !== "Todos") {
      filtered = filtered.filter(m => m.group === activeGroupFilter);
    }
  } else if (activeTab === "eliminatorias") {
    filtered = filtered.filter(m => m.phase !== "Fase de Grupos");
  }

  // Sede filter
  if (activeSedeFilter !== "Todos") {
    filtered = filtered.filter(m => m.venue.includes(activeSedeFilter));
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <p>No se encontraron partidos para los filtros seleccionados.</p>
      </div>
    `;
    document.getElementById("results-count").textContent = `0 partidos`;
    return;
  }

  document.getElementById("results-count").textContent = `${filtered.length} partidos`;

  filtered.forEach(match => {
    const card = document.createElement("div");
    card.className = "match-card";
    
    // Highlight if favorite team plays
    if (favoriteTeam !== "Todos" && (match.team1 === favoriteTeam || match.team2 === favoriteTeam)) {
      card.classList.add("favorite-match-highlight");
    }

    card.innerHTML = `
      <div class="match-header">
        <span class="match-number">Partido ${match.id}</span>
        <span class="${match.group ? 'match-group' : 'match-phase'}">
          ${match.group ? match.group : match.phase}
        </span>
      </div>
      <div class="match-body">
        <div class="team-row">
          <div class="team-info">
            ${getTeamBadgeHtml(match.team1)}
            ${getTeamNameHtml(match.team1, match.team1 === favoriteTeam)}
          </div>
          <input type="number" min="0" class="team-score prediction-input"
            data-match-id="${match.id}" data-team="1"
            value="${match.score1 !== null ? match.score1 : ''}" placeholder="-">
        </div>
        <div class="team-row">
          <div class="team-info">
            ${getTeamBadgeHtml(match.team2)}
            ${getTeamNameHtml(match.team2, match.team2 === favoriteTeam)}
          </div>
          <input type="number" min="0" class="team-score prediction-input"
            data-match-id="${match.id}" data-team="2"
            value="${match.score2 !== null ? match.score2 : ''}" placeholder="-">
        </div>
        ${getMatchProbBar(match.team1, match.team2)}
        <div class="match-meta-info">
          <div class="meta-item">
            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <span>${match.date.replace(' 2026','').toLowerCase()} &middot; <strong>${match.time}</strong></span>
          </div>
          <div class="meta-item venue">
            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span>${match.venue}</span>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Attach input listeners
  container.querySelectorAll(".prediction-input").forEach(input => {
    input.addEventListener("input", handlePredictionChange);
  });
}

function renderGroupStandings(targetContainerId = "matches-container", singleGroup = null) {
  const container = document.getElementById(targetContainerId);
  container.innerHTML = "";
  
  const groupsWrapper = document.createElement("div");
  groupsWrapper.className = "groups-container";
  if (singleGroup) {
    groupsWrapper.style.gridTemplateColumns = "1fr";
  }
  
  const standings = calculateStandings();

  for (const [groupName, teams] of Object.entries(standings)) {
    if (singleGroup && groupName !== singleGroup) continue;

    const card = document.createElement("div");
    card.className = "group-card";
    card.id = `standings-${groupName.replace(" ", "-")}`;
    
    let tableRowsHtml = "";
    teams.forEach((t, index) => {
      const isQualifier = index < 2;
      const rowStyle = isQualifier ? 'style="background: rgba(16, 185, 129, 0.04); font-weight: 500;"' : '';
      const posClass = isQualifier ? 'style="color: var(--primary); font-weight: 800;"' : '';
      const flag = TEAM_FLAGS[t.name] || "🏴";

      // Highlight if favorite team
      const isFav = t.name === favoriteTeam;
      const favStyle = isFav ? 'style="color: var(--secondary); font-weight: bold; background: rgba(251, 191, 36, 0.08);"' : '';

      tableRowsHtml += `
        <tr data-team-row="${t.name}" ${favStyle || rowStyle}>
          <td ${posClass}>${index + 1}</td>
          <td><span style="margin-right: 6px;">${flag}</span>${t.name}</td>
          <td>${t.pj}</td>
          <td>${t.gd > 0 ? '+' + t.gd : t.gd}</td>
          <td class="col-pts">${t.pts}</td>
        </tr>
      `;
    });

    card.innerHTML = `
      <div class="group-card-header">${groupName}</div>
      <table class="group-table">
        <thead>
          <tr>
            <th style="width: 10%;">#</th>
            <th style="width: 50%;">Equipo</th>
            <th style="width: 13%;">PJ</th>
            <th style="width: 13%;">DG</th>
            <th style="width: 14%;">Pts</th>
          </tr>
        </thead>
        <tbody>
          ${tableRowsHtml}
        </tbody>
      </table>
    `;
    groupsWrapper.appendChild(card);
  }

  container.appendChild(groupsWrapper);
}

function renderBracket() {
  const container = document.getElementById("matches-container");
  container.innerHTML = "";

  const bracketWrapper = document.createElement("div");
  bracketWrapper.className = "bracket-wrapper";

  const bracketContainer = document.createElement("div");
  bracketContainer.className = "bracket-container";

  const getM = (id) => matchesData.find(m => m.id === id);

  // Symmetrical dual side columns
  const cols = [
    { name: "16avos (Izquierda)", ids: [73, 74, 75, 76] },
    { name: "Octavos (Izq)", ids: [89, 90] },
    { name: "Cuartos (Izq)", ids: [97] },
    { name: "Semifinal (Izq)", ids: [101] },
    { name: "FINAL & 3° PUESTO", ids: [104, 103], specialClass: "center-trophy" },
    { name: "Semifinal (Der)", ids: [102] },
    { name: "Cuartos (Der)", ids: [98] },
    { name: "Octavos (Der)", ids: [93, 94] },
    { name: "16avos (Derecha)", ids: [81, 82, 83, 84] }
  ];

  cols.forEach(col => {
    const colDiv = document.createElement("div");
    colDiv.className = `bracket-column ${col.specialClass || ''}`;
    
    const colHeader = document.createElement("div");
    colHeader.className = "bracket-header";
    colHeader.textContent = col.name;
    colDiv.appendChild(colHeader);

    // If center trophy column, render a floating golden trophy icon!
    if (col.specialClass === "center-trophy") {
      const trophy = document.createElement("div");
      trophy.className = "trophy-badge";
      trophy.textContent = "🏆";
      colDiv.appendChild(trophy);
    }

    col.ids.forEach(id => {
      const match = getM(id);
      if (!match) return;

      const card = document.createElement("div");
      card.className = "bracket-match";
      
      const flag1 = TEAM_FLAGS[match.team1] || "🏆";
      const flag2 = TEAM_FLAGS[match.team2] || "🏆";
      
      const isWinner1 = match.score1 !== null && match.score2 !== null && match.score1 > match.score2;
      const isWinner2 = match.score1 !== null && match.score2 !== null && match.score2 > match.score1;

      card.innerHTML = `
        <div class="bracket-match-num">P${match.id} · ${match.date.replace(' 2026','').toLowerCase()} ${match.time}</div>
        <div class="bracket-team ${isWinner1 ? 'winner' : ''}">
          <span style="${match.team1 === favoriteTeam ? 'color: var(--secondary); font-weight: 800;' : ''}">${flag1} ${match.team1}</span>
          <input type="number" min="0" class="prediction-input"
            data-match-id="${match.id}" data-team="1" value="${match.score1 !== null ? match.score1 : ''}">
        </div>
        <div class="bracket-team ${isWinner2 ? 'winner' : ''}">
          <span style="${match.team2 === favoriteTeam ? 'color: var(--secondary); font-weight: 800;' : ''}">${flag2} ${match.team2}</span>
          <input type="number" min="0" class="prediction-input"
            data-match-id="${match.id}" data-team="2" value="${match.score2 !== null ? match.score2 : ''}">
        </div>
        <div style="font-size: 0.6rem; color: var(--text-muted); margin-top: 4px; text-align: center;">
          ${match.time} - ${match.venue.split(',')[0]}
        </div>
      `;
      colDiv.appendChild(card);
    });

    bracketContainer.appendChild(colDiv);
  });

  bracketWrapper.appendChild(bracketContainer);
  container.appendChild(bracketWrapper);
  
  // Attach input listeners
  document.querySelectorAll(".bracket-match .prediction-input").forEach(input => {
    input.addEventListener("input", handlePredictionChange);
  });
  
  document.getElementById("results-count").textContent = "Fixture Gráfico de Avance de Fases";
}

// 6. Action Handlers & Routing
function handlePredictionChange(e) {
  const matchId = parseInt(e.target.dataset.matchId);
  const team = parseInt(e.target.dataset.team);
  const val = e.target.value === "" ? null : parseInt(e.target.value);

  const match = matchesData.find(m => m.id === matchId);
  if (match) {
    // Capture standings before change
    const oldStandings = calculateStandings();
    
    if (team === 1) match.score1 = val;
    if (team === 2) match.score2 = val;
    
    savePredictions();
    updateKnockoutQualifiers();
    updateProgressStepper();
    updateFanZoneStats();

    // Rerender active view
    if (activeTab === "fase-grupos") {
      // In dual-dashboard view:
      renderMatchesList("dual-left-pane");
      renderGroupStandings("dual-right-pane", activeGroupFilter !== "Todos" ? activeGroupFilter : null);
      
      // Animate shifts/flashes on updated standings
      const newStandings = calculateStandings();
      animateStandingsUpdates(oldStandings, newStandings);
    } else if (activeTab === "tablas-grupos") {
      renderGroupStandings();
    } else if (activeTab === "llave-bracket") {
      renderBracket();
    } else {
      renderMatchesList();
    }
  }
}

// Sparkle flashing changes in real-time standings
function animateStandingsUpdates(oldS, newS) {
  for (const groupName of Object.keys(newS)) {
    const oldTeams = oldS[groupName].map(t => t.name);
    const newTeams = newS[groupName].map(t => t.name);
    
    newTeams.forEach((tName, newIdx) => {
      const oldIdx = oldTeams.indexOf(tName);
      if (oldIdx !== newIdx) {
        // Highlight row in UI
        const row = document.querySelector(`[data-team-row="${tName}"]`);
        if (row) {
          row.classList.add("rank-updated");
          setTimeout(() => row.classList.remove("rank-updated"), 800);
        }
      }
    });
  }
}

function handleTabChange(tabId) {
  activeTab = tabId;
  
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
  if (activeBtn) activeBtn.classList.add("active");

  // Show/hide group-stage filters
  const groupFilterContainer = document.getElementById("group-filter-container");
  if (tabId === "fase-grupos") {
    groupFilterContainer.style.display = "flex";
  } else {
    groupFilterContainer.style.display = "none";
  }

  // Update stepper active classes
  document.querySelectorAll(".step-node").forEach(node => {
    node.classList.remove("active");
  });
  if (tabId === "fase-grupos") {
    document.getElementById("step-grupos").classList.add("active");
  } else if (tabId === "llave-bracket") {
    document.getElementById("step-final").classList.add("active");
  }

  renderApp();
}

function renderApp() {
  const container = document.getElementById("matches-container");
  container.innerHTML = "";

  if (activeTab === "fase-grupos") {
    // RENDER A GORGEOUS DUAL DASHBOARD (Matches on Left, Standings on Right!)
    container.className = ""; // clear default grid
    
    const dualGrid = document.createElement("div");
    dualGrid.className = "dual-dashboard";
    
    const leftPane = document.createElement("div");
    leftPane.id = "dual-left-pane";
    leftPane.className = "matches-grid";
    
    const rightPane = document.createElement("div");
    rightPane.id = "dual-right-pane";
    
    dualGrid.appendChild(leftPane);
    dualGrid.appendChild(rightPane);
    container.appendChild(dualGrid);
    
    renderMatchesList("dual-left-pane");
    renderGroupStandings("dual-right-pane", activeGroupFilter !== "Todos" ? activeGroupFilter : null);
  } else if (activeTab === "tablas-grupos") {
    container.className = "matches-grid";
    renderGroupStandings();
  } else if (activeTab === "llave-bracket") {
    container.className = "";
    renderBracket();
  } else {
    container.className = "matches-grid";
    renderMatchesList();
  }
}

// 7. Gamified Favorite Team (Fan Zone Stats)
function updateFanZoneStats() {
  const statsContainer = document.getElementById("fan-zone-stats");
  if (favoriteTeam === "Todos") {
    statsContainer.innerHTML = `<span>Selecciona tu país favorito para ver estadísticas especiales de avance!</span>`;
    return;
  }

  // Calculate team specific stats
  let pj = 0, pg = 0, pe = 0, pp = 0, gf = 0, gc = 0, pts = 0;
  
  matchesData.forEach(m => {
    if (m.phase === "Fase de Grupos" && m.score1 !== null && m.score2 !== null) {
      if (m.team1 === favoriteTeam) {
        pj++; gf += m.score1; gc += m.score2;
        if (m.score1 > m.score2) { pg++; pts += 3; }
        else if (m.score1 < m.score2) pp++;
        else pe++;
      } else if (m.team2 === favoriteTeam) {
        pj++; gf += m.score2; gc += m.score1;
        if (m.score2 > m.score1) { pg++; pts += 3; }
        else if (m.score2 < m.score1) pp++;
        else pe++;
      }
    }
  });

  // Calculate predicted ending round
  let currentStatus = "Eliminado en Grupos";
  const standings = calculateStandings();
  const teamGroup = getGroupOfTeam(favoriteTeam);
  
  if (teamGroup) {
    const groupTeams = standings[`Grupo ${teamGroup}`].map(t => t.name);
    const rank = groupTeams.indexOf(favoriteTeam);
    
    if (rank === 0 || rank === 1) {
      currentStatus = "Clasificado a 16avos";
    }
  }

  // Check knockouts
  const knockoutPhases = ["16avos de Final", "Octavos de Final", "Cuartos de Final", "Semifinal", "Final"];
  knockoutPhases.forEach(p => {
    const matches = matchesData.filter(m => m.phase === p);
    matches.forEach(m => {
      if (m.score1 !== null && m.score2 !== null) {
        const winner = m.score1 > m.score2 ? m.team1 : m.team2;
        if (winner === favoriteTeam) {
          if (p === "16avos de Final") currentStatus = "Clasificado a Octavos";
          if (p === "Octavos de Final") currentStatus = "Clasificado a Cuartos";
          if (p === "Cuartos de Final") currentStatus = "Clasificado a Semifinales";
          if (p === "Semifinal") currentStatus = "¡CLASIFICADO A LA FINAL! 🏆";
          if (p === "Final") currentStatus = "🏆 ¡CAMPEÓN DEL MUNDO! 🌟";
        }
      }
    });
  });

  statsContainer.innerHTML = `
    <div>PJ: <span class="fan-stat-badge">${pj}</span></div>
    <div>PG: <span class="fan-stat-badge" style="background:rgba(59,130,246,0.1);color:var(--info);">${pg}</span></div>
    <div>Pts: <span class="fan-stat-badge" style="background:var(--secondary-glow);color:var(--secondary);">${pts}</span></div>
    <div>Progreso Simulado: <strong style="color: var(--primary); margin-left: 5px;">${currentStatus}</strong></div>
  `;
}

// 8. Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  // Populate Sedes filter dropdown
  const sedes = [...new Set(matchesData.map(m => {
    const match = m.venue.match(/,\s*([^)]+)/);
    return match ? match[1].trim() : null;
  }))].filter(Boolean).sort();

  const sedeSelect = document.getElementById("filter-sede");
  sedes.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    sedeSelect.appendChild(opt);
  });

  // Populate Favorite Team selector dropdown
  const favTeamSelect = document.getElementById("fan-zone-select");
  const allTeams = [...new Set(matchesData.filter(m => m.phase === "Fase de Grupos").flatMap(m => [m.team1, m.team2]))].sort();
  
  allTeams.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = `${TEAM_FLAGS[t] || "🏴"} ${t}`;
    if (t === favoriteTeam) opt.selected = true;
    favTeamSelect.appendChild(opt);
  });

  // Attach favorite team listener
  favTeamSelect.addEventListener("change", (e) => {
    favoriteTeam = e.target.value;
    localStorage.setItem("wc_2026_fav", favoriteTeam);
    updateFanZoneStats();
    renderApp();
  });

  // Search listener
  document.getElementById("search-input").addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderApp();
  });

  // Filter listeners
  document.getElementById("filter-group").addEventListener("change", (e) => {
    activeGroupFilter = e.target.value;
    renderApp();
  });

  document.getElementById("filter-sede").addEventListener("change", (e) => {
    activeSedeFilter = e.target.value;
    renderApp();
  });

  // Reset button
  document.getElementById("reset-predictions-btn").addEventListener("click", () => {
    if (confirm("¿Borrar tus predicciones personales? Los resultados oficiales de partidos ya jugados se conservarán.")) {
      resetPredictions();
    }
  });

  // Stepper nodes link to tabs/sections
  document.querySelectorAll(".step-node").forEach(node => {
    node.addEventListener("click", (e) => {
      const stepId = e.currentTarget.id;
      if (stepId === "step-grupos") {
        handleTabChange("fase-grupos");
      } else {
        handleTabChange("llave-bracket");
      }
    });
  });

  // Tab navigation
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const tabId = e.currentTarget.dataset.tab;
      handleTabChange(tabId);
    });
  });

  updateKnockoutQualifiers();
  updateProgressStepper();
  updateFanZoneStats();
  renderApp();

  // Countdown Timer (opening match: June 11, 2026 14:00 Peru Time)
  const countdownDate = new Date("Jun 11, 2026 14:00:00").getTime();
  
  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
      clearInterval(timer);
      document.getElementById("countdown-title").textContent = "¡EL MUNDIAL HA COMENZADO!";
      document.getElementById("countdown-timer").style.display = "none";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("cd-days").textContent = days.toString().padStart(2, "0");
    document.getElementById("cd-hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("cd-minutes").textContent = minutes.toString().padStart(2, "0");
  }, 1000);
});
