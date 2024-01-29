import { Path, At, Key } from "./paths"

export type Set<
    T extends object,
    P extends Key[]
> = {
    op: 'set'
    path: P extends Path<T, P> ? P : Path<T, P>
    value: P extends Path<T, P> ? At<T, P> : never
}

export type Remove<T extends object, P extends Key[]> = {
    op: 'remove'
    path: P extends Path<T, P> ? P : Path<T, P>
}
  
export type Move<
    T extends object, 
    From extends Key[], 
    To extends Key[], 
    FromType = At<T, From>,
    ToType = At<T, To>
> = {
    op: 'move'
    from: From extends Path<T, From> ? From : never
    to: To extends Path<T, To> ? (FromType extends ToType ? To : never) : Path<T, To>
}

export type Swap<
    T extends object, 
    P1 extends Key[], 
    P2 extends Key[], 
    V1 = At<T, P1>,
    V2 = At<T, P2>
> = {
    op: 'swap'
    obj: T,
    path1: P1 extends Path<T, P1> ? (V1 extends V2 ? P1 : never) : Path<T, P1>
    path2: P2 extends Path<T, P2> ? (V2 extends V1 ? P2 : never) : Path<T, P2>
}

export type Op<T extends object, P extends Key[], P2 extends Key[]>
    = Set<T, P>
    | Remove<T, P>
    | Move<T, P, P2>
    | Swap<T, P, P2>

/** Curried function to make ops of a given type `T`. Can be used wherever an `Op<T, _, _>` is required */
export const op =
    <T extends object>() =>
    <P extends Key[], P2 extends Key[]>(op: Op<T, P, P2>) => op