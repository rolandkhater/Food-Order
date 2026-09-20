import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";
import Input from "./UI/Input";
import Button from "./UI/Button";

export default function Checkout() {
    const cartCtx = useContext(CartContext)
    const UserProgressCtx = useContext(UserProgressContext)
    const cartTotal = cartCtx.items.reduce((totalprice, item) => totalprice + item.quantity * item.price, 0)

    function handleClose(){
        UserProgressCtx.hideCheckout();
    }

    return (
        <Modal 
        open={UserProgressCtx.progress === 'checkout'}
        onClose={handleClose}>
            <form>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="full-name" />
                <Input label="E-mail Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />

                <div className="control-row">
                    <Input label="Postal-code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                <p className="modal-actions">
                    <Button type="button" textOnly onClick={handleClose}>Close</Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    )
}