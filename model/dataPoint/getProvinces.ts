import { DataPointWithLocation } from "./DataPointWithLocation";

const getProvinces = (dataPoints: DataPointWithLocation[]): string[] =>
  dataPoints
    .map(({ province }) => province)
    .filter(_ => _)
    .reduce((unique, province) => {
      if (unique.includes(province)) {
        return unique;
      }

      return [...unique, province];
    }, []).sort();
export default getProvinces;
