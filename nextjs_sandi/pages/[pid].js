import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import HomeSection from "./sections/HomeSection";
import DetailSection from './sections/DetailSection';
import NotFoundSection from './sections/NotFoundSection';
import CategorySection from './sections/CategorySection';
import NewsCategorySection from './sections/NewsCategorySection';
import NewsDetailSection from './sections/NewsDetailSection';
import SameCategorySection from './sections/SameCategorySection';

const Post = () => {
  const router = useRouter()
  const { pid } = router.query

  const [url_type, setUrl_type] = useState(0)
  const [relation_id, setRelation_id] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if(pid){
      fetch(process.env.NEXT_PUBLIC_SERVER_DOMAIN + 'seo_urls/' + pid)
      .then((res) => res.json())
      .then((data) => {
        if(data.data){
          setUrl_type(data.data.url_type)
          setRelation_id(data.data.relation_id)
        }        
        setLoaded(true)
      })
    }    
  }, [pid])

  if (loaded) {
    switch (url_type) {
      case 1:
        return (
          <>
            <CategorySection relation_id={relation_id}/>
          </>
        )
        break;
      case 2:
        return (
          <>
            <DetailSection relation_id={relation_id}/>
          </>
        )
        break;
      case 3:
        return (
          <>
            <NewsCategorySection relation_id={relation_id}/>
          </>
        )
        break;
      case 4:
        return (
          <>
            <NewsDetailSection relation_id={relation_id}/>
          </>
        )
        break;
      default:
        return (
          <>
            <NotFoundSection />
          </>
        )
    }
  } else {
    return (
      <></>
    )
  }  
}

export default Post