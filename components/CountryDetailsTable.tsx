import { CountryDetails } from "../model/countryDetails/CountryDetails";

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
        <th>active</th>
        <th>confirmed</th>
        <th>recovered</th>
        <th>deaths</th>
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
