import { applies } from "./apply"
import { op } from "./types/ops"
import * as R from 'ramda'

type Game = {
    players: Array<{
        sheets: Array<{
            uuid: string
        }>
    }>
}

const game: Game = {
    players: [
        {
            sheets: [
                { uuid: '0, 0' },
                { uuid: '0, 1' },
            ]
        },
        {
            sheets: [
                { uuid: '1, 0' },
                { uuid: '1, 1' },
            ]
        }
    ]
}

const gameOp = op<Game>()

const ops = [
    gameOp({op: 'copy', from: ['players', 0, 'sheets', 1], to: ['random0'] as any}),
    gameOp({op: 'copy', from: ['players', 1, 'sheets', 0], to: ['random1'] as any}),
]
const ops2 = [
    gameOp({op: 'move', from: ['random0'] as any, to: ['players', 1, 'sheets', 0]}),
    gameOp({op: 'move', from: ['random1'] as any, to: ['players', 0, 'sheets', 1]}),
]

const newGame = applies(game, ops)
console.log('New', newGame)
const newerGame = applies(newGame, ops2)
console.log('Newer', newerGame)