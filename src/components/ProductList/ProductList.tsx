import React from 'react';
import type { Product } from '../../types/types.ts';
import ProductCard from '../ProductCard/ProductCard.tsx';
import styles from './ProductList.module.css';

interface ProductListProps {
    products: Product[];
    onAddToCart: (product: Product, quantity: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
    return (
        <div className={styles.grid}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
};

export default ProductList;