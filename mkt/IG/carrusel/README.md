# 🖼️ Carrusel estático de Instagram (alternativa a los videos)

5 imágenes listas (1080×1350 px, formato 4:5 ideal para feed). Si un día no quieres grabar video, **publica este carrusel** — comunica todo el producto.

## Formatos disponibles

| Formato | Archivos | Cuándo usar |
|---------|----------|-------------|
| **Vertical 4:5** (1080×1350) | `slide-1.png` … `slide-5.png` | **Recomendado** para feed (ocupa más pantalla) |
| **Cuadrado 1:1** (1080×1080) | `slide-1-sq.png` … `slide-5-sq.png` | Clásico, si prefieres cuadrado |
| **Portada destacado** (1080×1920) | `destacado-cover.png` | Cover de Historia Destacada "MUNDIAL" |

## Las imágenes (publícalas en este orden)

| Slide | Mensaje |
|-------|---------|
| 1 | Portada — "El Mundial 2026 como nunca lo viste" |
| 2 | "104 partidos en hora Lima" |
| 3 | ⭐ "No un modelo. CINCO." (FIFA, Elo, Poisson, Combinado) |
| 4 | "Vista Real + Proyección — dos vistas, un lugar" |
| 5 | CTA — "S/ 19.90 · escríbeme @msmgxe · link en bio" |

## 🌟 Portada de Historia Destacada
`destacado-cover.png` — súbela como Story y guárdala en una **Historia Destacada llamada "MUNDIAL"**. El balón + "MUNDIAL 2026" están centrados para caer justo dentro del círculo que muestra Instagram.

## Cómo publicar
1. En Instagram, **+ → Publicación**, selecciona las 5 imágenes en orden (1→5).
2. Pega el **caption** y el **primer comentario** (ver `../hashtags.md` y `../pineados.md`).
3. Publica.

## 💡 Mejóralo (opcional)
- En el **slide 5**, puedes pegar encima tu **QR de Yape** antes de publicar (deja espacio abajo).
- Combina: usa el carrusel los días que no grabes reel, para no desaparecer del feed.

---

## Regenerar / editar las imágenes
Edita los textos en `_generar.py` y vuelve a generar:
```bash
cd mkt/IG/carrusel
# Vertical 4:5
python3 _generar.py vertical && for s in slide-1 slide-2 slide-3 slide-4 slide-5; do ./_exportar.sh $s 1080 1350; done
# Cuadrado 1:1
python3 _generar.py square && for s in slide-1-sq slide-2-sq slide-3-sq slide-4-sq slide-5-sq; do ./_exportar.sh $s 1080 1080; done
# Portada destacado
python3 _generar.py cover && ./_exportar.sh destacado-cover 1080 1920
```