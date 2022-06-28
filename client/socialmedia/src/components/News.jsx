import React from 'react'

const News = ({news}) => {
  return (
    <div className='news'>
        <h2>{news.articles.title}</h2>
        <h2>{news.articles.author}</h2>
        <h2>{news.articles.description}</h2>
        {/* <h2>{news.author}</h2>
        <h2>{news.url}</h2> */}
        {/* <h2>{news.urlToImage}</h2> */}






    </div>
  )
}

export default News
