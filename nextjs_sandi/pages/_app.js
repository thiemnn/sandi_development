import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Sandi Viet Nam - Nhà cung cấp băng tải hàng đầu Việt Nam</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="băng tải, bang tai, hệ thống băng tải, dây băng tải" />
          <meta name="author" content="Sandi Viet Nam" />
          <meta name="description" content="Băng tải Sandi Viet Nam - Là đơn vị cung cấp vật tư băng tải, thiết kế lắp đặt hệ thống băng tải mini hàng đầu tại Việt Nam"/> 
          <meta property="og:url" content="https://sandivietnam.com/"/> 
          <meta property="og:type" content="website"/> 
          <meta property="og:title" content="Sandi Viet Nam - Nhà cung cấp băng tải hàng đầu Việt Nam"/> 
          <meta property="og:description" content="Băng tải Sandi Viet Nam - Là đơn vị cung cấp vật tư băng tải, thiết kế lắp đặt hệ thống băng tải mini hàng đầu tại Việt Nam"/> 
          <meta property="image:alt" content="Sandi Viet Nam - Nhà cung cấp băng tải hàng đầu Việt Nam"/> 
          <meta property="og:image" content="https://sandivietnam.com/image/catalog/Chung/logo-sandi.png"/> 
          <meta name="twitter:card" content="summary"/> 
          <meta name="twitter:description" content="Băng tải Sandi Viet Nam - Là đơn vị cung cấp vật tư băng tải, thiết kế lắp đặt hệ thống băng tải mini hàng đầu tại Việt Nam"/> 
          <meta name="twitter:title" content="Sandi Viet Nam - Nhà cung cấp băng tải hàng đầu Việt Nam"/> 
          <meta name="twitter:image" content="https://sandivietnam.com/image/https://sandivietnam.com/image/catalog/Chung/logo-sandi.png"/> 
          <meta name="robots" content="index, follow, noodp, noydir"></meta>
          <link href="https://sandivietnam.com/image/catalog/Chung/rsz_logoapp.png" rel="icon"/>
          <link href="https://sandivietnam.com" rel="canonical"></link>  

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org", 
                "@graph": [ 
                  { 
                    "@type": "Organization", 
                    "@id": "https://sandivietnam.com/#organization", 
                    "name": "Sandi Viet Nam - Nhà cung cấp băng tải hàng đầu Việt Nam", 
                    "url": "https://sandivietnam.com/", 
                    "sameAs": ["https://www.facebook.com/sandivietnam.page"], 
                    "logo": { "@type": "ImageObject", 
                    "@id": "https://sandivietnam.com/#logo", 
                    "url": "https://sandivietnam.com/image/catalog/Chung/logo-sandi.png", 
                    "caption": "Sandi Viet Nam" }, 
                    "image": { "@id": "https://sandivietnam.com/#logo" } 
                  }, 
                  { 
                    "@type": "WebSite", 
                    "@id": "https://sandivietnam.com/#website", 
                    "url": "https://sandivietnam.com/", 
                    "name": "Sandi Viet Nam - Nhà cung cấp băng tải hàng đầu Việt Nam", 
                    "publisher": { 
                      "@id": "https://sandivietnam.com/#organization" 
                    }, 
                    "potentialAction": { 
                      "@type": "SearchAction", 
                      "target": "https://sandivietnam.com/product/search?search={search_term_string}", 
                      "query-input": "required name=search_term_string" } 
                    }, 
                    { 
                      "@type": "WebPage", 
                      "@id": "https://sandivietnam.com/#webpage", 
                      "url": "https://sandivietnam.com/", 
                      "inLanguage": "vi", 
                      "name": "Sandi Viet Nam - Nhà cung cấp băng tải hàng đầu Việt Nam", 
                      "isPartOf": { "@id": "https://sandivietnam.com/#website" }, 
                      "about": { "@id": "https://sandivietnam.com/#organization" }, 
                      "description": "Băng tải Sandi Viet Nam - Là đơn vị cung cấp vật tư băng tải, thiết kế lắp đặt hệ thống băng tải mini hàng đầu tại Việt Nam" 
                    } 
                  ]
              })
            }}
          />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
      
  );
}

export default MyApp;
