import { useNavigate } from 'react-router-dom'
import './style.css'
import { IoCloseSharp } from "react-icons/io5";
import axios from 'axios';
import { useEffect, useState } from 'react';

function Modal({ onOpen, onClose, onLogout }) {
    if (!onOpen) return null
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    const LocalUser = localStorage.getItem('username')
    const user = posts.find((post) => post.username === LocalUser)

    useEffect(() => {
      axios
        .get('https://6868e3e1d5933161d70cc045.mockapi.io/users')
        .then((res) => setPosts(res.data))
    }, [])

    const DeleteAccount = () => {
      axios
        .delete(`https://6868e3e1d5933161d70cc045.mockapi.io/users/${user.id}`)
        .then(()=> {localStorage.removeItem('username'); navigate('/sign-up')})
        .then(() => alert('Account deleted Succesfull!'))
        .catch(() => alert('Error!'))
    }

    return (
      <section className="modal">
          <div className="container flex">
              <button className='close' onClick={onClose}><IoCloseSharp/></button>
            <main>
              <button 
                className='log-out' 
                onClick={() => {
                localStorage.removeItem('username')
                navigate('/sign-up')}}>Log out</button>
              <button
                className='delete'
                onClick={DeleteAccount}>Delete Account</button>
            </main>
          </div>
      </section>
    )
}

export default Modal;