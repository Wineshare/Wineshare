// Optimisation des images (à lancer à la main après l'ajout d'images : npm run images)
// - convertit les PNG/JPG en WebP et redimensionne les images trop grandes
// - génère les images de partage Open Graph (1200×630, JPG) dans public/assets/og/
import { readdir, rm, stat } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const assets = join(root, "public", "assets");
const OG = { width: 1200, height: 630 };

// Largeur maximale par dossier (les images sont affichées bien plus petites)
const MAX_WIDTH = { img: 900, "img/blog": 1200, png: 600 };

async function optimize(dir, maxWidth) {
  for (const name of await readdir(join(assets, dir))) {
    const file = join(assets, dir, name);
    const ext = extname(name).toLowerCase();
    if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) continue;
    const out = file.slice(0, -ext.length) + ".webp";
    const before = (await stat(file)).size;
    const buffer = await sharp(file)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toBuffer();
    // On ne remplace un WebP existant que si le gain est réel
    if (ext === ".webp" && buffer.length > before * 0.9) continue;
    await sharp(buffer).toFile(out);
    if (ext !== ".webp") await rm(file);
    console.log(`${dir}/${name} : ${Math.round(before / 1024)} Ko → ${Math.round(buffer.length / 1024)} Ko`);
  }
}

// Image de partage par défaut : accroche + logo + capture de l'app
async function defaultOgImage() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${OG.width}" height="${OG.height}">
    <rect width="100%" height="100%" fill="#FFFCF7"/>
    <circle cx="1010" cy="315" r="300" fill="#eef0e4"/>
    <text x="80" y="250" font-family="Avenir Next, Helvetica, sans-serif" font-weight="800" font-size="64" fill="#02132B">Le réseau social</text>
    <text x="80" y="330" font-family="Avenir Next, Helvetica, sans-serif" font-weight="800" font-size="64" fill="#02132B">des passionnés</text>
    <text x="80" y="410" font-family="Avenir Next, Helvetica, sans-serif" font-weight="800" font-size="64" fill="#476525">de vin</text>
    <text x="80" y="490" font-family="Avenir Next, Helvetica, sans-serif" font-size="28" fill="#414e60">Dégustations, bars à vin, cavistes et événements</text>
    <text x="180" y="132" font-family="Avenir Next, Helvetica, sans-serif" font-weight="700" font-size="40" fill="#02132B">WineShare</text>
  </svg>`;
  const logo = await sharp(join(assets, "svg", "logo-wineshare.svg")).resize({ height: 60 }).png().toBuffer();
  const phone = await sharp(join(assets, "png", "app-mockup.webp")).resize({ height: 600 }).png().toBuffer();
  await sharp(Buffer.from(svg))
    .composite([
      { input: logo, left: 80, top: 85 },
      { input: phone, left: 870, top: 30 },
    ])
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(join(assets, "og", "wineshare.jpg"));
  console.log("og/wineshare.jpg");
}

// Couvertures du blog recadrées au format Open Graph
async function blogOgImages() {
  for (const name of await readdir(join(assets, "img", "blog"))) {
    if (!name.endsWith(".webp")) continue;
    await sharp(join(assets, "img", "blog", name))
      .resize(OG.width, OG.height, { fit: "cover" })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(join(assets, "og", name.replace(".webp", ".jpg")));
  }
  console.log("og/<articles>.jpg");
}

for (const [dir, width] of Object.entries(MAX_WIDTH)) await optimize(dir, width);
await import("node:fs/promises").then((fs) => fs.mkdir(join(assets, "og"), { recursive: true }));
await defaultOgImage();
await blogOgImages();
