import { render, screen } from "@testing-library/react";
import CartItem from "../cart-item.component";

describe('cart-item tests', () => {
    test('renders cart item', () => {
        const mockItem = {
            imageUrl: 'test',
            price: 10,
            name: 'item 1',
            quantity: 1
        };

        render(<CartItem item={mockItem} />);
        const cartItemElement = screen.getByRole('cart-item');
        expect(cartItemElement).toBeInTheDocument();
    });
});