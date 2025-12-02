import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { config } from 'dotenv';

config();

async function getInput(day: number): Promise<string> {
	const inputFile = `inputs/day${day.toString().padStart(2, '0')}.txt`;

	if (existsSync(inputFile)) {
		return readFileSync(inputFile, 'utf8');
	}
	console.log(`Fetching input for day ${day}...`);
	const sessionToken = process.env.SESSION;
	const url = `https://adventofcode.com/2025/day/${day}/input`;

	const response = await fetch(url, {
		headers: { Cookie: `session=${sessionToken}` },
	});

	const data = await response.text();
	mkdirSync('inputs', { recursive: true });
	writeFileSync(inputFile, data);
	return data;
}

async function callDay(day: number) {
	console.log('Day', day);
	await getInput(day);

	const dayFile = `./days/day${day.toString().padStart(2, '0')}.ts`;
	if (existsSync(dayFile)) {
		spawn('npx', ['ts-node', dayFile], { stdio: 'inherit' });
	}
}

const argDay = process.argv[2];
if (argDay) {
	const day = parseInt(argDay, 10);
	if (!Number.isNaN(day)) {
		await callDay(day);
	} else {
		console.error('Invalid day argument');
	}
}
