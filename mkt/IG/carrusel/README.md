# 🖼️ Carrusel estático de Instagram (alternativa a los videos)

5 imágenes listas (1080×1350 px, formato 4:5 ideal para feed). Si un día no quieres grabar video, **publica este carrusel** — comunica todo el producto.

## Las imágenes (publícalas en este orden)

| Slide | Archivo | Mensaje |
|-------|---------|---------|
| 1 | `slide-1.png` | Portada — "El Mundial 2026 como nunca lo viste" |
| 2 | `slide-2.png` | "104 partidos en hora Lima" |
| 3 | `slide-3.png` | ⭐ "No un modelo. CINCO." (FIFA, Elo, Poisson, Combinado) |
| 4 | `slide-4.png` | "Vista Real + Proyección — dos vistas, un lugar" |
| 5 | `slide-5.png` | CTA — "S/ 19.90 · escríbeme @msmgxe · link en bio" |

## Cómo publicar
1. En Instagram, **+ → Publicación**, selecciona las 5 imágenes en orden (1→5).
2. Pega el **caption** y el **primer comentario** (ver `../hashtags.md` y `../pineados.md`).
3. Publica.

## 💡 Mejóralo (opcional)
- En el **slide 5**, puedes pegar encima tu **QR de Yape** antes de publicar (deja espacio abajo).
- Combina: usa el carrusel los días que no grabes reel, para no desaparecer del feed.

---

## Regenerar / editar las imágenes
Si quieres cambiar textos o colores:
```bash
cd mkt/IG/carrusel
python3 _generar.py          # regenera los .html
# luego reconvierte a PNG:
for s in slide-1 slide-2 slide-3 slide-4 slide-5; do
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
    --hide-scrollbars --force-device-scale-factor=1 \
    --screenshot="$PWD/$s.png" --window-size=1080,1350 "file://$PWD/$s.html"
done
```
Edita los textos en `_generar.py` (sección de cada slide).
