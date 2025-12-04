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

type LocationKey = `${number}-${number}`;

type Grid = Map<LocationKey, Location>;

const parseInput = (input: string): Grid => {
	const lines = input.split('\n');
	return new Map<LocationKey, Location>(
		lines.flatMap((line, y) =>
			[...line].map((char, x) => {
				const loc: Location = { x, y, sign: char as Sign };
				return [`${x}-${y}` as LocationKey, loc];
			}),
		),
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
		return grid.get(`${nx}-${ny}`);
	}).filter((loc) => loc !== undefined);

	return adjacentLocations.filter((loc) => loc.sign === '@').length < 4;
};

const sumPossibleMoves = (grid: Grid): number => {
	let count = 0;
	for (const loc of grid.values()) {
		if (isAccessible(loc, grid)) count++;
	}
	return count;
};

function part1(_input: string): number {
	// const grid = parseInput(_dummyInput);
	const grid = parseInput(_input);

	return sumPossibleMoves(grid);
}

const simulateExecution = (currentGrid: Grid, totalMoves = 0): number => {
	const moveCount = sumPossibleMoves(currentGrid);
	if (moveCount === 0) return totalMoves;

	const newGrid = new Map<LocationKey, Location>();
	for (const [key, loc] of currentGrid) {
		if (isAccessible(loc, currentGrid)) {
			newGrid.set(key, { ...loc, sign: '.' });
		} else {
			newGrid.set(key, loc);
		}
	}

	return simulateExecution(newGrid, totalMoves + moveCount);
};

function part2(_input: string): number {
	// const grid = parseInput(_dummyInput);
	const grid = parseInput(_input);

	return simulateExecution(grid);
}

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
