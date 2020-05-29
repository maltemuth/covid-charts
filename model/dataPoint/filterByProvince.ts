import { DataPointWithLocation } from "./DataPointWithLocation";

const filterByProvince = (
  dataPoints: DataPointWithLocation[],
  provinceName: string
) => dataPoints.filter(({ province }) => province === provinceName);

export default filterByProvince;
