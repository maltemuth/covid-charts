import Head from "next/head";

interface PageHeadProps {
  title: string;
}

const PageHead: React.FunctionComponent<PageHeadProps> = ({ title }) => (
  <>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
        rel="subresource"
      ></link>
    </Head>
    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        font-family: "Roboto", sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </>
);

export default PageHead;
