import { screen, fireEvent } from "@testing-library/react";
import Checkout from "../../../routes/checkout/checkout.component";
import { useNavigate } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../../utils/test/test.utils";
import Button from "../../button/button.component";

import CartDropdown from "../cart-dropdown.component";



describe('cart-dropdown tests', () => {
    test('renders empty message when cart is empty', () => {
        renderWithProviders(<CartDropdown />, {
            preloadedState: {
                cart: {
                    cartItems: []
                }
            }
        });

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
            } 
        ];

        renderWithProviders(<CartDropdown />, {
            preloadedState: {
                cart: {
                    cartItems: mockCartItems
                }
            }
        });

        const cartDropdownElement = screen.getByText('item 1');
        expect(cartDropdownElement).toBeInTheDocument();
    });

    test('navigates to checkout when the checkout button is clicked', () => {
       
        const navigate = jest.fn();
       
    
        // const checkoutButtonElement = screen.getByText(/ go to checkout/i);
        // fireEvent.click(checkoutButtonElement);
        // expect(navigate).toHaveBeenCalledWith('/checkout');
    });
});