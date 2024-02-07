import * as tp from '../src'

const game: string[][] = [
  ['0, 0', '0, 1'],
  ['1, 0', '1, 1']
]

describe('Move', () => {
  it('should move leaving undefined', () => {
    const result = tp.move(game, [0, 0], [1, 0])
    const expected = [
      [undefined, '0, 1'],
      ['0, 0', '1, 1']
    ]
    expect(result).toStrictEqual(expected)
  })
})