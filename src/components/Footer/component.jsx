import { FaInstagram, FaYoutube } from 'react-icons/fa';
import './style.css'

function Footer() {
  return (
    <footer>
        <div className="container flex">
            <h6> &copy; 2025 Mirazam. All rights reserved.</h6>

            <div className="social flex">
                <FaYoutube className='icon'/>
                <FaInstagram className='icon' id='instagram'/>
            </div>
        </div>
    </footer>
  )
}

export default Footer;