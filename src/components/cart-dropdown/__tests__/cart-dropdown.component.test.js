import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CartDropdown from "../cart-dropdown.component";

const mockStore = configureStore([]);
const initialState = {
    cart: {
        cartItems: []
    }
};
const store = mockStore(initialState);

describe('cart-dropdown tests', () => {
    test('renders empty message when cart is empty', () => {
        render(
            <Provider store={store}>
                <CartDropdown />
            </Provider>
        );

        const cartDropdownElement = screen.getByText(/your cart is empty/i);
        expect(cartDropdownElement).toBeInTheDocument();
    });

    test('renders cart items when cart is not empty', () => {
        const mockCartItems = [
            {
                id: 1,
                imageUrl: 'test',
                price: 10,
                name: 'item 1',
                quantity: 1
            },
            {
                id: 2,
                imageUrl: 'test2',
                price: 20,
                name: 'item 2',
                quantity: 2
            }
        ];

        const storeWithItems = mockStore({
            cart: {
                cartItems: mockCartItems
            }
        });

        render(
            <Provider store={storeWithItems}>
                <CartDropdown />
            </Provider>
        );

        const cartDropdownElement = screen.getByRole('cart-dropdown');
        expect(cartDropdownElement).toBeInTheDocument();
    });

    test('navigates to checkout when the checkout button is clicked', () => {
        const navigate = jest.fn();
        const mockCartItems = [
            {
                id: 1,
                imageUrl: 'test',
                price: 10,
                name: 'item 1',
                quantity: 1
            },
            {
                id: 2,
                imageUrl: 'test2',
                price: 20,
                name: 'item 2',
                quantity: 2
            }
        ];

        const storeWithItems = mockStore({
            cart: {
                cartItems: mockCartItems
            }
        });

        render(
            <Provider store={storeWithItems}>
                <CartDropdown navigate={navigate} />
            </Provider>
        );
        const checkoutButtonElement = screen.getByRole('button', { name: /checkout/i });
        fireEvent.click(checkoutButtonElement);
        expect(navigate).toHaveBeenCalled();
    });
});