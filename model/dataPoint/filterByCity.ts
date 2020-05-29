import { DataPointWithLocation } from "./DataPointWithLocation";

const filterByCity = (
  dataPoints: DataPointWithLocation[],
  cityName: string
) => dataPoints.filter(({ city }) => city === cityName);

export default filterByCity;
