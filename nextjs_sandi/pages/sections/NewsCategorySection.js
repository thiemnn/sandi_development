import React, { useState, useEffect } from 'react';
import { utils } from '../../helpers/utils';

function NewsCategorySection({ relation_id }) {

    const [loaded, setLoaded] = useState(false)
    const [news, setNews] = useState(null)
    const [news_category, setNewsCategory] = useState(null)
    const [per_page, setPer_Page] = useState(5)
    const [page, setPage] = useState(1)
    const [news_count, setNews_Count] = useState(0)

    useEffect(() => {
        if (relation_id) {
            fetch(process.env.NEXT_PUBLIC_SERVER_DOMAIN + 'newscategory/' + relation_id + '?per_page=' + per_page + '&page=' + page)
                .then((res) => res.json())
                .then((data) => {
                    setLoaded(true)                    
                    setNews(data.data.news);                    
                    setNews_Count(data.data.news_count)
                    setNewsCategory(data.data.news_category)
                    window.scrollTo(0, 0);
                })
        }
      }, [relation_id, per_page, page])

    function privousPage(){
        if(page > 1){
            setPage(page - 1);
        }
    }
    function nextPage(){
        if(page < Math.ceil(news_count / per_page)){
            setPage(page + 1);
        }
    }
    function gotoPage(page_index){
        setPage(page_index);
    }

    function DisplayPaginator() {
        var start_page = page < 3 ? 1 : page - 2;
        var page_count = Math.ceil(news_count / per_page);        
        var end_page = page > page_count - 2 ? page_count : page + 2;
        
        let pages = [];
        for(var i = start_page; i<= end_page; i++){
            pages.push(i);
        }
        return (
            <div className="paginatoin-area">
                <div className="row">
                    <div className="col-lg-6 col-md-6 pt-xs-15">
                        <p>Hiển thị {Math.min(per_page,news_count)}/{news_count} bài viết</p>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <ul className="pagination-box pt-xs-20 pb-xs-15">
                            <li><a onClick={() => privousPage()} className="Previous"><i className="fa fa-chevron-left"></i> Trước</a>
                            </li>
                            {pages.map((page_index)=>(
                                 <li key={page_index} className={page_index == page ? 'active' : undefined} ><a onClick={() => gotoPage(page_index)}>{page_index}</a></li>
                            ))}
                            <li>
                                <a onClick={() => nextPage()} className="Next"> Sau <i className="fa fa-chevron-right"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    if (news_category) {
        return (
            <>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="breadcrumb-content">
                            <ul>
                                <li><a href="/">Trang chủ</a></li>
                                <li className="active">{news_category.name}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="li-main-blog-page pt-60 pb-55">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row li-main-content">
                                    {news && news.map((new_detail) => (
                                        <div className="col-lg-12" key={new_detail.url_seo}>
                                            <div className="li-blog-single-item pb-30">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="li-blog-banner">
                                                            <a href={new_detail.url_seo}><img className="img-full" src={new_detail.image.replace("../storage", process.env.NEXT_PUBLIC_ADMIN_DOMAIN+"storage")} alt="" /></a>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="li-blog-content">
                                                            <div className="li-blog-details">
                                                                <h3 className="li-blog-heading pt-xs-25 pt-sm-25"><a href={new_detail.url_seo}>{new_detail.title}</a></h3>
                                                                <div className="li-blog-meta">
                                                                    <a className="comment" href="#"><i className="fa fa-comment-o"></i> {new_detail.comment_count} phản hồi</a>
                                                                    <a className="post-time" href="#"><i className="fa fa-calendar"></i> {utils.prettyDate(new_detail.created_time)}</a>
                                                                </div>
                                                                <p dangerouslySetInnerHTML={{ __html: new_detail.short_description }}></p>
                                                                <a className="read-more" href={new_detail.url_seo}>Xem thêm...</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="col-lg-12">
                                        <DisplayPaginator />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (<></>)
    }
}

export default NewsCategorySection