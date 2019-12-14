import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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

    console.log(likesDiv)

    expect(contentDiv).toHaveTextContent("It's almost Christmas!")
    expect(contentDiv).toHaveTextContent("Santa")
    expect(likesDiv).tohaveTextContent(1)
})