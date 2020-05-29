import { DataPointWithLocation } from "./DataPointWithLocation";

const getCities = (dataPoints: DataPointWithLocation[]): string[] =>
  dataPoints
    .map(({ city }) => city)
    .filter(_ => _)
    .reduce((unique, city) => {
      if (unique.includes(city)) {
        return unique;
      }

      return [...unique, city];
    }, []).sort();
export default getCities;
