import Link from "next/link";
import PageHead from "../../components/PageHead";
import { CountryDetails } from "../../model/countryDetails/CountryDetails";
import getCountryDetailList from "../../model/countryDetails/getCountryDetailList";
import getCountryList from "../../model/country/getCountryList";
import { Country } from "../../model/country/Country";
import CountryDetailsTable from "../../components/CountryDetailsTable";
import CountryDetailsChart from "../../components/CountryDetailsChart";

export const getStaticProps = async ({
  params: { slug },
}): Promise<{ props: CountryDetailProps }> => {
  const details = await getCountryDetailList(slug);
  const countries = await getCountryList();
  const country = countries.find((entry) => entry.slug === slug);
  return {
    props: {
      country,
      details,
    },
  };
};

export const getStaticPaths = async () => ({
  paths: await getCountryList().then((countries) =>
    countries.map(({ slug }) => `/country/${slug}`)
  ),
  fallback: true,
});

interface CountryDetailProps {
  country: Country;
  details: CountryDetails[];
}

const CountryDetail: React.FunctionComponent<CountryDetailProps> = ({
  country,
  details,
}) =>
  country && details ? (
    <>
      <PageHead title={`${country.name} details`} />
      <style jsx>{`
        h1 {
          text-align: center;
        }

        svg {
          margin: 0 auto;
        }
      `}</style>
      <Link href="/">
        <a>back to index</a>
      </Link>
      <h1>{country.name}</h1>

      <CountryDetailsChart details={details} />
      <hr />
      <CountryDetailsTable details={details} />
    </>
  ) : null;

export default CountryDetail;
