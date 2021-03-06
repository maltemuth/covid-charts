import Link from "next/link";
import PageHead from "../components/PageHead";
import getCountryList from "../model/country/getCountryList";
import { Country } from "../model/country/Country";
import { useState } from "react";
import { GetStaticProps } from "next";

const getStaticProps: GetStaticProps = async () => ({
  props: { countries: await getCountryList() },
  unstable_revalidate: 3600,
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
      <style jsx>{`
      .container {
        margin: 0 auto;
        text-align: center;
      }

      ul li {
        list-style: none;
        line-height: 2rem;
      }

      ul {
        padding: 0;
      }

      input {
        font-size: 1.25rem;
        text-align: center;
        border: 0;
        border-bottom: 1px solid gray;
        -webkit-appearance: none;
      }

      input::-webkit-search-cancel-button {
        display: none;
      }
      `}</style>
      <PageHead title="Country Index" />
      
      <h1>Country Index</h1>
      <input type="search" placeholder="search countries" onChange={ event  => setSearchTerm(event.target.value)}></input>
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
