import { IValueSpace } from "../types/IValueSpace";

function add(a?: number, b?: number): number | undefined {
    if (b === undefined) return a;
    if (a === undefined) return undefined;
    return a + b;
}

export function adjustValueSpace(value: IValueSpace, diff?: IValueSpace): IValueSpace {
    if (!diff) return value;
    return { min: add(value.min, diff.min), max: add(value.max, diff.max), base: add(value.base, diff.base)}
}

export function setValueSpace(oldValue: IValueSpace, newValue?: IValueSpace): IValueSpace {
    if (!newValue) return oldValue;
    return { 
        min: newValue?.min ?? oldValue?.min, 
        max: newValue?.max ?? oldValue.max, 
        base: newValue?.base ?? oldValue.base
    }
}

export function shouldFilter(value: number, space: IValueSpace): boolean {
    if (space.min !== undefined && value < space.min) return true;
    if (space.max !== undefined && value > space.max) return true;
    return false;
}

export function getDistance(value: number, space: IValueSpace): number {
    if (!space.base) return 0;
    return Math.abs(space.base - value);
}

export function getRotationalDistance(value: number, space: IValueSpace, max: number): number {
    if (!space.base) return 0;
    return Math.min(Math.abs(space.base - value), Math.abs(space.base - max - value))
}