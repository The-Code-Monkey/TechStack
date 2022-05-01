import jest from "jest";

import { sum } from '../src/index.js';

describe('sum', () => {
  it('adds two numbers together', () => {
    expect(sum(1, 1)).toEqual(2);
  });
});
