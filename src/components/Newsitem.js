import React,{Component} from 'react'
import '../NewsItem.css'

export class Newsitem extends Component{
    render(){
        let {title,description,imageUrl,newsUrl,author,publishedAt,name}=this.props;
        return(
            <div className='my-3'>
                <div className="card" style={{width: "18rem"}}>
                    <img src={imageUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title" id='title'>{title}</h5>
                            <p className="card-text" id='description'>{description}</p>
                            <p className="card-text"><small className="text-muted">By {author}<br/>on {new Date(publishedAt).toGMTString()}</small></p>
                            <div className='d-flex justify-content-between'>
                                <a href={newsUrl} className="btn btn-primary">Read More</a>
                                <p style={{fontSize:"12px",paddingTop:"20px",margin:0}}>{name}</p>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}