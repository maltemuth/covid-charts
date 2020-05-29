import Link from "next/link";
import { useRouter } from "next/router";
import PageHead from "../../components/PageHead";
import getDataPointsBySlug from "../../model/dataPoint/getDataPointsBySlug";
import getCountryList from "../../model/country/getCountryList";
import { Country } from "../../model/country/Country";
import CountryDetailsTable from "../../components/CountryDetailsTable";
import CountryDetailsChart from "../../components/CountryDetailsChart";
import { GetStaticProps, GetStaticPaths } from "next";
import sumByTimestamp from "../../model/dataPoint/sumByTimestamp";
import withDeltas from "../../model/dataPoint/withDeltas";
import getProvinces from "../../model/dataPoint/getProvinces";
import { DataPointWithDeltas } from "../../model/dataPoint/DataPointWithDeltas";
import getCities from "../../model/dataPoint/getCities";

const getUrl = (slug: string, province: string | null, city?: string | null) => {
  const slugPart = `/country/${slug}`;
  const provincePart = `/province/${province}`;
  const cityPart = `/city/${city}`;

  if (!province && !city) {
    return slugPart;
  }

  if (!city) {
    return slugPart + provincePart;
  }

  if (!province) {
    return slugPart + cityPart;
  }

  return slugPart + provincePart + cityPart;
};

export const getStaticProps: GetStaticProps<CountryDetailProps> = async ({
  params: { slug },
}) => {
  const dataPoints = await getDataPointsBySlug(slug as string);
  const countries = await getCountryList();
  const country = countries.find((entry) => entry.slug === slug);

  const provinces = getProvinces(dataPoints);
  const cities = getCities(dataPoints);

  return {
    props: {
      country,
      dataPoints: withDeltas(sumByTimestamp(dataPoints)),
      provinces,
      cities,
    },
    unstable_revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: await getCountryList().then((countries) =>
    countries.map(({ slug }) => `/country/${slug}`)
  ),
  fallback: true,
});

export interface CountryDetailProps {
  country: Country;
  dataPoints: DataPointWithDeltas[];
  provinces: string[];
  selectedProvince?: string;
  cities: string[];
  selectedCity?: string;
}

const CountryDetail: React.FunctionComponent<CountryDetailProps> = ({
  country,
  dataPoints,
  provinces,
  selectedProvince = null,
  cities,
  selectedCity = null,
}) => {
  const router = useRouter();

  if (!country || !dataPoints) {
    return null;
  }
  const timeline = dataPoints;

  return (
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

        .selects {
          text-align: center;
        }

        .selects select {
          margin: 1em;
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
      <div className="selects">
      {provinces.length > 0 && (
        <select
          value={selectedProvince}
          onChange={(event) => {
            router.push(getUrl(country.slug, event.target.value));
          }}
        >
          <option value="">all provinces</option>
          {provinces.map((province) => (
            <option value={province.toLowerCase()}>{province}</option>
          ))}
        </select>
      )}
      
      {cities.length > 0 && (
        <select
          value={selectedCity}
          onChange={(event) => {
            router.push(getUrl(country.slug, selectedProvince, event.target.value));
          }}
        >
          <option value="">all cities</option>
          {cities.map((city) => (
            <option value={city.toLowerCase()}>{city}</option>
          ))}
        </select>
      )}
      </div>

      <CountryDetailsChart details={timeline} />
      <hr />
      <CountryDetailsTable details={timeline} />
      <a className="back-to-top" href="#">
        ↥
      </a>
    </>
  );
};

export default CountryDetail;
