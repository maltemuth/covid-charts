import Link from "next/link";
import PageHead from "../components/PageHead";
import getCountryList from "../model/country/getCountryList";
import { Country } from "../model/country/Country";
import { useState, ChangeEvent } from "react";

const getStaticProps = async () => ({
  props: { countries: await getCountryList() },
});

export { getStaticProps };

const MAX_COUNTRIES = 10;

const CountryList: React.FunctionComponent<{ countries: Country[] }> = ({
  countries,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const search = new RegExp(`${searchTerm}`, 'ig');

  const filteredCountries = countries.filter(({ name }) =>
    search.test(name)
  );

  return (
    <div className="container">
      <PageHead title="Country Index" />
      
      <h1>Country Index</h1>
      <input type="search" onChange={ event  => setSearchTerm(event.target.value)}></input>
      <ul>
        {filteredCountries.slice(0, MAX_COUNTRIES).map(({ name, slug, total }) => (
          <li key={slug}>
            <Link href="/country/[slug]" as={`/country/${slug}`}>
              <a>{name}</a>
            </Link>
            <small> &mdash; {total.toLocaleString()}</small>
          </li>
        ))}
      </ul>
      {filteredCountries.length > MAX_COUNTRIES && <div>{filteredCountries.length - 10} countries omitted</div>}
    </div>
  );
};

export default CountryList;
