import React, { Component } from 'react'
import { Newsitem } from './Newsitem'
import defaultImage from "./android-chrome-192x192.png"
import { Loading } from './Loading'
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country:'in',
        pageSize:8,
        category:'general'
    }

    static propTypes = {
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            page:1,
            totalResults:0,
            loading:false
        }
    }
    
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=919f61ed78d646ea93646c4e1e67a5a4&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let res = await fetch(url);
        let data = await res.json();
        this.setState({
            articles: data.articles,
            totalResults:data.totalResults,
            loading:false
        });
    }

    previousPage = async() =>{
        let url=`https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=919f61ed78d646ea93646c4e1e67a5a4&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let res=await fetch(url);
        let data=await res.json();
        this.setState({
            page:this.state.page-1,
            articles:data.articles,
            loading:false
        })
    }

    nextPage = async() => {
        if(this.state.page<Math.ceil(this.state.totalResults/this.props.pageSize))
        {
            let url=`https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=919f61ed78d646ea93646c4e1e67a5a4&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let res=await fetch(url);
            let data=await res.json();
            this.setState({
                articles:data.articles,
                page:this.state.page+1,
                loading:false
            })
        }
    }

    capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        document.title=`${this.capitalize(this.props.category)} - News24`;
        return (
            <div className='container my-3'>
                <div className='row mx-5'>
                    <h2 className='text-center'>{`News24 - Top ${this.capitalize(this.props.category)} Headlines`}</h2>
                    {this.state.loading && <Loading/>}
                    {
                        !this.state.loading && this.state.articles.map(element => {
                            return <div className='col-md-3' key={element.url}>
                                <Newsitem title={(element.title) ? element.title : " "} description={(element.content) ? element.content : element.description}
                                    imageUrl={(element.urlToImage) ? element.urlToImage : defaultImage} newsUrl={element.url}
                                    author={(element.author)?element.author:"Unknown"} publishedAt={element.publishedAt}
                                    name={element.source.name} />
                            </div>
                        })
                    }
                    {
                        !this.state.loading &&
                        <div className='container d-flex justify-content-between'>
                            <button style={{visibility:(this.state.page===1)?'hidden':'visible'}} type="button" className="btn btn-outline-dark" onClick={this.previousPage}>&larr; Previous</button>
                            <button style={{visibility:(this.state.page<Math.ceil(this.state.totalResults/this.props.pageSize))?'visible':'hidden'}} type="button" className="btn btn-outline-dark" onClick={this.nextPage}>Next &rarr;</button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}