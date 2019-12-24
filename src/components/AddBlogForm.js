import React from 'react'

const AddBlogForm = (props) => {
    const removeProperty = prop => ({ [prop]: _, ...rest }) => rest
    const removeReset = removeProperty('resetValue')

    const titleProps = removeReset(props.title)
    const authorProps = removeReset(props.author)
    const urlProps = removeReset(props.url)

    return (
        <form onSubmit={props.addBlog}>
            <label htmlFor="title">Title: </label>
            <input
            {...titleProps}
            /><br />
            <label htmlFor="author">Author: </label>
            <input
            {...authorProps}
            /><br />
            <label htmlFor="url">Url: </label>
            <input
            {...urlProps}
            /><br />
            <button type="submit">Save</button>
        </form>
    )
}

export default AddBlogForm