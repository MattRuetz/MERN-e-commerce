import { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!shippingAddress) {
        navigate('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeOrder');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <h1>Payment Method</h1>
            <Form>
                <Form.Group controlId="address">
                    <Form.Label as="legend">Select Payment Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="PayPal or Credit Card"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                    {/* <Col>
                        <Form.Check
                            type="radio"
                            label="Stripe"
                            id="Stripe"
                            name="paymentMethod"
                            value="Stripe"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col> */}
                </Form.Group>
                <br />
                <Button type="submit" variant="primary" onClick={submitHandler}>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;
