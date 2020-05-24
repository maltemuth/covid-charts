import { Country } from "./Country";

const sortByTotal = (countries: Country[]): Country[] =>
  countries.sort(({ total: a }, { total: b }) => b - a);

export default sortByTotal;
