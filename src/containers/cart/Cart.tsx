import React from 'react';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CartItem from 'components/cartItem/CartItem';
import { CartItemType } from 'containers/items/ItemsContainer';
import emptyShoppingCart from 'icons/emptyShoppingCart.png';
import styles from './Cart.module.scss';

interface CartProps {
  cartItems: CartItemType[];
  addToCart: (item: CartItemType) => void;
  removeFromCart: (itemId: number) => void;
  onClose: () => void;
}

interface CloseButtonProps {
  onClick: () => void;
}

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

const CloseButton: React.FC<CloseButtonProps> = (props) => {
  const { onClick } = props;
  return (
        <IconButton onClick={onClick}>
            <CloseIcon />
        </IconButton>
  );
};

const Cart: React.FC<CartProps> = (props) => {
  const {
    cartItems, addToCart, removeFromCart, onClose,
  } = props;

  const getTotal = (items: CartItemType[]) => items.reduce((accum, item) => {
    const { amount, price } = item;
    return accum + amount * price;
  }, 0 as number);

  return (
      <aside className={styles.cartContainer}>
        <div className={styles.header}>
            <h2>Your shopping cart</h2>
            <CloseButton onClick={onClose} />
        </div>
          {cartItems.length === 0 ? <EmptyCart /> : null}
          {cartItems.map((item) => <CartItem
              key={item.id}
              item={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
          />)}
          {cartItems.length > 0 && <h2>{`Total: $${getTotal(cartItems).toFixed(2)}`}</h2>}
      </aside>
  );
};

export default Cart;
