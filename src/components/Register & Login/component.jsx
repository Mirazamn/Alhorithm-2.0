import './style.css'

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import RememberMeIcon from '@mui/icons-material/RememberMe';
import ContactsIcon from '@mui/icons-material/Contacts';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [users, setUsers] = React.useState([])
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate()

    React.useEffect(()=> {
      axios
        .get('https://6868e3e1d5933161d70cc045.mockapi.io/users')
        .then((res) => setUsers(res.data))
    }, [])

    // userInfo Search
      const Enter = (event) => {
        event.preventDefault();

        const user = users.find((u) => u.username === username && u.password === password)

        if (user) {
          localStorage.setItem('username', user.username)
          navigate('/')
        } else {
          return alert('User not defined')
        }
      }


      const user = localStorage.getItem('username')

      if (user) {
        navigate('/')
      }

      // userInfo Search

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };

    return (
        <section className='register login'>
            <div className="container flex">
                <form className='form'>
                    <h1 className='title'>Log in</h1>
                    <Box 
                    component="form"
                    sx={{ display: 'flex', flexDirection: 'column',  flexWrap: 'wrap' }}
                    noValidate
                    autoComplete="off">
                        <div>
                          <TextField
                            type='text'
                            InputLabelProps={{
                                style: { color: '#fafafa' }
                            }}
                            onChange={(e) => setUsername(e.target.value)}
                            id="standard-multiline-flexible"
                            label="Username"
                            value={username}
                            variant="standard"
                            InputProps={{
                                style: { color: '#fafafa' },
                                startAdornment: (
                                  <InputAdornment position='start'>@</InputAdornment>
                                ),
                                endAdornment: (
                                      <InputAdornment position="end">
                                        <PersonIcon />
                                      </InputAdornment>
                                )
                            }}
                            style={{width: 250}}/>
                        </div>

                        <div>
                          <FormControl
                          style={{
                            width: 250, 
                            color: '#fafafa'
                            }}
                           sx={{ m: 1, width: '25ch' }} variant="standard">
                              <InputLabel 
                                style={{ color: '#fafafa' }}
                                htmlFor="standard-adornment-password">Password</InputLabel>
                              <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setPassword(e.target.value)}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                      }
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      onMouseUp={handleMouseUpPassword}
                                    >
                                      {showPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                  </InputAdornment>
                                }
                                style={{ color: '#fafafa' }}
                              />
                          </FormControl>
                        </div>
                    </Box>
                    <div className="forgot-password">
                        <h6>Forgot Password?</h6>
                    </div>
                    <button 
                      type='button'
                      className='login'
                      onClick={Enter}>Login</button>
                    <p>Don't have an account? <Link to={`/sign-up`}><span>Sign Up</span></Link></p> 
                </form>
            </div>
        </section>
  )
}



export function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [data, setData] = React.useState([])

  const [name, setName] = React.useState('')
  const [surname, setSurname] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };

    // Inputs
    const NameChange = (e) => {
      const value = e.target.value
      setName(value);
    }

    const SurnameChange = (e) => {
      const value = e.target.value
      setSurname(value)
    }

    const UsernameChange = (e) => {
      const value = e.target.value
      setUsername(value)
    }

    const PasswordChange = (e) => {
      const value = e.target.value
      setPassword(value)
    }


    React.useEffect(()=> {
      axios
      .get('https://6868e3e1d5933161d70cc045.mockapi.io/users')
      .then((res) => setData(res.data))
    }, [])
    

    const AddUser = (e) => {
      e.preventDefault();

      if (data.find(u => u.username === username)) {
        alert("This username is already taken!");
        // return;
      }
    
      const user = {
        name: name,
        surname: surname,
        username: username,
        password: password
      };
    
      fetch('https://6868e3e1d5933161d70cc045.mockapi.io/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      .then((res) => res.json())
      .then((res) => console.log('user successfully added: ', res)) 
      .then(() => {
        localStorage.setItem('username', username)
        navigate('/')})
      .catch((err) => console.log(err));

      navigate('/')
    };

    const user = localStorage.getItem('username')

    if (user) {
      navigate('/')
    }


  return (
      <section className='register signup'>
            <div className="container flex">
                    <Box 
                    onSubmit={AddUser}
                    component="form"
                    className='form'
                    sx={{ display: 'flex', flexDirection: 'column',  flexWrap: 'wrap' }}
                    autoComplete="off">
                        <h1 className='title'>Sign up</h1>
                        {/* Name */}
                        <div>
                          <TextField
                            type='text'
                            InputLabelProps={{
                                style: { color: '#fafafa' }
                            }}
                            id="standard-multiline-flexible"
                            label="Your name"
                            value={name}
                            variant="standard"
                            InputProps={{
                                style: { color: '#fafafa' },
                                endAdornment: (
                                    <InputAdornment position="end">
                                      <PersonIcon />
                                    </InputAdornment>
                                  )
                            }}
                            style={{width: 250}}
                            onChange={NameChange}
                            required/>
                        </div>
                        {/* /Name */}

                        {/* Surname */}
                        <div>
                          <TextField
                            onChange={SurnameChange}
                            type='text'
                            InputLabelProps={{
                                style: { color: '#fafafa' }
                            }}
                            id="standard-multiline-flexible"
                            label="Your Surname"
                            variant="standard"
                            value={surname}
                            InputProps={{
                                style: { color: '#fafafa' },
                                startAdornment: (
                                  <InputAdornment position='start'>@</InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                      <RememberMeIcon />
                                    </InputAdornment>
                                  )
                            }}
                            style={{width: 250}}
                            required/>
                        </div>
                        {/* /Surname */}

                        {/* Username */}
                        <div>
                          <TextField
                            type='text'
                            onChange={UsernameChange}
                            value={username}
                            InputLabelProps={{
                                style: { color: '#fafafa' }
                            }}
                            id="standard-multiline-flexible"
                            label="Username"
                            variant="standard"
                            InputProps={{
                                style: { color: '#fafafa' },
                                endAdornment: (
                                    <InputAdornment position="end">
                                      <ContactsIcon />
                                    </InputAdornment>
                                  )
                            }}
                            style={{width: 250}}
                            required/>
                        </div>
                        {/* /Username */}

                        {/* Password */}
                        <div>
                          <FormControl
                          style={{
                            width: 250, 
                            color: '#fafafa'
                            }}
                           sx={{ m: 1, width: '25ch' }} variant="standard">
                              <InputLabel 
                                style={{ color: '#fafafa' }}
                                htmlFor="standard-adornment-password">Password</InputLabel>
                              <Input
                                id="standard-adornment-password"
                                required
                                onChange={PasswordChange}
                                value={password}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                      }
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      onMouseUp={handleMouseUpPassword}
                                    >
                                      {showPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                  </InputAdornment>
                                }
                                style={{ 
                                  color: '#fafafa',
                                  width: 250 }}
                                />
                          </FormControl>
                        </div>

                        <button 
                          type='submit'
                          className='login'>Sign Up</button>
                        <p>Already have an account? <Link to={`/log-in`}><span>Log In</span></Link></p>
                        {/* /Password */}
                    </Box>
            </div>
        </section>
  )
}  
// ruscha bol simsim kuf suf 