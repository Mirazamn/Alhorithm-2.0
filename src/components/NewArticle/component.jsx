import { useEffect, useState } from 'react';
import './style.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

function NewArticle() {
  const [title, setTitle] = useState('Title here...')
  const [paragraph, setParagraph] = useState('Paragraph here...')
  const [data, setData] = useState([])

  useEffect(()=> {
    axios
      .get("https://6864005688359a373e972948.mockapi.io/Posts")
      .then((res) => setData(res.data))
  }, [])

    const article = {
      "id": data.length +1,
      "Title": title,
      "paragraph": paragraph
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
              <input type="text" className='title'  value={title} onChange={TitleChange} placeholder='Empty title'/>
            </h1>
            <p>
              <textarea rows="1" className="paragraph" value={paragraph} onChange={ParagraphChange} placeholder='Empty paragraph'></textarea>
            </p>
            <div className="btn">
              <Link to="/" className='white' onClick={()=> PostData()}><button>Done</button></Link>
            </div>
        </div>
    </main>
  )
}

export default NewArticle;