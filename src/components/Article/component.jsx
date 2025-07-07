import { Link, useNavigate, useParams } from 'react-router-dom';
import './style.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IoChevronBack } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { TextCleaner } from '../Card/component';

function Article({ onSelect }) {
  const { id } = useParams()
  const [posts, setPosts] = useState([])
  const [likes, setLikes] = useState(0)
  const [addLike, setAddLike] = useState(true)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  useEffect(()=> {
    axios
      .get('https://6864005688359a373e972948.mockapi.io/Posts')
      .then(res => {
        console.log("Fetched posts:", res.data[id - 1]);
        console.log("URL id:", id); 
        setPosts(res.data)
        setLikes(res.data[id - 1].Likes)
      })
  }, [id])

  const Like = () => {
    axios
      .put(`https://6864005688359a373e972948.mockapi.io/Posts/${id}`, {
        Likes: likes + 1
      }).then((res) => setLikes((likes + 1)))
      .then(()=> setAddLike(false))
  }

  const CancelLike = () => {
    axios
      .put(`https://6864005688359a373e972948.mockapi.io/Posts/${id}`, {
        Likes: likes - 1
      }).then(()=> setLikes((likes - 1)))
      .then(()=> setAddLike(true))
  }

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
      <header>
        <Link className='icon' to={`/`}><IoChevronBack /></Link>
      </header>

      <p className='details'><em>@{article.author}</em> - <span>{article.date}</span></p>
      <h1>{article.Title}</h1>
      <p>{article.paragraph}</p>
      <p 
      className='flex likes' 
      style={{ alignItems: 'center', gap: '5px'}}>

          <FaHeart 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              color: hovered ? 'red' : 'black',
              cursor: 'pointer'
            }}
            onClick={() => {
              setHovered(true)
              if (addLike) {
                Like()
              } else {
                CancelLike()
              }
            }}
            className="icon"/>

          {likes}
      </p>

      <div className='articles-wrapper'>
        <h1>Ohshash Postlar</h1>
        <div className="other-articles flex">
           {posts.filter(post => Number(post.id) !== Number(id)).map((post)=> {
             return (
               <Link to={`/article/${post.id}`} key={post.id} className="other-card">
                   <p className='details'><em>@{post.author}</em><span> - {post.date}</span></p>
                   <h2>{post.Title}</h2>
                   <p>{TextCleaner(post.paragraph).length > 30 ? <>{TextCleaner(post.paragraph).slice(0, 30).join(" ")}...<span className='more'>More</span></> : post.paragraph}</p>
               </Link>
            )})}
         </div> 
      </div>
    </div>
  )
}

export default Article;


export function ArticleTemplate() {
  const { id } = useParams()
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [paragraph, setParagraph] = useState('');
  const navigate = useNavigate()
  
  useEffect(()=> {
    axios
    .get('https://6864005688359a373e972948.mockapi.io/Posts')
    .then(res => {
      console.log("Fetched posts:", res.data);
      console.log("URL id:", id);
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
     // Date
    const today = new Date();

    const day = today.getDate();
    const month = today.getMonth() + 1
    const year = today.getFullYear()

    axios
      .put(`https://6864005688359a373e972948.mockapi.io/Posts/${id}`, {
        Title: title,
        paragraph: paragraph,
        date: `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}`: month}.${year}`
      })
      .then(() => {
        alert("Article Updated!");
        navigate('/')
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