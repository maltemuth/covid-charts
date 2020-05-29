import { DataPoint } from "./DataPoint";

export interface DataPointWithLocation extends DataPoint {
    province: string;
    city: string;
}