import React, { Component } from 'react'

import Link from 'next/link'
import Title from './styles/Title'
import ItemStyles from './styles/ItemStyles'
import PriceTag from './styles/PriceTag'
import formatMoney from '../lib/formatMoney'
import DeleteItem from './DeleteItem'
// import AddToCart from './AddToCart'

export default class Item extends Component {
    render() {
        const { id, title, image, price, description } = this.props
        return (
            <ItemStyles>
                {image && <img src={image} alt={title} />}

                <Title>
                    <Link
                        href={{
                            pathname: '/item',
                            query: { id },
                        }}
                    >
                        <a>{title}</a>
                    </Link>
                </Title>
                <PriceTag>{formatMoney(price)}</PriceTag>
                <p>{description}</p>

                <div className="buttonList">
                    <Link
                        href={{
                            pathname: 'update',
                            query: { id },
                        }}
                    >
                        <a>Edit ✏️</a>
                    </Link>
                    <DeleteItem itemId={id} />
                    {/* <AddToCart id={item.id} />
                    <DeleteItem id={item.id}>Delete This Item</DeleteItem> */}
                </div>
            </ItemStyles>
        )
    }
}
