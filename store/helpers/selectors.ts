import { createSelector } from 'reselect'

export type AnyProps = {
  [k: string]: any
}

type Selected<S> = {
  [k in keyof S]: (s: S) => S[k]
}

export const keySelectors = <S extends object>(store: (s: AnyProps) => S, keys: (keyof S)[]): Selected<S> =>
  keys.reduce((acc, k): Selected<S> => {
    acc[k] = createSelector(store, (s: S) => s[k])

    return acc
    // eslint-disable-next-line
  }, {} as Selected<S>)
