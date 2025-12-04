import { readFileSync } from 'node:fs';

const input = readFileSync('inputs/day04.txt', 'utf-8').trim();

// const _dummyInput = `..@@.@@@@.
// @@@.@.@.@@
// @@@@@.@.@@
// @.@@@@..@.
// @@.@@@@.@@
// .@@@@@@@.@
// .@.@.@.@@@
// @.@@@.@@@@
// .@@@@@@@@.
// @.@.@@@.@.`;

type Sign = '@' | '.';

type Position = { x: number; y: number };

type Location = Position & { sign: Sign };

type Grid = Location[];

const parseInput = (input: string): Grid => {
	const lines = input.split('\n');
	return lines.flatMap((line, x) =>
		line.split('').map((char, y) => ({
			x,
			y,
			sign: char as Sign,
		})),
	);
};

const DIRECTIONS = [
	[-1, -1],
	[-1, 0],
	[-1, 1],
	[0, -1],
	[0, 1],
	[1, -1],
	[1, 0],
	[1, 1],
] as const;

const isAccessible = (location: Location, grid: Grid): boolean => {
	if (location.sign !== '@') return false;

	const adjacentLocations = DIRECTIONS.map(([dx, dy]) => {
		const nx = location.x + dx;
		const ny = location.y + dy;
		return grid.find((loc) => loc.x === nx && loc.y === ny);
	}).filter((loc) => loc !== undefined);

	return adjacentLocations.filter((loc) => loc.sign === '@').length < 4;
};

const sumPossibleMoves = (grid: Grid): number => {
	return grid.reduce((acc, loc) => {
		if (isAccessible(loc, grid)) acc++;
		return acc;
	}, 0);
};

function part1(_input: string): number {
	// const grid = parseInput(_dummyInput);
	const grid = parseInput(_input);
	return sumPossibleMoves(grid);
}

const simulateExecution = (currentGrid: Grid, totalMoves = 0): number => {
	const moveCount = sumPossibleMoves(currentGrid);
	if (moveCount === 0) return totalMoves;

	const newGrid = currentGrid.map<Location>((loc) => {
		if (isAccessible(loc, currentGrid)) return { ...loc, sign: '.' };
		return loc;
	});

	return simulateExecution(newGrid, totalMoves + moveCount);
};

function part2(_input: string): number {
	// const grid = parseInput(_dummyInput);
	const grid = parseInput(_input);

	return simulateExecution(grid);
}

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
