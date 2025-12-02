import { readFileSync } from 'node:fs';

const input = readFileSync('inputs/day02.txt', 'utf-8').trim();

// const _dummyInput =
// 	'11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124';

type Range = [number, number];

const parseInput = (input: string): Range[] => {
	return input.split(',').map((range) => {
		const [firstId, lastId] = range.split('-').map(Number);
		if (!firstId || !lastId) throw new Error(`Invalid range: ${range}`);
		return [firstId, lastId];
	});
};

const calcSumOfInvalidIds = (ranges: Range[], matcher: RegExp) => {
	return ranges.reduce((totalSum, [firstId, lastId]) => {
		const rangeSum = Array.from({ length: lastId - firstId + 1 }, (_, i) => firstId + i).reduce(
			(partSum, id) => (matcher.test(id.toString()) ? partSum + id : partSum),
			0,
		);

		return totalSum + rangeSum;
	}, 0);
};

function part1(_input: string): number {
	// const ranges = parseInput(_dummyInput);
	const ranges = parseInput(_input);

	return calcSumOfInvalidIds(ranges, /^(\d+)\1$/);
}

function part2(_input: string): number {
	// const ranges = parseInput(_dummyInput);
	const ranges = parseInput(_input);

	return calcSumOfInvalidIds(ranges, /^(\d+)\1+$/);
}

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
