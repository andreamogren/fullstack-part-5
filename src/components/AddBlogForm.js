import React from 'react'

const AddBlogForm = ({addBlog, handleBlogChange, author, title, url}) => (
    <form onSubmit={addBlog}>
        <label htmlFor="title">Title: </label>
        <input
        {...title}
        /><br />
        <label htmlFor="author">Author: </label>
        <input
        {...author}
        /><br />
        <label htmlFor="url">Url: </label>
        <input
        {...url}
        /><br />
        <button type="submit">Save</button>
    </form>
)

export default AddBlogForm