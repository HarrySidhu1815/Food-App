import React, { useContext } from "react";
import { currencyFormatter } from "../utils/formatter";
import CartContext from "../store/CartContext";
import Input from "./UI/Input";
import UserProgress from "../store/UserProgress";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requiredConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgress);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData
  } = useHttp("http://localhost:3000/orders", requiredConfig);

  function handleCloseCheckout() {
    userCtx.hideCheckout();
  }

  const totalAmount = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );
  function handleFinishOrder() {
    userCtx.hideCheckout();
    cartCtx.clearContent();
    clearData()
  }

  function handleSubmitForm(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }
  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending the data...</span>;
  }
  if (data && !error) {
    return (
      <Modal
        open={userCtx.progress === "checkout"}
        onClose={handleFinishOrder}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you with more details within few mintues via email.</p>
        <p className="modal-actions">
            <Button onClick={handleFinishOrder}>
                Okhay
            </Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal open={userCtx.progress === "checkout"} onClose={handleCloseCheckout}>
      <form onSubmit={handleSubmitForm}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalAmount)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to send the request" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
