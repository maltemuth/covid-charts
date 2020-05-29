import { DataPoint } from "./DataPoint";

const sumByTimestamp = (
  dataPoints: DataPoint[]
): DataPoint[] => {
  const map: {
    [timestamp: string]: DataPoint
  } = dataPoints.reduce(
    (sums, { timestamp, active, confirmed, recovered, deceased }) => {
      
      sums[timestamp] = sums[timestamp] || {
        confirmed: 0,
        active: 0,
        deceased: 0,
        recovered: 0,
      };

      sums[timestamp].recovered += recovered;
      sums[timestamp].active += active;
      sums[timestamp].deceased += deceased;
      sums[timestamp].confirmed += confirmed;

      return sums;
    },
    {}
  );

  return Object.keys(map)
    .sort()
    .map((timestamp) => ({
      timestamp,
      ...map[timestamp],
    }))
    .reverse();
};

export default sumByTimestamp;
