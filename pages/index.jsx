import Head from "next/head";

import Layout from "@layouts/Layout";
import GenerateCode from "@components/GenerateCode";

export default function Index() {
  return (
    <>
      <Head>
        <title>QR Generator</title>
        <meta
          name="description"
          content="Web application to generate QR codes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <GenerateCode />
      </Layout>
    </>
  );
}
