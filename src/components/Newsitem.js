import React from 'react'
import '../NewsItem.css'

const Newsitem = (props) => {
    let { title, description, imageUrl, newsUrl, author, publishedAt, name } = props;
    return (
        <div className='my-3'>
            <div className="card">
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title" id='title'>{title}</h5>
                    <p className="card-text" id='description'>{description}</p>
                    <p className="card-text" id=""><small className="text-muted">By {author}<br />on {new Date(publishedAt).toGMTString()}</small></p>
                    <div className='d-flex justify-content-between'>
                        <a href={newsUrl} className="btn btn-primary">Read More</a>
                        <p className="source">{name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Newsitem