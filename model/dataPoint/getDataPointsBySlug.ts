import fetch from "../../lib/fetch";
import { DataPointWithLocation } from "./DataPointWithLocation";

const getDataPointsBySlug = async (slug: string): Promise<DataPointWithLocation[]> => {
  return await fetch("https://api.covid19api.com/country/" + slug)
    .then(async (response) => {
      try {
        const data = await response.json();

        return slug === "united-states"
          ? data.filter(({ Province }) => Province !== "")
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
          Province: string;
          City: string;
        }[]
      ) =>
        data.map(
          ({ Date, Active, Recovered, Confirmed, Deaths, Province, City }) => ({
            timestamp: Date,
            active: Active,
            recovered: Recovered,
            confirmed: Confirmed,
            deceased: Deaths,
            province: Province,
            city: City,
          })
        )
    );
};

export default getDataPointsBySlug;
