# VCare Jewellery — Mirror kiosk · photography

Ten of your reference photographs are in place and wired to the catalogue. The kiosk
resolves every image slot by product code, so adding or replacing a photograph is a
matter of dropping a correctly named file in here — no code changes.

Keep this folder next to `vcare-jewellery.html`.

---

## 1 · What is in place

| Your file | Now serving | Slot |
|---|---|---|
| `Welcome image.jpg` | welcome hero · the Kalyani necklace look · the Kalyani jhumka look | `editorial/hero.jpg` |
| `necklace.jpg` | Tulsi Filigree Choker · necklaces plate | `product/VCJ-CH-3376.jpg` |
| `ear-ring1.jpg` | Mayura Paisley Jhumka · earrings plate | `product/VCJ-EM-5528.jpg` |
| `ear-ring.jpg` | Peacock Ear Cuff | `product/VCJ-EP-9014.jpg` |
| `bangles.jpg` | Vanamala Oxidised Bangles · bangles plate | `product/VCJ-BK-6120.jpg` |
| `bangles1.jpg` | Ratna Enamel Bangles — **worn shot**, takes the mirror | `worn/VCJ-BE-8203.jpg` |
| `rings.jpg` | Mayura Peacock Ring · rings plate | `product/VCJ-RP-1345.jpg` |
| `ring1.webp` | Chandni Solitaire Ring | `product/VCJ-RS-2290.webp` |
| `ee94f2b6….jpg` | Padmini Necklace & Jhumka Set | `product/VCJ-ST-0451.jpg` |
| `sets1.jpg` | Rajwadi Kundan Bridal Suite · sets plate | `product/VCJ-ST-0782.jpg` |

**Not used: `necklace1.jpg`.** It carries GIRIRAJ JEWELLERS branding across the top and
their SKU (CNG02-YWR119) bottom-left. Supply an unbranded version and it drops straight
into `product/VCJ-KN-2841.jpg`.

The welcome photograph does triple duty: it is the hero, and because the model is wearing
both a necklace and a pair of jhumkas, it is also the worn shot for those two pieces —
the carousel crops to each piece using a focal point set per product.

---

## 2 · What would complete the mirror

Three looks are photographed (the necklace, the jhumkas, the enamel bangles). The other
eight pieces show the drawn stand-in when tried on. Either route below fills them:

**Route A — worn shots.** One photograph per piece, on the model, framed the same way each
time. 1600 × 1200 or any portrait crop; the mirror shows it whole, never cropped.

```
worn/VCJ-CH-3376.jpg    Tulsi Filigree Choker
worn/VCJ-EM-5528.jpg    Mayura Paisley Jhumka
worn/VCJ-EP-9014.jpg    Peacock Ear Cuff
worn/VCJ-BK-6120.jpg    Vanamala Oxidised Bangles
worn/VCJ-RP-1345.jpg    Mayura Peacock Ring
worn/VCJ-RS-2290.jpg    Chandni Solitaire Ring
worn/VCJ-ST-0451.jpg    Padmini Necklace & Jhumka Set
worn/VCJ-ST-0782.jpg    Rajwadi Kundan Bridal Suite
```

**Route B — cut-outs.** Cheaper, and what a production AR pipeline uses. Two model plates
plus a transparent PNG per piece, composited live at the body anchors:

```
model/portrait.jpg      head and shoulders, facing camera, ears visible, plain dark ground
model/hand.jpg          forearm raised, fingers up, same setup and lighting
cutout/VCJ-CH-3376.png  the piece alone, alpha channel, trimmed tight, no baked shadow
```

The kiosk adds the shadow, the specular sweep and the sway, so deliver the metal flat.

If a piece has both a worn shot and a cut-out, the worn shot wins.

---

## 3 · Replacing or adding pieces

Product photographs are looked up as `product/<CODE>.jpg`. Drop a file named for the code
and it appears in the carousel, the detail panel, the wishlist and the handoff cards.
1000 × 1000 square is ideal — ivory sweep, roughly 12 % margin, no props.

Category plates prefer `category/<name>.jpg` if present (`necklaces`, `earrings`,
`bangles`, `rings`, `sets`, 800 × 1100 portrait); otherwise each category borrows the
product shot listed in the table above.

The eleven pieces — names, collections, prices, materials, stone details, weights — live
in one array named `P` inside `vcare-jewellery.html`. Search for `VCJ-KN-2841`.

---

## 4 · Sharing a copy

A link can't read this folder, so the photographs have to travel inside the file:

```
node vcare-embed.mjs
```

That writes `vcare-jewellery.embedded.html` with every photograph inlined, and reports the
total against the 16 MB publishing ceiling.
