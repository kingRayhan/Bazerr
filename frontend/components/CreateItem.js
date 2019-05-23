import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import Form from './styles/Form'
import ImagePreview from './styles/ImagePreview'
import axios from 'axios'
import formatMoney from '../lib/formatMoney'
import Error from './ErrorMessage'
import { cloudinaryEndpoint } from '../config'

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        createItem(
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

class CreateItem extends Component {
    state = {
        title: '',
        description: '',
        image: '',
        largeImage: '',
        price: '',
        loading: false,
    }
    handleChange = e => {
        const { name, type, value } = e.target
        const InputValue = type === 'number' ? parseFloat(value) : value
        this.setState({ [name]: InputValue })
    }
    handleCreateItem = async mutation => {
        const {
            data: {
                createItem: { id },
            },
        } = await mutation()

        Router.push({
            pathname: '/item',
            query: { id },
        })
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
    render() {
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {(mutation, { loading, error }) => {
                    // Fix error messages
                    return (
                        <Form
                            method="post"
                            onSubmit={e => {
                                e.preventDefault()
                                this.handleCreateItem(mutation)
                            }}
                        >
                            <fieldset
                                disabled={loading || this.state.loading}
                                aria-busy={
                                    loading || this.state.loading ? true : false
                                }
                            >
                                <Error error={error} />
                                {this.state.largeImage && (
                                    <ImagePreview>
                                        <img
                                            src={this.state.largeImage}
                                            alt="preview"
                                        />
                                    </ImagePreview>
                                )}

                                <label htmlFor="image">
                                    Item Image
                                    <input
                                        type="file"
                                        onChange={this.handleImageUpload}
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
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                    />
                                </label>
                                <button type="submit">Submit</button>
                            </fieldset>
                        </Form>
                    )
                }}
            </Mutation>
        )
    }
}

export default CreateItem
export { CREATE_ITEM_MUTATION }
