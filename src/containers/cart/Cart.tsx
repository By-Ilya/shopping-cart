import React from 'react';
import CartItem from 'components/cartItem/CartItem';
import { CartItemType } from 'containers/items/ItemsContainer';
import emptyShoppingCart from 'icons/emptyShoppingCart.png';

import styles from './Cart.module.scss';

type CartProps = {
  cartItems: CartItemType[];
  addToCart: (item: CartItemType) => void;
  removeFromCart: (itemId: number) => void;
};

const EmptyCart: React.FC = () => (
    <div className={styles.emptyCart}>
        <img
            src={emptyShoppingCart}
            alt="Empty shopping cart"
            className={styles.icon}
        />
        <p>No items yet</p>
    </div>
);

const Cart: React.FC<CartProps> = (props) => {
  const { cartItems, addToCart, removeFromCart } = props;

  const getTotal = (items: CartItemType[]) => items.reduce((accum, item) => {
    const { amount, price } = item;
    return accum + amount * price;
  }, 0 as number);

  return (
      <aside className={styles.cartContainer}>
        <h2>Your shopping cart</h2>
          {cartItems.length === 0 ? <EmptyCart /> : null}
          {cartItems.map((item) => <CartItem
              key={item.id}
              item={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
          />)}
          {cartItems.length > 0 && <h2>{`Total: $${getTotal(cartItems)}`}</h2>}
      </aside>
  );
};

export default Cart;
