import { Country } from "./Country";
import fetch from '../../lib/fetch';
import sortByTotal from "./sortByTotal";

const getCountryList = async (): Promise<Country[]> =>
  fetch("https://api.covid19api.com/summary")
    .then((response) =>
      response.json().then((data) =>
        data.Countries.filter(({ TotalConfirmed }) => TotalConfirmed > 0).map(
          ({ Country, Slug, TotalConfirmed, CountryCode }) => ({
            name: Country,
            slug: Slug,
            total: TotalConfirmed,
            code: (CountryCode || "").toLowerCase(),
          })
        )
      )
    )
    .then(sortByTotal);

export default getCountryList;
