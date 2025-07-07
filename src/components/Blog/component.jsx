import Card from '../Card/component';
import { useEffect, useState } from 'react';
import './style.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function Blog({ SearchValue, articleTemplate }) {
  const [articles, setArticles] = useState([])

  const navigate = useNavigate();

  useEffect(()=> {
    axios
      .get("https://6864005688359a373e972948.mockapi.io/Posts")
      .then((res) => {
      setArticles(res.data)
      console.log('setArticles:', res.data);
    })}, [])

    useEffect(()=> {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })


  const DeletePost = (id) => {
    axios
      .delete(`https://6864005688359a373e972948.mockapi.io/Posts/${id}`)
      .then(()=> setArticles(prev => prev.filter(article => article.id !== id)))
      .catch((error) => alert('Error deleting post: ' + error))
  }

  const sortedArticles = [...articles].sort((a, b) => b.Likes - a.Likes);

  if (articles.length == 0) {
    return (
      <section className='main'>
      <div className="container">
        <div className="topBar flex">
          <h3>All Articles</h3>
          <Link className='new' to="/new">+</Link>
        </div>
      </div>
      <div className="container cards flex">
        {[...Array(10)].map((_, index) => {
          return (
            <Stack className='skeleton' key={index} spacing={2}>
              {/* For variant="text", adjust the height via font-size */}
              {/* <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> */}
            
              {/* For other variants, adjust the size with `width` and `height` */}
              <Skeleton variant="rectangular" width="80vw" height={30} />
              <Skeleton variant="rounded" width="80vw" height={60} />
            </Stack>
          )
        })}
      </div>
    </section>
    )
  }

  return (
    <section className='main'>
      <div className="container">
        <div className="topBar flex">
          <h3>All Articles</h3>
          <Link className='new' to="/new">+</Link>
        </div>
      </div>
      <div className="container cards flex">
        {sortedArticles.filter(article => article.Title.toLowerCase().includes(SearchValue.toLowerCase()))
        .map((article)=> {
          return ( 
              <Card 
                id={article.id} 
                key={article.id} 
                title={article.Title} 
                author={article.author}
                date={article.date}
                paragraph={article.paragraph}
                likes={article.Likes}
                onSelect={(id, value) => {
                  if (value === 'delete') {
                    console.log('ID:', id);
                    DeletePost(article.id);
                  } else if (value === 'edit') {
                    navigate(`/article/${article.id}/edit`);
                  }
                }}/>
          )})}
      </div>
    </section>
  )
}

export default Blog;