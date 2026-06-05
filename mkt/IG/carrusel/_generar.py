#!/usr/bin/env python3
"""
Genera los HTML de cada slide del carrusel de Instagram (1080x1350, formato 4:5).
Identidad visual de la app: navy profundo + dorado + acentos.
Luego un script bash los convierte a PNG con Chrome headless.
"""
import os

OUT = os.path.dirname(os.path.abspath(__file__))

# ── CSS compartido entre todos los slides ──────────────────────────────
BASE_CSS = """
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:1080px; height:1350px; overflow:hidden; }
  body {
    font-family: -apple-system, 'Helvetica Neue', 'Arial Black', sans-serif;
    background: radial-gradient(ellipse 90% 60% at 50% 0%, #14223f 0%, #0b1424 45%, #070d18 100%);
    color: #fff; position:relative;
  }
  /* franja superior tricolor (teal-dorado-morado) */
  .topbar { position:absolute; top:0; left:0; right:0; height:14px;
    background: linear-gradient(90deg,#2DD4BF 0%, #F5C400 50%, #A78BFA 100%); }
  /* estrellas decorativas */
  .stars { position:absolute; bottom:120px; left:0; right:0; text-align:center;
    color:rgba(212,175,55,.35); font-size:26px; letter-spacing:24px; }
  .wrap { position:absolute; inset:0; padding:96px 84px 110px;
    display:flex; flex-direction:column; }
  .eyebrow { display:inline-block; align-self:flex-start;
    font-size:26px; font-weight:800; letter-spacing:.16em; text-transform:uppercase;
    color:#F5C400; background:rgba(212,175,55,.12);
    border:1px solid rgba(212,175,55,.4); padding:10px 22px; border-radius:99px; }
  .big { font-weight:900; line-height:.98; letter-spacing:-.01em; text-transform:uppercase; }
  .gold { color:#F5C400; }
  .teal { color:#2DD4BF; }
  .purple { color:#A78BFA; }
  .muted { color:rgba(255,255,255,.62); font-weight:600; }
  .footer { position:absolute; left:84px; right:84px; bottom:60px;
    display:flex; align-items:center; justify-content:space-between;
    font-size:30px; font-weight:800; }
  .footer .brand { color:#fff; }
  .footer .handle { color:#F5C400; }
  .pageno { position:absolute; top:64px; right:84px;
    font-size:30px; font-weight:900; color:rgba(255,255,255,.35); }
  .pill { display:inline-flex; align-items:center; gap:18px;
    background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.12);
    border-radius:22px; padding:26px 34px; font-size:40px; font-weight:800; }
  .pill .dot { width:22px; height:22px; border-radius:50%; flex-shrink:0; }
  .bar { height:30px; border-radius:99px; background:rgba(255,255,255,.08); overflow:hidden; }
  .bar > i { display:block; height:100%; border-radius:99px; }
"""

def page(body, css_extra=""):
    return f"""<!DOCTYPE html><html><head><meta charset="utf-8">
<style>{BASE_CSS}{css_extra}</style></head><body>{body}</body></html>"""

slides = {}

# ── SLIDE 1 — Portada / Hook ───────────────────────────────────────────
slides["slide-1"] = page(f"""
<div class="topbar"></div>
<div class="pageno">01</div>
<div class="wrap">
  <span class="eyebrow">⚽ Copa Mundial FIFA 2026</span>
  <div style="margin-top:auto; margin-bottom:auto;">
    <div class="big" style="font-size:120px;">EL MUNDIAL<br><span class="gold">2026</span></div>
    <div class="big" style="font-size:120px; margin-top:8px;">COMO NUNCA<br>LO VISTE</div>
    <p class="muted" style="font-size:40px; margin-top:48px; line-height:1.35;">
      104 partidos · en hora Lima ·<br>cuadro real + proyección · 5 modelos de pronóstico
    </p>
  </div>
</div>
<div class="stars">★ ★ ★ ★ ★</div>
<div class="footer"><span class="brand">mundialpe.vercel.app</span><span class="handle">@msmgxe</span></div>
""")

# ── SLIDE 2 — Hora Lima ────────────────────────────────────────────────
slides["slide-2"] = page(f"""
<div class="topbar"></div>
<div class="pageno">02</div>
<div class="wrap">
  <span class="eyebrow teal" style="color:#2DD4BF;border-color:rgba(45,212,191,.4);background:rgba(45,212,191,.12);">🕐 Sin confusiones</span>
  <div style="margin-top:auto; margin-bottom:auto;">
    <div class="big" style="font-size:150px;">104</div>
    <div class="big" style="font-size:88px; margin-top:-6px;">PARTIDOS</div>
    <div class="big gold" style="font-size:96px; margin-top:40px;">EN HORA<br>DE LIMA</div>
    <p class="muted" style="font-size:42px; margin-top:48px; line-height:1.35;">
      Nada de "17:00 ET".<br>España vs Marruecos, en <span style="color:#fff;font-weight:800;">tu</span> hora. Directo.
    </p>
  </div>
</div>
<div class="footer"><span class="brand">mundialpe.vercel.app</span><span class="handle">@msmgxe</span></div>
""")

# ── SLIDE 3 — 5 modelos ────────────────────────────────────────────────
def model_row(name, color, pct):
    return f"""<div style="margin-bottom:30px;">
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:38px;font-weight:800;margin-bottom:12px;">
        <span style="display:flex;align-items:center;gap:18px;"><span class="dot" style="background:{color};"></span>{name}</span>
        <span style="color:{color};">{pct}%</span>
      </div>
      <div class="bar"><i style="width:{pct}%;background:{color};"></i></div>
    </div>"""

models = (model_row("FIFA Ranking", "#3B82F6", 45)
        + model_row("Elo Fútbol", "#A78BFA", 44)
        + model_row("Dixon-Coles", "#2DD4BF", 38)
        + model_row("Combinado", "#F5C400", 42))

slides["slide-3"] = page(f"""
<div class="topbar"></div>
<div class="pageno">03</div>
<div class="wrap">
  <span class="eyebrow">📊 Lo que nadie más tiene</span>
  <div class="big" style="font-size:104px; margin-top:40px;">NO UN MODELO.<br><span class="gold">CINCO.</span></div>
  <p class="muted" style="font-size:36px; margin:28px 0 40px;">Probabilidad por partido. No es opinión, son datos.</p>
  <div>{models}</div>
</div>
<div class="footer"><span class="brand">mundialpe.vercel.app</span><span class="handle">@msmgxe</span></div>
""")

# ── SLIDE 4 — Real + Proyección ────────────────────────────────────────
slides["slide-4"] = page(f"""
<div class="topbar"></div>
<div class="pageno">04</div>
<div class="wrap">
  <span class="eyebrow purple" style="color:#A78BFA;border-color:rgba(167,139,250,.4);background:rgba(167,139,250,.12);">🌳 El cuadro completo</span>
  <div style="margin-top:auto;margin-bottom:auto;">
    <div class="pill" style="font-size:46px;"><span class="dot" style="background:#10B981;"></span>VISTA REAL</div>
    <p class="muted" style="font-size:40px;margin:24px 0 56px;line-height:1.3;">Se llena <span style="color:#fff;font-weight:800;">sola</span> con los resultados de verdad.</p>
    <div class="pill" style="font-size:46px;"><span class="dot" style="background:#F5C400;"></span>PROYECCIÓN</div>
    <p class="muted" style="font-size:40px;margin:24px 0 0;line-height:1.3;">Quién sería <span class="gold" style="font-weight:800;">campeón</span> según los datos.</p>
    <div class="big" style="font-size:72px;margin-top:64px;">DOS VISTAS.<br>UN SOLO LUGAR.</div>
  </div>
</div>
<div class="footer"><span class="brand">mundialpe.vercel.app</span><span class="handle">@msmgxe</span></div>
""")

# ── SLIDE 5 — CTA / Precio ─────────────────────────────────────────────
slides["slide-5"] = page(f"""
<div class="topbar"></div>
<div class="pageno">05</div>
<div class="wrap" style="text-align:center;align-items:center;">
  <span class="eyebrow" style="align-self:center;">🔥 Acceso de lanzamiento</span>
  <div style="margin-top:auto;margin-bottom:auto;">
    <p class="muted" style="font-size:44px;">Toda la temporada</p>
    <div class="big gold" style="font-size:240px;line-height:.9;margin:10px 0;">S/19<span style="font-size:120px;">.90</span></div>
    <p class="muted" style="font-size:40px;">pago único · por Yape</p>
    <div style="margin-top:70px;border-top:1px solid rgba(255,255,255,.12);padding-top:60px;">
      <div class="big" style="font-size:64px;">ESCRÍBEME 👉</div>
      <div class="big gold" style="font-size:72px;margin-top:14px;">@msmgxe</div>
      <p class="muted" style="font-size:38px;margin-top:24px;">link en mi bio · mundialpe.vercel.app</p>
    </div>
  </div>
</div>
<div class="stars">★ ★ ★ ★ ★</div>
""")

for name, html in slides.items():
    with open(os.path.join(OUT, name + ".html"), "w") as f:
        f.write(html)
print(f"Generados {len(slides)} slides HTML")
