import React, { Component } from 'react'

export default class Newsitem extends Component {

  render() {

    let { title, description, imgurl, newsUrl, author, date,source } = this.props;
    return (
      <div>
        <div className="card" style={{ width: " 18rem" }}>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger mx-auto">{source}</span>
          <img src={imgurl} className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className='card-text'><small className='text-muted'>By {!author ? "unknown" : author} On {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
