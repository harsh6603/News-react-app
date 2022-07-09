import React, { Component } from 'react'
import { Newsitem } from './Newsitem'
import defaultImage from "./android-chrome-192x192.png"
import { Loading } from './Loading'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
            totalResults: 0,
            loading:false
        }
    }

    async componentDidMount() {
        this.props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})        
        let res = await fetch(url);
        this.props.setProgress(30);
        let data = await res.json();
        this.props.setProgress(50);
        this.setState({
            articles: data.articles,
            totalResults: data.totalResults,
            loading:false
        });
        this.props.setProgress(100);
    }

    capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    fetchMoreData = async() => {
        this.setState({
            page:this.state.page+1,
        });
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        let res = await fetch(url);
        let data = await res.json();
        this.setState({
            articles:this.state.articles.concat(data.articles),
        })
    };

    render() {
        document.title = `${this.capitalize(this.props.category)} - News24`;
        return (
            <div className='container my-3'>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Loading />}
                    >
                <div className='row mx-5'>
                    <h2 className='text-center'>{`News24 - Top ${this.capitalize(this.props.category)} Headlines`}</h2>
                        {this.state.loading && <Loading/>}
                        {
                            this.state.articles.map(element => {
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
}