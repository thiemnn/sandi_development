import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const pid = router.query.pid
  const [meta_title, setMeta_title] = useState("Sandi Viet Nam - Nhà cung cấp băng tải hàng đầu Việt Nam")
  const [meta_desc, setMeta_desc] = useState("Băng tải Sandi Viet Nam - Là đơn vị cung cấp vật tư băng tải, thiết kế lắp đặt hệ thống băng tải mini hàng đầu tại Việt Nam")
  const [image, setImage] = useState("https://sandivietnam.com/image/catalog/Chung/logo-sandi.png");
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if(pid){ 
      fetch(process.env.NEXT_PUBLIC_SERVER_DOMAIN + 'seo_urls/' + pid)
      .then((res) => res.json())
      .then((data) => {
        if(data.data){
          if(data.data.meta_title){
            setMeta_title(data.data.meta_title);
          }
          if(data.data.meta_desc){
            setMeta_desc(data.data.meta_desc);
          }    
          if(data.data.image){
            setImage(data.data.image);
          }       
        }
        setLoaded(true)
      })
    }    
  }, [pid])
  return (
    <>
      <Head>
        <title>{meta_title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="băng tải, bang tai, hệ thống băng tải, dây băng tải" />
          <meta name="author" content="Sandi Viet Nam" />
          <meta name="description" content={meta_desc}/> 
          <meta property="og:url" content="https://sandivietnam.com/"/> 
          <meta property="og:type" content="website"/> 
          <meta property="og:title" content={meta_title}/> 
          <meta property="og:description" content={meta_desc}/> 
          <meta property="image:alt" content={meta_title}/> 
          <meta property="og:image" content={image.replace("../storage", process.env.NEXT_PUBLIC_ADMIN_DOMAIN+"storage")}/> 
          <meta name="twitter:card" content="summary"/> 
          <meta name="twitter:description" content={meta_desc}/> 
          <meta name="twitter:title" content={meta_title}/> 
          <meta name="twitter:image" content={image.replace("../storage", process.env.NEXT_PUBLIC_ADMIN_DOMAIN+"storage")}/> 
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

          <link rel="stylesheet" href="/css/font-awesome.min.css" />
          <link rel="stylesheet" href="/css/meanmenu.css" />
          <link rel="stylesheet" href="/css/nice-select.css" />
          <link rel="stylesheet" href="/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/css/slick.css" />
          <link rel="stylesheet" href="/css/animate.css" />
          <link rel="stylesheet" href="/css/owl.carousel.min.css" />
          <link rel="stylesheet" href="/css/helper.css" />
          <link rel="stylesheet" href="/style.css" />
          <link rel="stylesheet" href="/css/responsive.css"></link>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
      
  );
}

export default MyApp;
