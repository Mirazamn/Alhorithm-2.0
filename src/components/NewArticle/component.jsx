import { useEffect, useState } from 'react';
import './style.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

function NewArticle() {
  const [title, setTitle] = useState('')
  const [paragraph, setParagraph] = useState('')
  const [data, setData] = useState([])
  const localUser = localStorage.getItem('username')

  // Date
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1
  const year = today.getFullYear()

  useEffect(()=> {
    axios
      .get("https://6864005688359a373e972948.mockapi.io/Posts")
      .then((res) => setData(res.data))
  }, [])

    const article = {
      "Title": title,
      "paragraph": paragraph,
      "author": localUser,
      "Likes": 0,
      "date": `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}`: month}.${year}`
    }

    const TitleChange = (e) => {
      const NewTitle = e.target.value 
      setTitle(NewTitle)
    }

    const ParagraphChange = (e) => {
      const NewParagraph = e.target.value 
      setParagraph(NewParagraph)
    }


    const PostData = () => {
      fetch('https://6864005688359a373e972948.mockapi.io/Posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(article)
      })
      .then((res) => res.json())
      .then((res) => alert("Your Article Posted Succcessfully🥳🥳🥳"))
      .catch(Error => alert(Error));
    }


  return (
    <main className='NewArticle'>
        <div className="contaianer flex">
            <h1>
              <input type="text" className='title'  value={title} onChange={TitleChange} placeholder='Title here'/>
            </h1>
            <p>
              <textarea rows="1" className="paragraph" value={paragraph} onChange={ParagraphChange} placeholder='Paragraph here'></textarea>
            </p>
            <div className="btn">
              <Link to="/" className='white' onClick={()=> PostData()}><button>Done</button></Link>
            </div>
        </div>
    </main>
  )
}

export default NewArticle;