import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { updateCart } from '../../../actions/cart'
import './index.scss';

class RemoveFromCartBtn extends Component {
    removeFromCart() {
        let { actions, user, productObj } = this.props;
        let cart = JSON.parse(JSON.stringify(user.carts));
        let cartId = cart.id;
        console.log("remove from cart called");
        console.log(cart);
        /*cart.products.map((product) => {
            if (product.productDetails) {
                delete product.productDetails;
            }
            return product;
        });*/
        cart.products = cart.products.filter(function (item) {
            return item.product !== productObj.product;
        });
        console.log(cart);
        delete cart.id;
        actions.updateCart(cartId, cart);
    }
    render() {
        return (
            <p className="remove-from-cart" onClick={(e) => this.removeFromCart()}>Remove from cart <span className="oi oi-circle-x"></span></p>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    // ... computed data from state and optionally ownProps
    cart: state.cart,
    user: state.user
})
const mapDispatchToProps = dispatch => ({
    // ... normally is an object full of action creators
    actions: bindActionCreators({ updateCart }, dispatch)
})
// `connect` returns a new function that accepts the component to wrap:
const connectToStore = connect(
    mapStateToProps,
    mapDispatchToProps
)

export default connectToStore(RemoveFromCartBtn);


