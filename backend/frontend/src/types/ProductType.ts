import {UnitEnum} from "../enums/UnitEnum.enum.ts";

export interface ProductType {
    id?: number;
    name: string;
    unit: UnitEnum;
    numberOfUnits: number;
}