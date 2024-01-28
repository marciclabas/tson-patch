export type Key = string | number;

export type Path<T, P extends Key[]> =
  P extends [] ? [] :
  P extends [keyof T] ? [P[0]] :
  P extends [infer K, ...infer Ks]
    ? K extends keyof NonNullable<T>
      ? Ks extends Key[]
          ? [K, ...Path<NonNullable<T>[K], Ks>]
          : [Extract<keyof T, Key>] // for linting
      : [Extract<keyof T, Key>]     // (to suggest types)
    : never

export type At<T, P extends Key[]> =
  P extends [keyof T] ? T[P[0]] :
  P extends [keyof NonNullable<T>] ? NonNullable<T>[P[0]] | undefined :
  P extends [infer K, ...infer Ks]
      ? Ks extends Key[]
          ? K extends keyof T ? At<T[K], Ks> :
            K extends keyof NonNullable<T> ? At<NonNullable<T>[K] | undefined, Ks>
            : never
          : never
      : never
      
