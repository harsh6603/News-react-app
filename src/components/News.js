import React, { useState, useEffect } from 'react'
import Newsitem from './Newsitem'
import defaultImage from "./android-chrome-192x192.png"
import Loading from './Loading'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"
import '../News.css'

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const [loading, setLoading] = useState(false)

    const firstCall = async() => {
        props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`;
        setLoading(true);
        let res = await fetch(url);
        props.setProgress(30);
        let data = await res.json();
        props.setProgress(50);
        setArticles(data.articles);
        setTotalResults(data.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        firstCall();
        // eslint-disable-next-line
    },[])

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const fetchMoreData = async () => {
        setPage(page+1);
        let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        let res = await fetch(url);
        let data = await res.json();
        setArticles(articles.concat(data.articles));
    };

    document.title = `${capitalize(props.category)} - News24`;
    return (
        <div className='container my-3'>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Loading />}
            >
                <div className='row' id="row">
                    <h2 className='text-center mt-6' id="newsTitle">{`News24 - Top ${capitalize(props.category)} Headlines`}</h2>
                    {loading && <Loading />}
                    {
                        articles.map(element => {
                            return <div className='col-md-3' key={element.url}>
                                <Newsitem title={(element.title) ? element.title : " "} description={(element.content) ? element.content : element.description}
                                    imageUrl={(element.urlToImage) ? element.urlToImage : defaultImage} newsUrl={element.url}
                                    author={(element.author) ? element.author : "Unknown"} publishedAt={element.publishedAt}
                                    name={element.source.name} />
                            </div>
                        })
                    }
                </div>
            </InfiniteScroll>
        </div>
    )
}
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
export default News