import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CheckoutItem from "../checkout-item.component";
import { clearItemFromCart } from "../../../store/cart/cart.action";

const mockStore = configureStore([]);
const store = mockStore({});

describe('checkout-item tests', () => {
    test('render item details correctly', () => {
        const mockItem = {
            imageUrl: 'test',
            price: 10,
            name: 'item 1',
            quantity: 1
        };

        render(
            <Provider store={store}>
                <CheckoutItem item={mockItem} />
            </Provider>
        );
        const checkoutItemElement = screen.getByRole('checkout-item');
        expect(checkoutItemElement).toBeInTheDocument();
    });

    test('dispatches clearItemFromCart when remove button is clicked', () => {
        const mockItem = {
            imageUrl: 'test',
            price: 10,
            name: 'item 1',
            quantity: 1
        };

        render(
            <Provider store={store}>
                <CheckoutItem item={mockItem} />
            </Provider>
        );

        const removeButton = screen.getByRole('button', { name: /&#10005/i });
        fireEvent.click(removeButton);

        const actions = store.getActions();
        expect(actions).toContainEqual(clearItemFromCart(mockItem));
    });

    test('dispatches addItem when right arrow is clicked', () => {
        const mockItem = {
            imageUrl: 'test',
            price: 10,
            name: 'item 1',
            quantity: 1
        };

        render(
            <Provider store={store}>
                <CheckoutItem item={mockItem} />
            </Provider>
        );

        const rightArrow = screen.getByRole('button', { name: /&#10095/i });
        fireEvent.click(rightArrow);

        const actions = store.getActions();
        expect(actions).toContainEqual(addItem(mockItem));
    });

    test('dispatches removeItem when left arrow is clicked', () => {
        const mockItem = {
            imageUrl: 'test',
            price: 10,
            name: 'item 1',
            quantity: 1
        };

        render(
            <Provider store={store}>
                <CheckoutItem item={mockItem} />
            </Provider>
        );

        const leftArrow = screen.getByRole('button', { name: /&#10094/i });
        fireEvent.click(leftArrow);

        const actions = store.getActions();
        expect(actions).toContainEqual(removeItem(mockItem));
    });

});