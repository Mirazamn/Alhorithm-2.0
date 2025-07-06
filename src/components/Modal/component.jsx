import { useNavigate } from 'react-router-dom'
import './style.css'
import { IoCloseSharp } from "react-icons/io5";

function Modal({ onOpen, onClose, onLogout }) {
    if (!onOpen) return null
    const navigate = useNavigate()

    return (
      <section className="modal">
          <div className="container flex">
              <button className='close' onClick={onClose}><IoCloseSharp/></button>
              <button 
                className='log-out' 
                onClick={() => {
                localStorage.removeItem('username')
                navigate('/sign-up')}}>Log out</button>
          </div>
      </section>
    )
}

export default Modal;