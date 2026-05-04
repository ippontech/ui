import SVGFixer from 'oslllo-svg-fixer';
import { fileURLToPath } from 'node:url';
import svgtofont from 'svgtofont';
import * as fs from 'node:fs';
import * as path from 'node:path';

const fixIcons = async (dir, destination) => {
  fs.mkdirSync(destination, { recursive: true });
  await SVGFixer(dir, destination, {
    showProgressBar: true,
  }).fix();
};

const svgFrom = path.resolve(path.dirname(fileURLToPath(import.meta.resolve('ionicons'))), 'svg');

const svgFixed = path.resolve(import.meta.dirname, 'svg');

const dist = path.resolve(import.meta.dirname, 'dist');

const typesDir = path.resolve(import.meta.dirname, 'types');
const typesPath = path.resolve(typesDir, 'index.d.ts');

const nameList = fs.readdirSync(svgFrom).map((filename) => filename.replace('.svg', ''));

const categorizeIcon = (name: string) => {
  if (name.startsWith('logo-')) {
    return 'logo';
  }
  if (name.endsWith('-outline')) {
    return 'outline';
  }
  if (name.endsWith('-sharp')) {
    return 'sharp';
  }
  return 'filled';
};

const grouped = Map.groupBy(nameList, categorizeIcon);
const logo = grouped.get('logo');
const filled = grouped.get('filled');

const toTypeLine = (name: string) => `  | '${name}'`;

const toType = (name: string) => (icons: string[]) =>
  `export type ${name} =\n${icons.map(toTypeLine).join('\n')};\n`;

const typing = `${toType('IconClassic')(filled)}\n${toType('IconLogo')(logo)}\nexport type IconVariant = 'sharp' | 'outline';`;

fs.mkdirSync(typesDir, { recursive: true });
fs.writeFileSync(typesPath, typing);

await fixIcons(svgFrom, svgFixed);

await svgtofont({
  src: svgFixed,
  dist,
  fontName: 'ionicons',
  emptyDist: true,
  css: {
    fontSize: 'inherit',
    include: /\.css$/,
  },
  addLigatures: true,
  classNamePrefix: 'ippon-ion',
  website: {
    title: 'Ion Icons',
    links: [],
  },
});
