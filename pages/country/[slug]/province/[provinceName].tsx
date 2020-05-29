import CountryDetail from "../../[slug]";
import { getStaticProps as getStaticPropsForSlug } from "../../[slug]";
import { GetStaticProps, GetStaticPaths } from "next";
import getDataPointsBySlug from "../../../../model/dataPoint/getDataPointsBySlug";
import sumByTimestamp from "../../../../model/dataPoint/sumByTimestamp";
import withDeltas from "../../../../model/dataPoint/withDeltas";
import filterByProvince from "../../../../model/dataPoint/filterByProvince";
import getCities from "../../../../model/dataPoint/getCities";

export const getStaticProps: GetStaticProps = async ({
  params: { slug, provinceName },
}) => {
  const { props } = await getStaticPropsForSlug({ params: { slug } });

  const dataPoints = await getDataPointsBySlug(slug as string);
  

  const foundProvince = props.provinces.find(
    (name) => name.toLowerCase() === provinceName
  );

  const remainingDataPoints = filterByProvince(dataPoints, foundProvince)

  const cities = getCities(remainingDataPoints);

  return {
    props: {
      ...props,
      dataPoints: withDeltas(
        sumByTimestamp(remainingDataPoints)
      ),
      cities,
      selectedProvince: provinceName,
    },
    unstable_revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export default CountryDetail;
