import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatter";
import Button from "./UI/Button";
import UserProgress from "../store/UserProgress";
import CartItem from "./CartItem";

const Cart = ({}) => {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgress);

  function handleCloseCart() {
    userCtx.hideCart();
  }
  function handleGoToCheckout() {
    userCtx.showCheckout();
  }

  const totalAmount = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );
  return (
    <Modal className="cart" open={userCtx.progress === "cart"} onClose={userCtx.progress === 'cart' ? handleCloseCart : null}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onDecrease={() => cartCtx.removeItem(item.id)}
            onIncrease={() => cartCtx.addItem(item)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(totalAmount)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && <Button onClick={handleGoToCheckout}>Go To Checkout</Button>}
      </p>
    </Modal>
  );
};

export default Cart;
