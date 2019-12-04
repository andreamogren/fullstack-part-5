import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs' 
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [newBlog, setNewBlog] = useState('') 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  const rows = () => blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
      toggleImportance={() => toggleImportanceOf(blog.id)}
    />
  )
  
  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      user: newBlog,
      title: new Date().toISOString(),
      author: Math.random() > 0.5,
      likes: blogs.length + 1,
    }

    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setNewBlog('')
      })
  }

  const toggleImportanceOf = id => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, important: !blog.important }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })      
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      alert('Wrong credentials')
    }
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
      <input
        value={newBlog} 
        onChange={handleBlogChange}
      />
      <button type="submit">save</button>
    </form>
  )

  return (
    <div>
      <h1>Blogs</h1>
      {user === null ?
        loginForm() : 
        <div>
          <p>{user.name} logged in</p>
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