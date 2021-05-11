import React from 'react';
import {
  AppBar, Toolbar, Avatar, Typography, Badge, IconButton,
} from '@material-ui/core';
import { CartItemType } from 'containers/items/ItemsContainer';
import fakeStoreIcon from 'icons/fakeStoreIcon.png';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import styles from './TopPanel.module.scss';

interface TopPanelProps {
  cartItems: CartItemType[];
  onClickCart: () => void;
  getTotalItems: (cartItems: CartItemType[]) => number;
}

const StoreLogo: React.FC = () => (
    <div className={styles.avatarContainer}>
        <Avatar
            variant="square"
            src={fakeStoreIcon}
            alt="FAKE store"
        />
    </div>
);

const CartIcon: React.FC<TopPanelProps> = (props) => {
  const { cartItems, onClickCart, getTotalItems } = props;

  return (
        <IconButton
            className={styles.cartButton}
            onClick={onClickCart}
        >
            <Badge
                badgeContent={getTotalItems(cartItems)}
                color="error"
            >
                <AddShoppingCartIcon />
            </Badge>
        </IconButton>
  );
};

const TopPanel: React.FC<TopPanelProps> = (props) => {
  const { cartItems, onClickCart, getTotalItems } = props;
  return (
    <AppBar position="fixed">
        <Toolbar className={styles.toolbarHeader}>
            <StoreLogo />
            <div className={styles.headerText}>
                <Typography variant="h6" noWrap className={styles.name}>
                    FAKE store
                </Typography>
                <p className={styles.copyright}>
                    Produced with
                    {' '}
                    <a href="https://fakestoreapi.com/">Fake Store API</a>
                </p>
            </div>
            <div className={styles.grow} />
            <CartIcon
                cartItems={cartItems}
                onClickCart={onClickCart}
                getTotalItems={getTotalItems}
            />
        </Toolbar>
    </AppBar>
  );
};

export default TopPanel;
