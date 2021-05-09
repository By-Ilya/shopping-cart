import React from 'react';
import { Button } from '@material-ui/core';
import { CartItemType } from 'containers/items/ItemsContainer';
import styles from './Item.module.scss';

type ItemProps = {
  item: CartItemType;
  handleAddToCart: (item: CartItemType) => void;
};

const Item: React.FC<ItemProps> = (props) => {
  const { item, handleAddToCart } = props;
  const {
    title, image, description, price,
  } = item;
  return (
    <div className={styles.itemContainer}>
        <img className={styles.itemImage} src={image} alt={title} />
        <div className={styles.itemInfo}>
            <h2>{title}</h2>
            <p>{description}</p>
            <h3>{`$${price}`}</h3>
        </div>
        <Button
            className={styles.addToCartButton}
            onClick={() => handleAddToCart(item)}
        >
            Add to cart
        </Button>
    </div>
  );
};

export default Item;
