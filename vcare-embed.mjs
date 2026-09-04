#!/usr/bin/env node
/*
 * VCare Jewellery — Darpan photography embedder
 *
 *   node vcare-embed.mjs
 *
 * Reads every image in ./vcare-assets, inlines it into a copy of
 * vcare-jewellery.html as data URIs, and writes vcare-jewellery.embedded.html.
 * Use that copy for sharing or publishing — it carries the photography with it,
 * so it works from any location and behind any CSP that blocks outside images.
 */
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, extname, relative, sep } from 'node:path';

const ROOT     = process.cwd();
const ASSETS   = join(ROOT, 'vcare-assets');
const SOURCE   = join(ROOT, 'vcare-jewellery.html');
const OUT      = join(ROOT, 'vcare-jewellery.embedded.html');
const LIMIT    = 16 * 1024 * 1024;               // artifact ceiling
const MIME     = {
  '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.png':'image/png',
  '.webp':'image/webp', '.avif':'image/avif', '.gif':'image/gif'
};

const kb = n => (n / 1024).toFixed(0).padStart(5) + ' KB';

async function walk(dir){
  let out = [];
  let entries;
  try { entries = await readdir(dir, { withFileTypes:true }); }
  catch { return out; }
  for (const e of entries){
    const full = join(dir, e.name);
    if (e.isDirectory()) out = out.concat(await walk(full));
    else if (MIME[extname(e.name).toLowerCase()]) out.push(full);
  }
  return out;
}

const html = await readFile(SOURCE, 'utf8').catch(() => {
  console.error(`\n  Can't find vcare-jewellery.html next to this script.`);
  console.error(`  Run it from the folder that holds both the page and vcare-assets/.\n`);
  process.exit(1);
});

const files = await walk(ASSETS);
if (!files.length){
  console.error(`\n  No images found in vcare-assets/.`);
  console.error(`  Read vcare-assets/README.md for the filenames the kiosk looks for.\n`);
  process.exit(1);
}

const map = { __embedded: 1 };
let raw = 0;
console.log('');
for (const file of files.sort()){
  const key  = relative(ASSETS, file).split(sep).join('/');
  const buf  = await readFile(file);
  const size = (await stat(file)).size;
  raw += size;
  map[key] = `data:${MIME[extname(file).toLowerCase()]};base64,${buf.toString('base64')}`;
  console.log(`  ${kb(size)}   ${key}`);
}

const json = JSON.stringify(map).replace(/</g, '\\u003c');
const tag  = /<script id="vcare-assets" type="application\/json">[\s\S]*?<\/script>/;
if (!tag.test(html)){
  console.error(`\n  The page has no <script id="vcare-assets"> block to write into.\n`);
  process.exit(1);
}

const out = html.replace(tag,
  `<script id="vcare-assets" type="application/json">${json}</script>`);
await writeFile(OUT, out, 'utf8');

const total = Buffer.byteLength(out, 'utf8');
console.log(`\n  ${files.length} photograph${files.length===1?'':'s'} embedded · ${kb(raw)} of images`);
console.log(`  → vcare-jewellery.embedded.html · ${(total/1024/1024).toFixed(2)} MB total`);
if (total > LIMIT){
  console.log(`\n  Over the 16 MB publishing ceiling by ${((total-LIMIT)/1024/1024).toFixed(2)} MB.`);
  console.log(`  Re-export the largest files above at a lower JPEG quality and run this again.`);
} else {
  console.log(`  Room to spare: ${((LIMIT-total)/1024/1024).toFixed(2)} MB under the ceiling.`);
}
console.log('');
