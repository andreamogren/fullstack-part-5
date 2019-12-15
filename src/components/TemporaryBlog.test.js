import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TemporaryBlog from './TemporaryBlog'

test('renders content', () => {
    const blogContent = {
        title: "It's almost Christmas!", 
        author: "Santa",
        likes: 1,
    }

    const component = render(
        <TemporaryBlog blog={blogContent}/>
    )
    
    const contentDiv = component.container.querySelector('.content')
    const likesDiv = component.container.querySelector('.likes')

    expect(contentDiv).toHaveTextContent("It's almost Christmas!")
    expect(contentDiv).toHaveTextContent("Santa")
    expect(likesDiv).toHaveTextContent(1)
})

test('clicking the button twice calls the event handler twice', () => {
    const blogContent = {
        title: "It's almost Christmas!", 
        author: "Santa",
        likes: 1,
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
        <TemporaryBlog blog={blogContent} onClick={mockHandler}/>
    )
    
    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})