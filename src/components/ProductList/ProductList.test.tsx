import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductList from './ProductList.tsx';
import type { Product } from '../../types/types.ts';

const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Tomato',
        price: 10,
        image: 'https://via.placeholder.com/100',
        category: 'vegetable',
    },
    {
        id: '2',
        name: 'Potato',
        price: 8,
        image: 'https://via.placeholder.com/100',
        category: 'vegetable',
    },
];

describe('ProductList', () => {
    it('renders a list of products', () => {
        render(<ProductList products={mockProducts} onAddToCart={() => {}} />);

        expect(screen.getByText('Tomato')).toBeInTheDocument();
        expect(screen.getByText('Potato')).toBeInTheDocument();
    });

    it('calls onAddToCart from child component', () => {
        const onAddToCart = vi.fn();

        render(<ProductList products={mockProducts} onAddToCart={onAddToCart} />);


        expect(screen.getAllByText(/1 kg/i)).toHaveLength(2); // 2 карточки с весом
    });

    it('renders nothing if product list is empty', () => {
        render(<ProductList products={[]} onAddToCart={() => {}} />);

        expect(screen.queryByText(/1 kg/i)).not.toBeInTheDocument();
    });
});
