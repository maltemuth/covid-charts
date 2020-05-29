import { DataPoint } from "./DataPoint";
import { DataPointWithDeltas } from "./DataPointWithDeltas";

const withDeltas = (dataPoints: DataPoint[]): DataPointWithDeltas[] =>
  dataPoints.map(
    ({ timestamp, active, recovered, confirmed, deceased }, index, list) => ({
      timestamp,
      active,
      recovered,
      confirmed,
      deceased,
      deltaActive: active - (list[index + 1]?.active || 0),
      deltaConfirmed: confirmed - (list[index + 1]?.confirmed || 0),
      deltaRecovered: recovered - (list[index + 1]?.recovered || 0),
      deltaDeceased: deceased - (list[index + 1]?.deceased || 0),
    })
  );

export default withDeltas;
