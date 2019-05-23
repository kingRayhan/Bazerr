import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import swal from 'sweetalert'
import gql from 'graphql-tag'
import { GET_ALL_ITEMS } from './Items'

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!) {
        deleteItem(id: $id) {
            id
        }
    }
`

class DeleteItem extends Component {
    handleMutation = mutation => {
        swal({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(async willDelete => {
            if (willDelete) {
                await mutation()
                swal('Your item has been deleted!', {
                    icon: 'success',
                })
            } else {
                swal('Your item is safe!')
            }
        })
    }
    handleCacheUpdate = (cache, result) => {
        const id = result.data.deleteItem.id
        const { items } = cache.readQuery({ query: GET_ALL_ITEMS })
        cache.writeQuery({
            query: GET_ALL_ITEMS,
            data: { items: items.filter(item => item.id !== id) },
        })
    }
    render() {
        return (
            <Mutation
                mutation={DELETE_ITEM_MUTATION}
                variables={{ id: this.props.itemId }}
                update={this.handleCacheUpdate}
            >
                {(mutation, { data }) => {
                    return (
                        <button onClick={() => this.handleMutation(mutation)}>
                            {this.props.children || 'Delete'}
                        </button>
                    )
                }}
            </Mutation>
        )
    }
}
export default DeleteItem
export { DELETE_ITEM_MUTATION }
