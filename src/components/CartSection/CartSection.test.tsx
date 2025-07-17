import { render, screen, fireEvent } from '@testing-library/react';
import CartSection from './CartSection.tsx';
import type { Product } from '../../types/types.ts';
import { vi } from 'vitest';

const mockProduct: Product = {
    id: '1',
    name: 'Tomato',
    price: 10,
    image: 'https://via.placeholder.com/150',
    category: 'vegetables',
};

describe('CartSection', () => {
    it('renders empty cart', () => {
        render(
            <CartSection
                cartItems={[]}
                onIncrease={() => {}}
                onDecrease={() => {}}
            />
        );

        expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });

    it('renders a product in cart', () => {
        render(
            <CartSection
                cartItems={[{ product: mockProduct, quantity: 2 }]}
                onIncrease={() => {}}
                onDecrease={() => {}}
            />
        );

        expect(screen.getByText(/Tomato/i)).toBeInTheDocument();
        expect(screen.getByText('$10')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText(/total/i)).toBeInTheDocument();
        expect(screen.getByText('$20')).toBeInTheDocument();
    });

    it('calls onIncrease when + is clicked', () => {
        const onIncrease = vi.fn();

        render(
            <CartSection
                cartItems={[{ product: mockProduct, quantity: 1 }]}
                onIncrease={onIncrease}
                onDecrease={() => {}}
            />
        );

        const plusButton = screen.getAllByRole('button')[1]; // первый "+" после "-"
        fireEvent.click(plusButton);
        expect(onIncrease).toHaveBeenCalledWith('1');
    });

    it('calls onDecrease when - is clicked', () => {
        const onDecrease = vi.fn();

        render(
            <CartSection
                cartItems={[{ product: mockProduct, quantity: 1 }]}
                onIncrease={() => {}}
                onDecrease={onDecrease}
            />
        );

        const minusButton = screen.getAllByRole('button')[0];
        fireEvent.click(minusButton);
        expect(onDecrease).toHaveBeenCalledWith('1');
    });
});
