import { Chromosome, IntegerChromosome, BitChromosome } from './jsevolution';

test('Chromosome swap works fine', () => {
  const chromosome = Chromosome.create(['yep', 'bar', 'foo']);
  chromosome.swap(0, 2);
  expect(chromosome.values).toEqual(['foo', 'bar', 'yep']);
});

test('Chromosome move works fine', () => {
  const chromosome = Chromosome.create(['yep', 'bar', 'foo', 'wtf']);
  chromosome.move(1, 3);
  expect(chromosome.values).toEqual(['yep', 'foo', 'wtf', 'bar']);
});

test('IntegerChromosome works fine', () => {
  const chromosome = IntegerChromosome.create([1, 2, 3]);
  expect(chromosome).toBe(chromosome);
});

test('IntegerChromosome throws TypeError', () => {
  expect(() => {
    const chromosome = IntegerChromosome.create(['foo', 'bar']);
    expect(chromosome).toBe(chromosome);
  }).toThrow(TypeError);
});

test('BitChromosome works fine', () => {
  const chromosome = BitChromosome.create([1, 0, 0, 1]);
  expect(chromosome).toBe(chromosome);
});

test('BitChromosome throws TypeError', () => {
  expect(() => {
    const chromosome = BitChromosome.create([1, 2]);
    expect(chromosome).toBe(chromosome);
  }).toThrow(TypeError);
});
