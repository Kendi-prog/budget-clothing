import { screen, fireEvent } from "@testing-library/react";
import CheckoutItem from "../checkout-item.component";
import { clearItemFromCart, addItem, removeItem } from "../../../store/cart/cart.action";
import { renderWithProviders } from "../../../utils/test/test.utils";

describe('checkout-item tests', () => {
    const mockItem = {
        imageUrl: 'test',
        price: 10,
        name: 'item 1',
        quantity: 1
    };

    test('renders item details correctly', () => {
        renderWithProviders(<CheckoutItem cartItem={mockItem} />, {
            preloadedState: {
                cart: {
                    cartItems: [mockItem]
                }
            }
        });

        const itemName = screen.getByText(/item 1/i);
        expect(itemName).toBeInTheDocument();
    });

    test('dispatches clearItemFromCart when remove button is clicked', () => {
        const { store } = renderWithProviders(<CheckoutItem cartItem={mockItem} />, {
            preloadedState: {
                cart: {
                    cartItems: [mockItem]
                }
            }
        });

        const removeButton = screen.getByText('✕');
        fireEvent.click(removeButton);

        const actions = store.getActions();
        expect(actions).toContainEqual(clearItemFromCart(mockItem));
    });

    test('dispatches addItem when right arrow is clicked', () => {
        const { store } = renderWithProviders(<CheckoutItem cartItem={mockItem} />, {
            preloadedState: {
                cart: {
                    cartItems: [mockItem]
                }
            }
        });

        const rightArrow = screen.getByText('❯');
        fireEvent.click(rightArrow);

        const actions = store.getActions();
        expect(actions).toContainEqual(addItem(mockItem));
    });

    test('dispatches removeItem when left arrow is clicked', () => {
        const { store } = renderWithProviders(<CheckoutItem cartItem={mockItem} />, {
            preloadedState: {
                cart: {
                    cartItems: [mockItem]
                }
            }
        });

        const leftArrow = screen.getByText('❮');
        fireEvent.click(leftArrow);

        const actions = store.getActions();
        expect(actions).toContainEqual(removeItem(mockItem));
    });
});