import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Item from './Item'
const Center = styled.div`
    text-align: center;
`

const ItemsList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
`

const GET_ALL_ITEMS = gql`
    query GET_ALL_ITEMS {
        items {
            id
            title
            description
            image
            largeImage
            price
        }
    }
`

const Items = () => {
    return (
        <Center>
            <ItemsList>
                <Query query={GET_ALL_ITEMS}>
                    {({ data, loading, error }) => {
                        if (loading) return <h3>Loading</h3>
                        return data.items.map(item => (
                            <Item key={item.id} {...item} />
                        ))
                    }}
                </Query>
            </ItemsList>
        </Center>
    )
}

export { GET_ALL_ITEMS }
export default Items
