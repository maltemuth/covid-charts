import { CountryDetails } from "../model/countryDetails/CountryDetails";
import { COLOR_ACTIVE, COLOR_CONFIRMED, COLOR_RECOVERED, COLOR_DECEASED } from "../model/countryDetails/colors";

interface CountryDetailsChartProps {
  details: CountryDetails[];
}

interface LinesProps {
  values: number[];
  width: number;
  height: number;
  color: string;
  offset: number;
  maximum: number;
  includeCircles?: boolean;
  includeLines?: boolean;
}

const xCalculator = (width: number) => (index: number): number =>
  width - index * 10;

const yCalculator = (height: number, max: number) => (value: number): number =>
  height - (value * height) / max;

const movingAverage = (frame: number) => (values: number[]): number[] =>
  values.map((_, index) => {
    const start = Math.max(0, index - Math.floor(frame / 2));
    const end = Math.min(values.length, index + Math.floor(frame / 2) + 1);

    const valuesInFrame = values.slice(start, end);

    const sum = valuesInFrame.reduce((sum, value) => sum + value, 0);

    return sum / valuesInFrame.length;
  });

const Lines: React.FunctionComponent<LinesProps> = ({
  values,
  width,
  height,
  maximum,
  color,
  includeCircles = true,
  includeLines = false,
}) => {
  const calculateX = xCalculator(width);
  const calculateY = yCalculator(height, maximum);
  return (
    <>
      {values.map((value, index) => {
        const x = calculateX(index);
        const y = calculateY(value);

        const xBefore = calculateX(index - 1);
        const yBefore = calculateY(values[index - 1]);

        return (
          <>
            {includeCircles && (
              <circle
                r={4}
                stroke={color}
                fill="transparent"
                cx={x + 1}
                cy={y}
              ></circle>
            )}
            {includeLines && typeof values[index - 1] !== "undefined" && (
              <line x1={x} y1={y} x2={xBefore} y2={yBefore} stroke={color} />
            )}
          </>
        );
      })}
    </>
  );
};

const CountryDetailsChart: React.FunctionComponent<CountryDetailsChartProps> = ({
  details,
}) => {
  const width = details.length * 10;
  const height = (width / 16) * 7;

  const values = ["active", "confirmed", "recovered", "deceased"].reduce(
    (numbers, prop) => ({
      ...numbers,
      [prop]: details.map((detail) => detail[prop]),
    }),
    {}
  ) as {
    active: number[];
    confirmed: number[];
    recovered: number[];
    deceased: number[];
  };

  const averages = ["active", "confirmed", "recovered", "deceased"].reduce(
    (numbers, prop) => ({
      ...numbers,
      [prop]: movingAverage(14)(values[prop]),
    }),
    {}
  ) as {
    active: number[];
    confirmed: number[];
    recovered: number[];
    deceased: number[];
  };

  const maxima = ["active", "confirmed", "recovered", "deceased"].reduce(
    (numbers, prop) => ({
      ...numbers,
      [prop]: Math.max(...values[prop]),
    }),
    {}
  ) as {
    active: number;
    confirmed: number;
    recovered: number;
    deceased: number;
  };

  const maximum = Math.max(...Object.values(maxima));

  return (
    <svg viewBox={`-20 -20 ${width + 40} ${height + 40}`}>
      <Lines
        key="values.active"
        height={height}
        offset={0}
        color={COLOR_ACTIVE}
        width={width}
        values={values.active}
        maximum={maximum}
      />
      <Lines
        key="values.confirmed"
        height={height}
        offset={1}
        color={COLOR_CONFIRMED}
        width={width}
        values={values.confirmed}
        maximum={maximum}
      />
      <Lines
        key="values.recovered"
        height={height}
        offset={2}
        color={COLOR_RECOVERED}
        width={width}
        values={values.recovered}
        maximum={maximum}
      />
      <Lines
        key="values.deceased"
        height={height}
        offset={3}
        color={COLOR_DECEASED}
        width={width}
        values={values.deceased}
        maximum={maximum}
      />
      <Lines
        key="averages.active"
        height={height}
        offset={0}
        color={COLOR_ACTIVE}
        width={width}
        values={averages.active}
        includeCircles={false}
        includeLines={true}
        maximum={maximum}
      />
      <Lines
        key="averages.confirmed"
        height={height}
        offset={1}
        color={COLOR_CONFIRMED}
        width={width}
        values={averages.confirmed}
        includeCircles={false}
        includeLines={true}
        maximum={maximum}
      />
      <Lines
        key="averages.recovered"
        height={height}
        offset={2}
        color={COLOR_RECOVERED}
        width={width}
        values={averages.recovered}
        includeCircles={false}
        includeLines={true}
        maximum={maximum}
      />
      <Lines
        key="averages.deceased"
        height={height}
        offset={3}
        color={COLOR_DECEASED}
        width={width}
        values={averages.deceased}
        includeCircles={false}
        includeLines={true}
        maximum={maximum}
      />
    </svg>
  );
};

export default CountryDetailsChart;
