export interface CountryDetails {
    active: number;
    confirmed: number;
    recovered: number;
    deceased: number;
    timestamp: string;
    deltaActive: number;
    deltaConfirmed: number;
    deltaRecovered: number;
    deltaDeceased: number;
}