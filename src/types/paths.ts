export type Key = string | number;

export type Path<T, P extends Key[]> =
  P extends [keyof T] ? [P[0]] :
  P extends [infer K, ...infer Ks]
    ? K extends keyof T
      ? Ks extends Key[]
          ? [K, ...Path<T[K], Ks>]
          : [Extract<keyof T, Key>]
      : [Extract<keyof T, Key>]
    : [Extract<keyof T, Key>]

export type At<T, P extends Key[]> =
  P extends [keyof T] ? T[P[0]] :
  P extends [keyof T, ...infer Ks]
      ? Ks extends Key[]
          ? At<T[P[0]], Ks>
          : never
      : never
      