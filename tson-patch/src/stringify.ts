import { Key, Op } from "./types/index.js";

export function path<P extends Key[]>(path: P): string {
  return `/${path.join('/')}`
}

/** Convert `op`s paths into string (in format `"/path/to/value"`) */
export function op<T extends object, P extends Key[], P2 extends Key[]>(
  op: Op<T, P, P2>,
) {
  switch (op.op) {
    case 'set':
    case 'remove':
      return { ...op, path: path(op.path as any) }
    case 'copy':
    case 'move':
      return { ...op, from: path(op.from), to: path(op.to as any) }
    case 'swap':
      return { ...op, path1: path(op.path1 as any), path2: path(op.path2 as any) }
  }
}