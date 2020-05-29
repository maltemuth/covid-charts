import { DataPoint } from "./DataPoint";

export interface DataPointWithDeltas extends DataPoint {
    deltaActive: number;
    deltaConfirmed: number;
    deltaRecovered: number;
    deltaDeceased: number;
}