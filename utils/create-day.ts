import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const today = new Date().getDate();
const day = today.toString().padStart(2, '0');
const dayFile = `days/day${day}.ts`;

if (existsSync(dayFile)) {
	console.log(`Day ${day} already exists`);
	process.exit(1);
}

mkdirSync('days', { recursive: true });

const template = readFileSync('days/template.ts', 'utf-8');
const dayCode = template.replace('day$X$', `day${day}`);

writeFileSync(dayFile, dayCode);
console.log(`Created ${dayFile}`);
