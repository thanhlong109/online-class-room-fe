import React from 'react';
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
    FUNDING,
    PayPalButtonsComponentProps,
} from '@paypal/react-paypal-js';

// This value is from the props in the UI
const style: PayPalButtonsComponentProps['style'] = { layout: 'vertical' };

interface CartItem {
    sku: string;
    quantity: number;
}

function createOrder(): Promise<string> {
    // replace this url with your server
    return fetch('https://react-paypal-js-storybook.fly.dev/api/paypal/create-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        body: JSON.stringify({
            cart: [
                {
                    sku: '1blwyeo8',
                    quantity: 2,
                },
            ],
        }),
    })
        .then((response) => response.json())
        .then((order: { id: string }) => {
            // Your code here after create the order
            return order.id;
        });
}

function onApprove(data: { orderID: string }): Promise<void> {
    // replace this url with your server
    return fetch('https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            orderID: data.orderID,
        }),
    })
        .then((response) => response.json())
        .then((orderData) => {
            // Your code here after capture the order
        });
}

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper: React.FC<{ showSpinner: boolean }> = ({ showSpinner }) => {
    const [{ isPending }] = usePayPalScriptReducer();

    return (
        <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style]}
                fundingSource={FUNDING.PAYPAL}
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </>
    );
};

const App: React.FC = () => {
    return (
        <div style={{ maxWidth: '750px', minHeight: '200px' }}>
            <PayPalScriptProvider
                options={{ clientId: 'test', components: 'buttons', currency: 'USD' }}
            >
                <ButtonWrapper showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
};

export default App;
