import { render, screen } from "@testing-library/react";
import CategoryPreview from "../category-preview.component";

describe('category-preview tests', () => {
    const mockProducts = [
        {
            id: 1,
            name: 'product 1',
            imageUrl: 'test',
            price: 10
        },
        {
            id: 2,
            name: 'product 2',
            imageUrl: 'test2',
            price: 20
        }
    ]

    test('renders category title correctly', () => {
        const mockTitle = 'title';
      
        render(<CategoryPreview title={mockTitle} products={mockProducts} />);

        const titleElement = screen.getByText(mockTitle.toUpperCase());
        expect(titleElement).toBeInTheDocument();

    });

    test('renders up to 4 products', () => {
        render(<CategoryPreview title='title' products={mockProducts} />);

        const productElements = screen.getAllByRole('product');
        expect(productElements.length).toHaveLength(4);
    });
});