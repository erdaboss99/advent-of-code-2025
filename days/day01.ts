import { readFileSync } from 'node:fs';

const input = readFileSync('inputs/day01.txt', 'utf-8').trim();

type Direction = 'L' | 'R';
type Instruction = {
	direction: Direction;
	turns: number;
};

type Motion = Partial<Instruction> & { startingPos: number; endingPos: number };

const STARTING_POSITION = 50;

// const dummyInput = `L68,L30,R48,L5,R60,L55,L1,L99,R14,L82`;

const parseInput = (input: string, delimeter: string = '\n'): Instruction[] => {
	return input.split(delimeter).map((move) => ({
		direction: move.charAt(0) as 'L' | 'R',
		turns: parseInt(move.slice(1), 10),
	}));
};

const calculateEndingPos = (position: number, instruction: Instruction): number => {
	if (instruction.direction === 'L') {
		return (((position - instruction.turns) % 100) + 100) % 100;
	} else {
		return (position + instruction.turns) % 100;
	}
};

function part1(_input: string): number {
	// const instructions = parseInput(dummyInput, ',');
	const instructions = parseInput(_input);
	const state: Motion[] = [{ startingPos: STARTING_POSITION, endingPos: STARTING_POSITION }];

	for (const instruction of instructions) {
		const latestState = state.at(-1);
		if (latestState) {
			const newMotion: Motion = {
				...instruction,
				startingPos: latestState.endingPos,
				endingPos: calculateEndingPos(latestState.endingPos, instruction),
			};
			state.push(newMotion);
		}
	}

	return state.filter((motion) => motion.endingPos === 0).length;
}

function part2(_input: string): number {
	return 0;
}

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
