import { CountryDetails } from "../model/countryDetails/CountryDetails";
import { COLOR_ACTIVE, COLOR_CONFIRMED, COLOR_RECOVERED, COLOR_DECEASED } from "../model/countryDetails/colors";

interface CountryDetailsTableProps {
  details: CountryDetails[];
}

interface DetailCellProps {
  delta: number;
  value: number;
}

const DetailCell: React.FunctionComponent<DetailCellProps> = ({
  delta,
  value,
}) => (
  <td className="DetailCell">
    <style jsx>{`
      .positive {
        color: red;
      }

      .negative {
        color: green;
      }

      .neutral {
        color: gray;
      }
    `}</style>
    <small
      className={`${
        delta > 0 ? "positive" : delta < 0 ? "negative" : "neutral"
      }`}
    >
      {delta > 0 ? "+" : ""}
      {delta.toLocaleString()}
    </small>
    &nbsp;
    {value.toLocaleString()}
  </td>
);

const CountryDetailsTable: React.FunctionComponent<CountryDetailsTableProps> = ({
  details,
}) => (
  <div style={{overflowX: 'scroll'}}>
  <table>
    <style jsx>{`
      table {
        border-spacing: 0;
        border-collapse: collapse;
        margin: 0 auto;
        max-width: 100vw;
      }
    `}</style>
    <thead>
      <tr>
        <th>date / index</th>
        <th style={{background: COLOR_ACTIVE}}>active</th>
        <th style={{background: COLOR_CONFIRMED}}>confirmed</th>
        <th style={{background: COLOR_RECOVERED}}>recovered</th>
        <th style={{background: COLOR_DECEASED}}>deaths</th>
      </tr>
    </thead>
    <tbody>
      {details.map(
        (
          {
            timestamp,
            active,
            confirmed,
            recovered,
            deceased,
            deltaActive,
            deltaConfirmed,
            deltaRecovered,
            deltaDeceased,
          },
          index
        ) => (
          <tr key={timestamp}>
            <td>{new Date(timestamp).toLocaleDateString()} / #{index}</td>
            <DetailCell delta={deltaActive} value={active} />
            <DetailCell delta={deltaConfirmed} value={confirmed} />
            <DetailCell delta={deltaRecovered} value={recovered} />
            <DetailCell delta={deltaDeceased} value={deceased} />
          </tr>
        )
      )}
    </tbody>
  </table>
  </div>
);

export default CountryDetailsTable;
