import React from 'react'
import SingleItem from '../components/SingleItem'

const item = ({ query: { id } }) => {
    return (
        <div>
            <SingleItem itemId={id} />
        </div>
    )
}

export default item
