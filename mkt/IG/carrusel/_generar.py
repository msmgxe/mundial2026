#!/usr/bin/env python3
"""
Genera los slides del carrusel de Instagram en dos formatos + portada de destacado.
Identidad visual de la app: navy profundo + dorado + acentos.

Uso:
  python3 _generar.py vertical   → 5 slides 1080x1350 (4:5, recomendado feed)
  python3 _generar.py square     → 5 slides 1080x1080 (1:1)
  python3 _generar.py cover      → portada de Historia Destacada 1080x1920

Luego _exportar.sh los convierte a PNG con Chrome headless.
"""
import os, sys

OUT = os.path.dirname(os.path.abspath(__file__))
FMT = sys.argv[1] if len(sys.argv) > 1 else "vertical"

# ── Variables de tamaño por formato (se inyectan como CSS custom props) ──
SIZES = {
  "vertical": dict(H=1350, pad=96, hero=120, xl=150, lg=104, md=72, body=40, price=240, eyebrow=26, footer=30),
  "square":   dict(H=1080, pad=70, hero=92,  xl=120, lg=82,  md=58, body=33, price=190, eyebrow=24, footer=27),
}

def base_css(s):
    return f"""
  * {{ margin:0; padding:0; box-sizing:border-box; }}
  html,body {{ width:1080px; height:{s['H']}px; overflow:hidden; }}
  body {{
    font-family: -apple-system, 'Helvetica Neue', 'Arial Black', sans-serif;
    background: radial-gradient(ellipse 90% 60% at 50% 0%, #14223f 0%, #0b1424 45%, #070d18 100%);
    color:#fff; position:relative;
  }}
  .topbar {{ position:absolute; top:0; left:0; right:0; height:14px;
    background:linear-gradient(90deg,#2DD4BF 0%,#F5C400 50%,#A78BFA 100%); }}
  .stars {{ position:absolute; bottom:118px; left:0; right:0; text-align:center;
    color:rgba(212,175,55,.35); font-size:26px; letter-spacing:24px; }}
  .wrap {{ position:absolute; inset:0; padding:{s['pad']}px 84px {s['pad']+24}px;
    display:flex; flex-direction:column; }}
  .eyebrow {{ display:inline-block; align-self:flex-start; font-size:{s['eyebrow']}px;
    font-weight:800; letter-spacing:.16em; text-transform:uppercase; color:#F5C400;
    background:rgba(212,175,55,.12); border:1px solid rgba(212,175,55,.4);
    padding:10px 22px; border-radius:99px; }}
  .big {{ font-weight:900; line-height:.98; letter-spacing:-.01em; text-transform:uppercase; }}
  .t-hero {{ font-size:{s['hero']}px; }} .t-xl {{ font-size:{s['xl']}px; }}
  .t-lg {{ font-size:{s['lg']}px; }} .t-md {{ font-size:{s['md']}px; }}
  .t-price {{ font-size:{s['price']}px; }}
  .gold {{ color:#F5C400; }} .teal {{ color:#2DD4BF; }} .purple {{ color:#A78BFA; }}
  .muted {{ color:rgba(255,255,255,.62); font-weight:600; font-size:{s['body']}px; line-height:1.35; }}
  .center-block {{ margin-top:auto; margin-bottom:auto; }}
  .footer {{ position:absolute; left:84px; right:84px; bottom:54px;
    display:flex; align-items:center; justify-content:space-between;
    font-size:{s['footer']}px; font-weight:800; }}
  .footer .handle {{ color:#F5C400; }}
  .pageno {{ position:absolute; top:60px; right:84px; font-size:{s['footer']}px;
    font-weight:900; color:rgba(255,255,255,.35); }}
  .pill {{ display:inline-flex; align-items:center; gap:18px; background:rgba(255,255,255,.05);
    border:1px solid rgba(255,255,255,.12); border-radius:22px; padding:24px 32px;
    font-size:{s['md']*0.62:.0f}px; font-weight:800; }}
  .pill .dot {{ width:22px; height:22px; border-radius:50%; flex-shrink:0; }}
  .bar {{ height:28px; border-radius:99px; background:rgba(255,255,255,.08); overflow:hidden; }}
  .bar > i {{ display:block; height:100%; border-radius:99px; }}
  .mrow {{ margin-bottom:26px; }}
  .mrow .top {{ display:flex; justify-content:space-between; align-items:center;
    font-size:{s['body']*0.95:.0f}px; font-weight:800; margin-bottom:12px; }}
  .mrow .nm {{ display:flex; align-items:center; gap:18px; }}
"""

def page(body, s, fmt):
    return f"""<!DOCTYPE html><html><head><meta charset="utf-8">
<style>{base_css(s)}</style></head><body class="fmt-{fmt}">{body}</body></html>"""

FOOT = '<div class="footer"><span>mundialpe.vercel.app</span><span class="handle">@msmgxe</span></div>'

def model_row(name, color, pct):
    return f"""<div class="mrow">
      <div class="top"><span class="nm"><span class="dot" style="background:{color};"></span>{name}</span>
      <span style="color:{color};">{pct}%</span></div>
      <div class="bar"><i style="width:{pct}%;background:{color};"></i></div></div>"""

def build_slides(s, fmt):
    sl = {}
    sl["slide-1"] = page(f"""
<div class="topbar"></div><div class="pageno">01</div>
<div class="wrap"><span class="eyebrow">⚽ Copa Mundial FIFA 2026</span>
  <div class="center-block">
    <div class="big t-hero">EL MUNDIAL<br><span class="gold">2026</span></div>
    <div class="big t-hero" style="margin-top:8px;">COMO NUNCA<br>LO VISTE</div>
    <p class="muted" style="margin-top:44px;">104 partidos · en hora Lima ·<br>cuadro real + proyección · 5 modelos de pronóstico</p>
  </div>
</div><div class="stars">★ ★ ★ ★ ★</div>{FOOT}""", s, fmt)

    sl["slide-2"] = page(f"""
<div class="topbar"></div><div class="pageno">02</div>
<div class="wrap"><span class="eyebrow" style="color:#2DD4BF;border-color:rgba(45,212,191,.4);background:rgba(45,212,191,.12);">🕐 Sin confusiones</span>
  <div class="center-block">
    <div class="big t-xl">104</div>
    <div class="big t-md" style="margin-top:-4px;">PARTIDOS</div>
    <div class="big gold t-lg" style="margin-top:36px;">EN HORA<br>DE LIMA</div>
    <p class="muted" style="margin-top:40px;">Nada de "17:00 ET".<br>España vs Marruecos, en <span style="color:#fff;font-weight:800;">tu</span> hora. Directo.</p>
  </div>
</div>{FOOT}""", s, fmt)

    sl["slide-3"] = page(f"""
<div class="topbar"></div><div class="pageno">03</div>
<div class="wrap"><span class="eyebrow">📊 Lo que nadie más tiene</span>
  <div class="big t-lg" style="margin-top:34px;">NO UN MODELO.<br><span class="gold">CINCO.</span></div>
  <p class="muted" style="margin:22px 0 34px;">Probabilidad por partido. No es opinión, son datos.</p>
  <div>{model_row("FIFA Ranking","#3B82F6",45)}{model_row("Elo Fútbol","#A78BFA",44)}{model_row("Dixon-Coles","#2DD4BF",38)}{model_row("Combinado","#F5C400",42)}</div>
</div>{FOOT}""", s, fmt)

    sl["slide-4"] = page(f"""
<div class="topbar"></div><div class="pageno">04</div>
<div class="wrap"><span class="eyebrow" style="color:#A78BFA;border-color:rgba(167,139,250,.4);background:rgba(167,139,250,.12);">🌳 El cuadro completo</span>
  <div class="center-block">
    <div class="pill"><span class="dot" style="background:#10B981;"></span>VISTA REAL</div>
    <p class="muted" style="margin:20px 0 44px;">Se llena <span style="color:#fff;font-weight:800;">sola</span> con los resultados de verdad.</p>
    <div class="pill"><span class="dot" style="background:#F5C400;"></span>PROYECCIÓN</div>
    <p class="muted" style="margin:20px 0 0;">Quién sería <span class="gold" style="font-weight:800;">campeón</span> según los datos.</p>
    <div class="big t-md" style="margin-top:54px;">DOS VISTAS.<br>UN SOLO LUGAR.</div>
  </div>
</div>{FOOT}""", s, fmt)

    sl["slide-5"] = page(f"""
<div class="topbar"></div><div class="pageno">05</div>
<div class="wrap" style="text-align:center;align-items:center;">
  <span class="eyebrow" style="align-self:center;">🔥 Acceso de lanzamiento</span>
  <div class="center-block">
    <p class="muted">Toda la temporada</p>
    <div class="big gold t-price" style="line-height:.9;margin:10px 0;">S/19<span style="font-size:.5em;">.90</span></div>
    <p class="muted">pago único · por Yape</p>
    <div style="margin-top:60px;border-top:1px solid rgba(255,255,255,.12);padding-top:54px;">
      <div class="big t-md">ESCRÍBEME 👉</div>
      <div class="big gold t-md" style="margin-top:12px;">@msmgxe</div>
      <p class="muted" style="margin-top:20px;">link en mi bio · mundialpe.vercel.app</p>
    </div>
  </div>
</div><div class="stars">★ ★ ★ ★ ★</div>""", s, fmt)
    return sl

# ── Portada de Historia Destacada (1080x1920, contenido centrado en el círculo) ──
def build_cover():
    H = 1920
    css = base_css(dict(H=H, pad=96, hero=120, xl=150, lg=104, md=72, body=40, price=240, eyebrow=26, footer=30))
    body = f"""
<div class="topbar"></div>
<div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
  <div style="font-size:300px; line-height:1; filter:drop-shadow(0 0 40px rgba(245,196,0,.4));">⚽</div>
  <div class="big gold" style="font-size:130px; margin-top:20px; letter-spacing:.06em;">MUNDIAL</div>
  <div class="big" style="font-size:130px; letter-spacing:.12em;">2026</div>
  <div style="margin-top:30px; font-size:42px; font-weight:800; letter-spacing:.2em; color:rgba(255,255,255,.6);">EN HORA LIMA</div>
</div>"""
    return f"""<!DOCTYPE html><html><head><meta charset="utf-8"><style>{css}</style></head><body>{body}</body></html>"""

# ── Escribir archivos ────────────────────────────────────────────────────
if FMT == "cover":
    with open(os.path.join(OUT, "destacado-cover.html"), "w") as f:
        f.write(build_cover())
    print("Generado: destacado-cover.html (1080x1920)")
else:
    s = SIZES[FMT]
    suffix = "" if FMT == "vertical" else "-sq"
    slides = build_slides(s, FMT)
    for name, html in slides.items():
        with open(os.path.join(OUT, f"{name}{suffix}.html"), "w") as f:
            f.write(html)
    print(f"Generados {len(slides)} slides {FMT} ({s['H']}px) con sufijo '{suffix or '(ninguno)'}'")
