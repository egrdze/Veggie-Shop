import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard.tsx';
import type { Product } from '../../types/types.ts';

const mockProduct: Product = {
    id: '1',
    name: 'Tomato',
    price: 42,
    image: 'https://via.placeholder.com/100',
    category: 'vegetable',
};

describe('ProductCard', () => {
    it('renders product name, price and image', () => {
        const mockAddToCart = vi.fn();

        render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

        expect(screen.getByText('Tomato')).toBeInTheDocument();
        expect(screen.getByText('$42')).toBeInTheDocument();
        expect(screen.getByAltText('Tomato')).toBeInTheDocument();
    });

    it('increments and decrements quantity', () => {
        render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);

        const increaseBtn = screen.getByLabelText('increase');
        const decreaseBtn = screen.getByLabelText('decrease');

        fireEvent.click(increaseBtn);
        fireEvent.click(decreaseBtn);
    });

    it('calls onAddToCart with correct quantity', () => {
        const mockAddToCart = vi.fn();

        render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

        const plusButton = screen.getAllByRole('button')[1];
        fireEvent.click(plusButton); // Quantity becomes 2

        const addToCartButton = screen.getByText(/Add to cart/i);
        fireEvent.click(addToCartButton);

        expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 2);
    });
});
