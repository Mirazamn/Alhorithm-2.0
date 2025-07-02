import { useParams } from 'react-router-dom';
import './style.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Article() {
  const { id } = useParams()
  const [posts, setPosts] = useState([])

  useEffect(()=> {
    axios
      .get('https://6864005688359a373e972948.mockapi.io/Posts')
      .then(res => {
        console.log("Fetched posts:", res.data); // <-- bu
        console.log("URL id:", id); // <-- bu
        setPosts(res.data)
      })
  }, [])

  const article = posts.find(a => Number(a.id) === Number(id))

  if (!article) {
    return (
      <Box className="Loader" sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (  
    <div key={article.id} className="container article flex">
     <h1>{article.Title}</h1>
     <p>{article.paragraph}</p> 
    </div>
  )
}

export default Article;




















export function ArticleTemplate() {
  const { id } = useParams()
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [paragraph, setParagraph] = useState('');
  
  useEffect(()=> {
    axios
    .get('https://6864005688359a373e972948.mockapi.io/Posts')
    .then(res => {
      console.log("Fetched posts:", res.data); // <-- bu
      console.log("URL id:", id); // <-- bu
      setPosts(res.data)
    })
  }, [])
  
  const article = posts.find(a => Number(a.id) === Number(id))

  useEffect(() => {
    if (article) {
      setTitle(article.Title);
      setParagraph(article.paragraph);
    }
  }, [article]);

  if (!article) {
    return (
      <Box className="Loader" sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

  const OnTitleChange = (e) => {
    const updatedValue = e.target.value
    setTitle(updatedValue)
  }


  const OnParagraphChange = (e) => {
    const updatedValue = e.target.value 
    setParagraph(updatedValue)
  }


  const ChangeArticle = () => {
    axios
      .put(`https://6864005688359a373e972948.mockapi.io/Posts/${id}`, {
        Title: title,
        paragraph: paragraph
      })
      .then(() => {
        alert("Article Updated!");
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Error");
      });
  }

  return (
    <div key={article.id} className="container article flex">
      <h1 className='heading'>You can change the article, here</h1>
      <input 
        type='text' 
        className='title'
        placeholder='Empty title' 
        value={title} 
        onChange={OnTitleChange}/>

      <textarea 
        value={paragraph} 
        className='paragraph'
        onChange={OnParagraphChange} 
        placeholder='Empty Paragraph'/>

      <div className="btn">
        <button onClick={ChangeArticle}>Submit Changes</button>
      </div>
    </div>
  )
}