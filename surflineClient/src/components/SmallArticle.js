import React from 'react'

export default function SmallArticle(props) {
  return (
    <div className="small-article">
      <a href={props.link}>
        <div href={props.link} className="img-wrap">
          <img src={props.img} alt="ff"/>
          <div className="small-info">
            {props.title}
          </div>
        </div>
      </a>
      <div className="info">
        <div className="title">
          {props.title}
        </div>
        <p>
          {props.summary}
        </p>
        <div className="type">
          {props.type}
        </div>
      </div>
    </div>
  )
}
