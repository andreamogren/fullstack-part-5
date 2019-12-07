import React from 'react'

const AddBlogForm = ({addBlog, handleBlogChange, userInput}) => (
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

export default AddBlogForm