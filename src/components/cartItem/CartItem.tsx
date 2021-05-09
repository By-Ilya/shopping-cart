import React from 'react';
import { Button } from '@material-ui/core';
import { CartItemType } from 'containers/items/ItemsContainer';
import styles from './CartItem.module.scss';

type CartItemProps = {
  key: number;
  item: CartItemType,
  addToCart: (item: CartItemType) => void;
  removeFromCart: (itemId: number) => void;
};

type AddToCartButtonProps = {
  item: CartItemType;
  onAdd: (item: CartItemType) => void;
};

type RemoveFromCartProps = {
  itemId: number;
  onRemove: (itemId: number) => void;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = (props) => {
  const { item, onAdd } = props;
  return (
        <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => onAdd(item)}
        >
            +
        </Button>
  );
};

const RemoveFromCartButton: React.FC<RemoveFromCartProps> = (props) => {
  const { itemId, onRemove } = props;
  return (
        <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => onRemove(itemId)}
        >
            -
        </Button>
  );
};

const CartItem: React.FC<CartItemProps> = (props) => {
  const {
    key, item, addToCart, removeFromCart,
  } = props;
  const {
    id, title, price, amount, image,
  } = item;

  const getTotalForItem = () => (amount * price).toFixed(2);

  return (
      <div key={id} className={styles.cartItemContainer}>
          <div>
            <h3>{title}</h3>
            <div className={styles.itemInfo}>
                <p>{`Price: $${price}`}</p>
                <p>{`Total: $${getTotalForItem()}`}</p>
            </div>
            <div className={styles.buttonsContainer}>
                <RemoveFromCartButton
                    itemId={id}
                    onRemove={removeFromCart}
                />
                <p>{amount}</p>
                <AddToCartButton
                    item={item}
                    onAdd={addToCart}
                />
            </div>
          </div>
          <img src={image} alt={title} />
      </div>
  );
};

export default CartItem;
