import { readFileSync } from 'node:fs';

const input = readFileSync('inputs/day05.txt', 'utf-8').trim();

// const _dummyInput = `3-5
// 10-14
// 16-20
// 12-18
//
// 1
// 5
// 8
// 11
// 17
// 32`;

type Range = { start: number; end: number };

type Ingredients = number[];

const parseInput = (input: string): [Range[], Ingredients] => {
	const [rawRanges, rawIngredients] = input.split('\n\n');
	const ranges: Range[] = (rawRanges ?? '').split('\n').map((line) => {
		const [start, end] = line.split('-').map(Number);
		return { start, end } as Range;
	});

	const ingredients: Ingredients = (rawIngredients ?? '').split('\n').map(Number);

	return [ranges, ingredients];
};

const simplifyRanges = (ranges: Range[]): Range[] =>
	ranges
		.sort((a, b) => a.start - b.start)
		.reduce<Range[]>((acc, range) => {
			const last = acc.at(-1);
			if (last && range.start <= last.end + 1) {
				last.end = Math.max(last.end, range.end);
				return acc;
			}
			acc.push(range);
			return acc;
		}, []);

const isInRanges = (num: number, ranges: Range[]): boolean =>
	ranges.map((range) => num >= range.start && num <= range.end).some((v) => v === true);

function part1(_input: string): number {
	// const [ranges, ingredients] = parseInput(_dummyInput);
	const [ranges, ingredients] = parseInput(_input);
	const simplifiedRanges = simplifyRanges(ranges);

	return ingredients.reduce((acc, ingredient) => {
		if (isInRanges(ingredient, simplifiedRanges)) acc++;

		return acc;
	}, 0);
}

function part2(_input: string): number {
	return 0;
}

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
