import './style.css'
import Logo from '../../assets/parlare.svg'

import { FaUserCircle } from 'react-icons/fa';
import { IoIosSearch } from "react-icons/io";
import { IoMoon, IoSunnySharp } from "react-icons/io5";
import { useState } from 'react';
import { RiMenu3Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';


function Header({ SearchValue }) {
    const [mode, SetMode] = useState('light')
    const [search, setSeach] = useState('')

    const SearchChange = (e) => {
        const Value = e.target.value
        setSeach(Value);
        SearchValue(search)
    }


  return (
    <header>
        <div className="container flex">
            <Link className='logo' to={`/`}><img src={Logo} alt="Logo" width="250px" /></Link>
            
            <div className="flex wrapper">
                <div className="input-field flex">
                    <input type="text" name="" id="" placeholder='Search...' value={search} onChange={SearchChange}/>
                    <IoIosSearch className='icon'/>
                </div>
                <RiMenu3Fill className='menu'/>
            </div>

            <div className='flex center'>
                <div className="mode">
                    {mode === 'light' ? <IoMoon onClick={()=> SetMode('dark')}/>: <IoSunnySharp onClick={()=> SetMode('light')}/>}
                </div>

                <div className="user-profile flex">
                    <FaUserCircle className='icon'/>
                    <div className="txt">
                        <h5>User</h5>
                        <h6>13.06.2000</h6>
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header;