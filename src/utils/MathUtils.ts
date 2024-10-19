export enum Decimals {
    Two = 100,
    One = 10
}

export function Round(value: number, decimals: Decimals = Decimals.Two): number {
    return Math.round((value + Number.EPSILON) * decimals) / decimals
}

