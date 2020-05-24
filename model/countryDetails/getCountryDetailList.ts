import { CountryDetails } from "./CountryDetails";
import fetch from "../../lib/fetch";

const getCountryDetailList = async (
  slug: string
): Promise<CountryDetails[]> => {
  return await fetch("https://api.covid19api.com/country/" + slug)
    .then(async (response) => {
      try {
        const data = await response.json();

        return slug === "united-states"
          ? data.filter(({ Province }) => Province === "")
          : data;
      } catch (e) {
        console.error(response.body);
        throw e;
      }
    })
    .then(
      (
        data: {
          Date: string;
          Active: number;
          Recovered: number;
          Confirmed: number;
          Deaths: number;
        }[]
      ) =>
        data.map(({ Date, Active, Recovered, Confirmed, Deaths }) => ({
          timestamp: Date,
          active: Active,
          recovered: Recovered,
          confirmed: Confirmed,
          deceased: Deaths,
        }))
    )
    .then(
      (
        data: {
          timestamp: string;
          active: number;
          confirmed: number;
          recovered: number;
          deceased: number;
        }[]
      ) =>
        data.reduce(
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
        )
    )
    .then(
      (data: {
        [timestamp: string]: {
          active: number;
          recovered: number;
          confirmed: number;
          deceased: number;
        };
      }) =>
        Object.keys(data)
          .sort()
          .map((timestamp) => ({
            timestamp,
            ...data[timestamp],
          }))
          .map(
            (
              { timestamp, active, recovered, confirmed, deceased },
              index,
              list
            ) => ({
              timestamp,
              active,
              recovered,
              confirmed,
              deceased,
              deltaActive: active - (list[index - 1]?.active || 0),
              deltaConfirmed: confirmed - (list[index - 1]?.confirmed || 0),
              deltaRecovered: recovered - (list[index - 1]?.recovered || 0),
              deltaDeceased: deceased - (list[index - 1]?.deceased || 0),
            })
          )
          .reverse()
    );
};

export default getCountryDetailList;
