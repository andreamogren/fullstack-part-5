import React, { useState, useEffect, useReducer } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import AddBlogForm from './components/AddBlogForm'
import blogService from './services/blogs' 
import loginService from './services/login'
import useField from './hooks'

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
  const usernameFields = useField('text')
  const passwordFields = useField('password')
  const [user, setUser] = useState(null)
  const username = usernameFields.value
  const password = passwordFields.value

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')

    if (loggedUserJSON) {
      const loggedInUser = JSON.parse(loggedUserJSON)
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
    }
  }, [])

  const blogFormRef = React.createRef()

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
    blogFormRef.current.toggleVisibility()  
    const blogObject = {
      title: userInput.title,
      author: userInput.author,
      url: userInput.url,
      userId: user.id
    }

    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
      })
    setUserInput({'title': '', 'author': '', 'url': ''})
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userCredentials = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(userCredentials))

      blogService.setToken(userCredentials.token)
      setUser(userCredentials)
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
        <input {...usernameFields}/>
      </div>
      <div>
        Password:
        <input {...passwordFields}/> 
      </div>
      <button type="submit">Login</button>
    </form>
  )
  
  const blogForm = () => (
    <AddBlogForm
      addBlog={addBlog}
      handleBlogChange={handleBlogChange}
      userInput={userInput}
    />
  )

  return (
    <div>
      <h1>Blogs</h1>
      {user === null ?
        loginForm() : 
        <div>
          <p>{user.name} logged in</p>
          <button type="submit" onClick={logOut}>Log out</button>
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
          {blogForm()}
          </Togglable>
        </div>
      }
      <ul>
        {rows()}
      </ul>
    </div>
  )
}

export default App 