import React from 'react'

const AddBlogForm = ({addBlog, handleBlogChange, userInput}) => (
    <form onSubmit={addBlog}>
        <label htmlFor="title">Title: </label>
        <input
        id="title"
        name="title"
        value={userInput.title} 
        onChange={handleBlogChange}
        /><br />
        <label htmlFor="author">Author: </label>
        <input
        id="author"
        name="author"
        value={userInput.author} 
        onChange={handleBlogChange}
        /><br />
        <label htmlFor="url">Url: </label>
        <input
        id="url"
        name="url"
        value={userInput.url} 
        onChange={handleBlogChange}
        /><br />
        <button type="submit">Save</button>
    </form>
)

export default AddBlogForm