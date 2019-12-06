import React, { useState, useEffect, useReducer } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs' 
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [userInput, setUserInput] = useReducer(
    (setState, newState) => ({...setState, ...newState}),
    {
      author: '',
      title: '',
      url: '',
    }
  )
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const rows = () => blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
    />
  )
  
  const handleBlogChange = (event) => {
    const name = event.target.name
    const newValue = event.target.value

    setUserInput({[name]: newValue})
  }

  const addBlog = (event) => {
    event.preventDefault()  
    const blogObject = {
      title: userInput.title,
      author: userInput.author,
      url: userInput.url,
    }
    
    console.log(blogObject)

    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
      })
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      console.log(user.token)

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      alert('Wrong credentials')
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password:
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
  
  const blogForm = () => (
    <form onSubmit={addBlog}>
      title:
      {userInput.title} 
      <input
        name="title"
        value={userInput.title} 
        onChange={handleBlogChange}
      />
      author:
      {userInput.author} 
      <input
        name="author"
        value={userInput.author} 
        onChange={handleBlogChange}
      />
      url:
      {userInput.url} 
      <input
        name="url"
        value={userInput.url} 
        onChange={handleBlogChange}
      />
      <button type="submit">Save</button>
    </form>
  )

  return (
    <div>
      <h1>Blogs</h1>
      {user === null ?
        loginForm() : 
        <div>
          <p>{user.name} logged in</p>
          <button type="submit" onClick={logOut}>Log out</button>
          {blogForm()}
        </div>
      }
      <ul>
        {rows()}
      </ul>

    </div>
  )
}

export default App 