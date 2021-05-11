import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {
  LinearProgress, Grid, Drawer,
} from '@material-ui/core';
import { FAKE_STORE_API_PRODUCTS } from 'constants/common';
import TopPanel from 'components/topPanel/TopPanel';
import Cart from 'containers/cart/Cart';
import Item from 'components/item/Item';
import ErrorPage from 'containers/errorPage/ErrorPage';
import styles from './ItemsContainer.module.scss';

export interface CartItemType {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const ZEUS_PRODUCT: CartItemType = {
  id: 0,
  category: 'Underwear',
  description: 'The best underwear from the best seller. Five-year warranty (or maybe 10 years). Most often bought by moms for their sons:)',
  image: 'https://cherkiz.ru/upload/resize_cache/iblock/fcf/2941_2106_140cd750bba9870f18aada2478b24840a/fcff4ff6fc5ec31e85eb0b0716d57d11.jpeg',
  price: 39.99,
  title: 'ZEUS underwear for men',
  amount: 0,
};

const getProducts = async (): Promise<CartItemType[]> => {
  const products = await fetch(FAKE_STORE_API_PRODUCTS);
  const productsJson = await products.json();
  return [ZEUS_PRODUCT, ...productsJson];
};

const ItemsContainer:React.FC = () => {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts,
  );

  const [cartOpen, setCartOpen] = useState(false as boolean);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const getTotalItems = (items: CartItemType[]) => (
    items.reduce((accum: number, item) => accum + item.amount, 0)
  );

  const handleClickOnCart = () => setCartOpen(!cartOpen);

  const handleAddToCart = (item: CartItemType) => {
    const { id } = item;
    const isItemInCart = cartItems.find((addedItem) => addedItem.id === id);
    if (isItemInCart) {
      const updatedCartItems = cartItems.map((addedItem) => (
        addedItem.id === id
          ? { ...addedItem, amount: addedItem.amount + 1 }
          : addedItem
      ));
      setCartItems(updatedCartItems);
      return;
    }

    setCartItems([...cartItems, { ...item, amount: 1 }]);
  };

  const handleRemoveFromCart = (itemId: number) => {
    const updatedCartItems = cartItems.reduce((accum, item) => {
      if (itemId === item.id) {
        if (item.amount === 1) return accum;
        return [...accum, { ...item, amount: item.amount - 1 }];
      }
      return [...accum, item];
    }, [] as CartItemType[]);

    setCartItems(updatedCartItems);
  };

  if (isLoading) return <LinearProgress />;
  if (error) {
    return <ErrorPage
      code={404}
      message="Something went wrong:("
    />;
  }

  return (
      <>
          <TopPanel
              cartItems={cartItems}
              onClickCart={handleClickOnCart}
              getTotalItems={getTotalItems}
          />
          <div className={styles.itemsContainer}>
              <Drawer
                  anchor="right"
                  open={cartOpen}
                  onClose={() => setCartOpen(false)}
              >
                  <Cart
                      cartItems={cartItems}
                      addToCart={handleAddToCart}
                      removeFromCart={handleRemoveFromCart}
                      onClose={handleClickOnCart}
                  />
              </Drawer>
              <Grid container spacing={3}>
                  {data?.map((item) => {
                    const { id } = item;
                    return (
                          <Grid item key={id} xs={12} sm={4}>
                              <Item
                                  item={item}
                                  handleAddToCart={handleAddToCart}
                              />
                          </Grid>
                    );
                  })}
              </Grid>
          </div>
      </>
  );
};

export default ItemsContainer;
