import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import axios from 'axios'
import Form from './styles/Form'
import ImagePreview from './styles/ImagePreview'
import formatMoney from '../lib/formatMoney'
import Error from './ErrorMessage'
import { cloudinaryEndpoint } from '../config'

const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
        $id: ID!
        $title: String
        $description: String
        $price: Int
        $image: String
        $largeImage: String
    ) {
        updateItem(
            id: $id
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
        }
    }
`

const ITEM_QUERY = gql`
    query ITEM_QUERY($id: ID!) {
        item(where: { id: $id }) {
            title
            description
            price
            image
            largeImage
        }
    }
`

class UpdateItem extends Component {
    state = {
        title: undefined,
        description: undefined,
        image: undefined,
        largeImage: undefined,
        price: undefined,
        loading: false,
    }
    handleChange = e => {
        const { name, type, value } = e.target
        const InputValue = type === 'number' ? parseFloat(value) : value
        this.setState({ [name]: InputValue })
    }
    handleImageUpload = async e => {
        this.setState({ loading: true })
        const fd = new FormData()
        fd.append('file', e.target.files[0])
        fd.append('upload_preset', 'item-image')
        const {
            data: {
                eager: [{ secure_url: image }, { secure_url: largeImage }],
            },
        } = await axios.post(cloudinaryEndpoint, fd)

        this.setState({
            image,
            largeImage,
            loading: false,
        })
    }
    handleMutation = async mutation => {
        const {
            data: {
                updateItem: { id },
            },
        } = await mutation()

        Router.push({
            pathname: '/item',
            query: { id },
        })
    }
    render() {
        return (
            <Query query={ITEM_QUERY} variables={{ id: this.props.itemId }}>
                {({
                    data: {
                        item: { title, description, price, largeImage },
                    },
                    loading,
                    error,
                }) => {
                    if (loading) return <p>Loading...</p>
                    return (
                        <Mutation
                            mutation={UPDATE_ITEM_MUTATION}
                            variables={{
                                ...this.state,
                                id: this.props.itemId,
                            }}
                        >
                            {(mutation, { loading, error }) => {
                                return (
                                    <Form
                                        method="post"
                                        onSubmit={e => {
                                            e.preventDefault()
                                            this.handleMutation(mutation)
                                        }}
                                    >
                                        <fieldset
                                            disabled={
                                                loading || this.state.loading
                                            }
                                            aria-busy={
                                                loading || this.state.loading
                                                    ? true
                                                    : false
                                            }
                                        >
                                            <Error error={error} />
                                            {(this.state.largeImage ||
                                                largeImage) && (
                                                <ImagePreview>
                                                    <img
                                                        src={
                                                            this.state
                                                                .largeImage ||
                                                            largeImage
                                                        }
                                                        alt="preview"
                                                    />
                                                </ImagePreview>
                                            )}
                                            <label htmlFor="image">
                                                Item Image
                                                <input
                                                    type="file"
                                                    onChange={
                                                        this.handleImageUpload
                                                    }
                                                />
                                            </label>
                                            <label htmlFor="title">
                                                Title
                                                <input
                                                    type="text"
                                                    id="title"
                                                    name="title"
                                                    placeholder="Title"
                                                    required
                                                    value={this.state.title}
                                                    defaultValue={title}
                                                    onChange={this.handleChange}
                                                />
                                            </label>
                                            <label htmlFor="price">
                                                Price
                                                <input
                                                    type="number"
                                                    id="price"
                                                    name="price"
                                                    placeholder="Price"
                                                    required
                                                    value={this.state.price}
                                                    defaultValue={price}
                                                    onChange={this.handleChange}
                                                />
                                            </label>
                                            <label htmlFor="description">
                                                Description
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    placeholder="Enter A Description"
                                                    required
                                                    value={
                                                        this.state.description
                                                    }
                                                    defaultValue={description}
                                                    onChange={this.handleChange}
                                                />
                                            </label>
                                            <button type="submit">
                                                Submit
                                            </button>
                                        </fieldset>
                                    </Form>
                                )
                            }}
                        </Mutation>
                    )
                }}
            </Query>
        )
    }
}

export default UpdateItem
export { UPDATE_ITEM_MUTATION, ITEM_QUERY }
