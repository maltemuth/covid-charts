import CountryDetail from "../../../../[slug]";
import { getStaticProps as getStaticPropsForSlugAndProvince } from "../../[provinceName]";
import { GetStaticProps, GetStaticPaths } from "next";
import getDataPointsBySlug from "../../../../../../model/dataPoint/getDataPointsBySlug";
import sumByTimestamp from "../../../../../../model/dataPoint/sumByTimestamp";
import withDeltas from "../../../../../../model/dataPoint/withDeltas";
import filterByCity from "../../../../../../model/dataPoint/filterByCity";
import filterByProvince from "../../../../../../model/dataPoint/filterByProvince";

export const getStaticProps: GetStaticProps = async ({
  params: { slug, provinceName, cityName },
}) => {
  const { props } = await getStaticPropsForSlugAndProvince({
    params: { slug, provinceName },
  });

  const dataPoints = await getDataPointsBySlug(slug as string);

  const foundCity = props.cities.find(
    name => name.toLowerCase() === cityName
  );

  const foundProvince = props.provinces.find(
    name => name.toLowerCase() === props.selectedProvince
  )

  const remainingPoints = filterByCity(
    filterByProvince(dataPoints, foundProvince),
    foundCity
  )

  return {
    props: {
      ...props,
      dataPoints: withDeltas(
        sumByTimestamp(
          remainingPoints
        )
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
