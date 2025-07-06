import './style.css'
import Logo from '../../assets/alhorethm.svg'

import { FaUserCircle } from 'react-icons/fa';
import { IoIosSearch } from "react-icons/io";
import { IoMoon, IoSunnySharp } from "react-icons/io5";
import { useEffect, useState } from 'react';
import { RiMenu3Fill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import axios from 'axios';


function Header({ SearchValue }) {
    const [mode, SetMode] = useState('light')
    const [search, setSeach] = useState('')
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const localUser = localStorage.getItem('username');

    if (!localUser) {
        navigate('/sign-up');
    }

    useEffect(() => {
        axios
            .get('https://6868e3e1d5933161d70cc045.mockapi.io/users')
            .then((res) => setUsers(res.data))
    }, []);

    const user = users.find((object) => object.username === localUser);

    if (!user) {
        console.log('loading')
    }


    // onSearchValue Change
    const SearchChange = (e) => {
        const Value = e.target.value
        setSeach(Value);
        SearchValue(Value)
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
                    {!user ? 
                    (<span>
                        <Skeleton width={70} /> 
                        <Skeleton width={40} />                             
                    </span> ) : 
                    (
                    <div className="txt">
                        <h5>{user?.name}</h5>
                        <h6>@{user?.username}</h6>
                    </div>)}
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header;