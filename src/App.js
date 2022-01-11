import React, { useState } from 'react';
import Nav from './components/Nav';
import ItemListContainer from './pages/ItemListContainer';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ShoppingCart from './pages/ShoppingCart';
import { initialState } from './assets/state';

function App() {
  const [items, setItems] = useState(initialState.items);
  const [cartItems, setCartItems] = useState(initialState.cartItems);

  // 장바구니 제거
  const removeFormCart = (itemId) => {
    setCartItems(
      cartItems.filter((el) => {
        return el.itemId !== itemId;
      })
    );
  };
  // 장바구니 담기
  const addToCart = (itemId) => {
    // 장바구니 담기를 눌렀을때 어떤 아이템이 담겨있는지 확인한다.
    const found = cartItems.filter((el) => el.itemId === items.id)[0];
    if (found) {
      // 만약에 cartItems 목록에 아이템이 있으면 수량을 1 추가해준다.
      setQuantity(itemId, found.quantity + 1);
    } else {
      //  목록이 없으면 새로운에 목록을 넣어준다.
      setCartItems([...cartItems, { itemId, quantity: 1 }]);
    }
  };
  const setQuantity = (itemId, quantity) => {
    const found = cartItems.filter((el) => el.itemId === itemId)[0];
    const idx = cartItems.indexOf(found); // 해당 아이템의 위치 값 할당
    const cartItem = {
      // 해당 아이템 수량을 변경해서 다시 정의한다.
      itemId,
      quantity,
    };
    setCartItems([
      ...cartItems.slice(0, idx),
      cartItem,
      ...cartItems.slice(idx + 1),
    ]);
  };

  return (
    <Router>
      <Nav cartItems={cartItems} /> {/* props 내려주기 */}
      <Switch>
        <Route exact={true} path="/">
          <ItemListContainer items={items} onAddCart={addToCart} />
          {/* props 내려주기 */}
        </Route>

        <Route path="/shoppingcart">
          <ShoppingCart
            cartItems={cartItems}
            items={items}
            onRemoveFormCart={removeFormCart} /* props 내려주기 */

          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
