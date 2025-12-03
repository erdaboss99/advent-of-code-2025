import { readFileSync } from 'node:fs';

const input = readFileSync('inputs/day03.txt', 'utf-8').trim();

// const _dummyInput = `987654321111111
// 811111111111119
// 234234234234278
// 818181911112111`;

type Bank = number[];

type Position = {
	value: number;
	index: number;
};

const parseInput = (input: string): Bank[] => {
	return input.split('\n').map((line) => {
		return line.split('').map((char) => parseInt(char, 10));
	});
};

const getUsableSlice = (bank: Bank, remaining: number): Bank =>
	remaining > 1 ? bank.slice(0, -remaining + 1) : bank;

const findMaxWithIdx = (bank: Bank): Position => {
	const max = Math.max(...bank);
	return { value: max, index: bank.indexOf(max) };
};

const sumOfBankJoltageDigits = (bank: number[]): number => {
	return Array.from({ length: 2 }).reduce<{ sum: number; bank: Bank }>(
		(acc, _, idx) => {
			const slice = getUsableSlice(acc.bank, 2 - idx);
			const { value, index } = findMaxWithIdx(slice);

			return {
				sum: acc.sum + value * 10 ** (2 - idx - 1),
				bank: acc.bank.slice(index + 1),
			};
		},
		{ sum: 0, bank },
	).sum;
};

function part1(_input: string): number {
	// const banks = parseInput(_dummyInput);
	const banks = parseInput(_input);

	return banks
		.map((bank) => sumOfBankJoltageDigits(bank.length % 2 === 0 ? bank : [0, ...bank]))
		.reduce((a, b) => a + b, 0);
}

function part2(_input: string): number {
	return 0;
}

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
