import { IValueSpace } from "../types/IValueSpace";

export function adjustValueSpace(value: IValueSpace, diff?: IValueSpace): IValueSpace {
    if (!diff) return value;
    return {
        base: add(value.base, diff.base, value.max, value.min),
        min: value.min,
        max: value.max,
        operations: incrementOperations(value)
    }
}

export function setValueSpace(oldValue: IValueSpace, newValue?: IValueSpace): IValueSpace {
    if (!newValue) return oldValue;

    return {
        base: clamp(newValue.base, oldValue.max, oldValue.min),
        min: oldValue.min,
        max: oldValue.max,
        operations: incrementOperations(oldValue)
    }
}

export function shouldFilter(value: number, space: IValueSpace): boolean {
    if (space.min !== undefined && value < space.min) return true;
    if (space.max !== undefined && value > space.max) return true;
    return false;
}

export function getDistance(value: number, space: IValueSpace): number {
    if (space.base === undefined) return 0;
    return Math.abs(space.base - value);
}

export function getRotationalDistance(value: number, space: IValueSpace, max: number): number {
    if (space.base === undefined) return 0;
    return Math.min(Math.abs(space.base - value), Math.abs(space.base - max - value))
}

function incrementOperations(space?: IValueSpace): number {
    if (space?.operations === undefined) return 1;
    return ++space.operations;
}

function add(a?: number, b?: number, max?: number, min?: number): number | undefined {
    if (b === undefined) return a;
    if (a === undefined) return clamp(b, max, min);

    return clamp(a + b, max, min);
}

function clamp(a?: number, max?: number, min?: number) {
    if (a === undefined) return a;

    let result = a;

    if (min !== undefined) {
        result = Math.max(result, min);
    }

    if (max !== undefined) {
        result = Math.min(result, max);
    }

    return result;
}