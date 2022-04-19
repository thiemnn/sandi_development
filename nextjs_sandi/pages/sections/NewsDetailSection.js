
import React, { useState, useEffect } from 'react';
import { fetchWrapper } from '../../helpers/fetch-wrapper';
import { utils } from '../../helpers/utils';

function DetailSection({ relation_id }) {
    const [newsDetail, setNewDetail] = useState(null)
    const [comments, setComments] = useState(null)
    const [newsCategories, setNewsCategories] = useState(null)
    const [otherNews, setOtherNews] = useState(null)
    const [reply_name, setReplyName] = useState("")
    const [reply_email, setReplyEmail] = useState("")
    const [reply_website, setReplyWebsite] = useState("")
    const [reply_comment, setReplyContent] = useState("")
    const [showReplyNameError, setshowReplyNameError] = useState(false)
    const [showReplyContentError, setshowReplyContentError] = useState(false)
    const [showReplyEmailError, setshowReplyEmailError] = useState(false)

    
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (relation_id) {
            fetchWrapper.get(process.env.NEXT_PUBLIC_SERVER_DOMAIN + 'news/' + relation_id).then((data) => 
            {
                setComments(data.data.comments)
                setNewDetail(data.data.news_detail)    
                setNewsCategories(data.data.news_categories)  
                setOtherNews(data.data.otherNews)
                setLoaded(true)
            })
        }
    }, [relation_id])


    const handleClick = (e) =>  {
        var valid = true;
        if(!reply_comment){
            setshowReplyContentError(true)
            valid = false
        } else{
            setshowReplyContentError(false)
        }
        if(!reply_name){
            setshowReplyNameError(true)
            valid = false
        } else{
            setshowReplyNameError(false)
        }
        if(!reply_email){
            setshowReplyEmailError(true)
            valid = false
        } else{
            setshowReplyEmailError(false)
        }
        if(!valid){
            return
        }
        const body = { 
            news_id: relation_id,
            name:reply_name, 
            email:reply_email,
            website:reply_website,
            comment:reply_comment,
        }
        fetchWrapper.post(process.env.NEXT_PUBLIC_SERVER_DOMAIN + 'news/addComment', body).then((data) => 
        {
            setReplyName('')
            setReplyEmail('')
            setReplyWebsite('')
            setReplyContent('')
        })
    }
    
    if (loaded && newsDetail) {
        return (
            <>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="breadcrumb-content">
                            <ul>
                                <li><a href="/">Trang chủ</a></li>
                                <li><a href={"/"+newsDetail.category_url}>{newsDetail.category_name}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="li-main-blog-page li-main-blog-details-page pt-60 pb-60 pb-sm-45 pb-xs-45">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 order-lg-2 order-2">
                                <div className="li-blog-sidebar-wrapper">
                                    <div className="li-blog-sidebar hidden">
                                        <div className="li-sidebar-search-form">
                                            <form action="#">
                                                <input type="text" className="li-search-field" placeholder="Tìm kiếm" />
                                                <button type="submit" className="li-search-btn"><i className="fa fa-search"></i></button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="li-blog-sidebar pt-25">
                                        <h4 className="li-blog-sidebar-title">Danh mục tin tức</h4>
                                        <ul className="li-blog-archive">
                                            {newsCategories.map((newsCategory) => (
                                                <li key={newsCategory.id}><a href={newsCategory.url_seo}>{newsCategory.name}</a></li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="li-blog-sidebar">
                                        <h4 className="li-blog-sidebar-title">Bài đăng gần đây</h4>
                                        {otherNews.map((otherNew) => (
                                            <div className="li-recent-post pb-30" key={otherNew.url_seo}>
                                                <div className="li-recent-post-thumb">
                                                    <a href={otherNew.url_seo}>
                                                        <img className="img-full" src={otherNew.image.replace("../storage", process.env.NEXT_PUBLIC_ADMIN_DOMAIN + "storage")} alt={otherNew.title} />
                                                    </a>
                                                </div>
                                                <div className="li-recent-post-des">
                                                    <span><a href={otherNew.url_seo}>{otherNew.title}</a></span>
                                                    <span className="li-post-date">{utils.prettyDate(otherNew.created_time)}</span>
                                                </div>
                                            </div>
                                        ))}                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 order-lg-1 order-1">
                                <div className="row li-main-content">
                                    <div className="col-lg-12">
                                        <div className="li-blog-single-item pb-30">
                                            <div className="li-blog-banner">
                                                <a href="blog-details.html"><img className="img-full" src={newsDetail.image.replace("../storage", process.env.NEXT_PUBLIC_ADMIN_DOMAIN+"storage")} alt="" /></a>
                                            </div>
                                            <div className="li-blog-content">
                                                <div className="li-blog-details">
                                                    <h3 className="li-blog-heading pt-25"><a href="#">{newsDetail.title}</a></h3>
                                                    <div>
                                                        <p dangerouslySetInnerHTML={{ __html: newsDetail.content.replaceAll("src=\"../storage", "src=\""+process.env.NEXT_PUBLIC_ADMIN_DOMAIN+"storage") }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="li-comment-section">
                                            <h3>{comments.length} phản hồi</h3>
                                            <ul>
                                                {comments.map((comment) => (
                                                    <li>
                                                        <div className="author-avatar pt-15">
                                                            <img src="images/product-details/user.png" alt="User" />
                                                        </div>
                                                        <div className="comment-body pl-15">
                                                            <h5 className="comment-author pt-15">{comment.reply_name}</h5>
                                                            <div className="comment-post-date">
                                                                {utils.prettyDate(comment.created_time)}
                                                            </div>
                                                            <p>{comment.reply_comment}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="li-blog-comment-wrapper">
                                            <h3>Nội dung phản hồi(*)</h3>
                                            <form >
                                                <div className="comment-post-box">
                                                    <div className="row">
                                                        <div className="col-lg-12  mb-30">
                                                            <textarea name="reply_comment" placeholder="" value={reply_comment} onChange={e => setReplyContent(e.target.value)}></textarea>
                                                            <span className='error-text' style={{ display: showReplyContentError ? "block" : "none" }}>Chưa nhập nội dung phản hồi</span>
                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 mt-5 mb-sm-20 mb-xs-20">
                                                            <label>Tên(*)</label>
                                                            <input type="text" name="reply_name" id="reply_name" className="coment-field" placeholder=""
                                                                value={reply_name} onChange={e => setReplyName(e.target.value)} />
                                                            <span className='error-text' style={{ display: showReplyNameError ? "block" : "none" }}>Chưa nhập tên</span>
                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 mt-5 mb-sm-20 mb-xs-20">
                                                            <label>Email(*)</label>
                                                            <input type="text" name="reply_email" id="reply_email" className="coment-field" placeholder=""
                                                                value={reply_email} onChange={e => setReplyEmail(e.target.value)} />
                                                            <span className='error-text' style={{ display: showReplyEmailError ? "block" : "none" }}>Chưa nhập email</span>
                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4 mt-5 mb-sm-20">
                                                            <label>Website</label>
                                                            <input type="text" name="reply_website" id="reply_website" className="coment-field" placeholder=""
                                                                value={reply_website} onChange={e => setReplyWebsite(e.target.value)} />
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="coment-btn pt-30 pb-xs-30 pb-sm-30 f-left">
                                                                <input className="li-btn-2" type="button" onClick={handleClick} name="submit" value="Gửi phản hồi" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
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

export default DetailSection