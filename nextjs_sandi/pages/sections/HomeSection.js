import React, { useState, useEffect } from 'react';

export default function HomeSection() {

  const [loaded, setLoaded] = useState(false)
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SERVER_DOMAIN + 'categories/directChild/0')
            .then((res) => res.json())
            .then((data) => {
              setLoaded(true)
              setCategories(data.data);
            })
  }, [])

  if(categories){
    return (
      <div className="li-main-blog-page pt-60 pb-55">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row li-main-content">
                {categories && categories.map((category) => {
                  if (category.name != "Ứng dụng") return (
                    <div className="col-lg-4 col-md-6" key={category.url_seo}>
                      <div className="li-blog-single-item pb-25 div-300">
                        <a href={category.url_seo}><img className="img-full" src={category.image.replace("../storage", process.env.NEXT_PUBLIC_ADMIN_DOMAIN+"storage")} alt="" /></a>
                      </div>
                      <div className="li-blog-content center">
                        <div className="li-blog-details">
                          <h3 className="li-blog-heading pt-10 pb-25"><a href={category.url_seo}>{category.name}</a></h3>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else{
    return(
      <></>
    )
  }
  
}
