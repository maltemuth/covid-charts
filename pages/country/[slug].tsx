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

        .back-to-top {
          position: fixed;
          display: inline-block;
          width: 2rem;
          line-height: 2rem;
          font-size: 2rem;
          text-decoration: none;
          text-align: center;
          left: 1rem;
          bottom: 1rem;
          background: white;
          border: 1px solid gray;
          color: inherit;
          box-shadow: white 0 0 8px 4px;
        }
      `}</style>
      <Link href="/">
        <a
          style={{
            display: "block",
            width: "100vw",
            textAlign: "center",
            lineHeight: "3rem",
          }}
        >
          back to index
        </a>
      </Link>
      <h1>{country.name}</h1>

      <CountryDetailsChart details={details} />
      <hr />
      <CountryDetailsTable details={details} />
      <a className="back-to-top" href="#">
        ↥
      </a>
    </>
  ) : null;

export default CountryDetail;
