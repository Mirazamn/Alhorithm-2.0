import Blog from './components/Blog/component'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/component'
import NewArticle from './components/NewArticle/component'
import Article, { ArticleTemplate } from './components/Article/component'
import { Login, SignUp } from './components/Register & Login/component'

function App() {
  const [SearchValue, setSearchValue] = useState('')

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout SearchValue={setSearchValue}/>}>
            <Route index element={<Blog SearchValue={SearchValue}/>}/>
            <Route path="/new" element={<NewArticle/>}/>
            <Route path='article/:id' element={<Article/>}/>
            <Route path='article/:id/edit' element={<ArticleTemplate />}/>
          </Route>
          <Route path='log-in' element={<Login/>} />
          <Route path='sign-up' element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App