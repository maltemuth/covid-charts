import CountryDetail from "../../[slug]";
import { getStaticProps as getStaticPropsForSlug } from "../../[slug]";
import { GetStaticProps, GetStaticPaths } from "next";
import getDataPointsBySlug from "../../../../model/dataPoint/getDataPointsBySlug";
import sumByTimestamp from "../../../../model/dataPoint/sumByTimestamp";
import withDeltas from "../../../../model/dataPoint/withDeltas";
import filterByCity from "../../../../model/dataPoint/filterByCity";

export const getStaticProps: GetStaticProps = async ({
  params: { slug, cityName },
}) => {
  console.log(cityName, "cityName");
  const { props } = await getStaticPropsForSlug({ params: { slug } });

  const dataPoints = await getDataPointsBySlug(slug as string);

  const foundCity = props.cities.find(
    (name) => name.toLowerCase() === cityName
  );

  console.log(foundCity, "foundCity");

  return {
    props: {
      ...props,
      dataPoints: withDeltas(
        sumByTimestamp(filterByCity(dataPoints, foundCity))
      ),
      selectedCity: cityName,
    },
    unstable_revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export default CountryDetail;
