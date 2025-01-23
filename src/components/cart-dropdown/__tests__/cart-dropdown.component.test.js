import { render, screen, fireEvent } from "@testing-library/react";
import CartDropdown from "../cart-dropdown.component";
import { mock } from "node:test";


describe('cart-dropdown tests', () => {
    test('renders empty message when cart is empty', () => {
        render(<CartDropdown cartItems={[]} />);

        const cartDropdownElement = screen.getByText('/your cart is empty/i');
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

        render(<CartDropdown cartItems={mockCartItems} />);

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

        render(<CartDropdown cartItems={mockCartItems} navigate={navigate} />);
        const checkoutButtonElement = screen.getByRole('button', { name: /checkout/i });
        fireEvent.click(checkoutButtonElement);
        expect(navigate).toHaveBeenCalled();
    });
});