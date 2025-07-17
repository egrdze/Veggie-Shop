import React, { useState } from 'react';
import type { Product } from '../../types/types.ts';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const displayName = product.name.replace(/\s*[-–]?\s*1\s*Kg/i, '').trim();

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={product.image} alt={product.name} className={styles.image} />
            </div>

            <div className={styles.infoGrid}>
                <div>
                    <p className={styles.inlineTitle}>
                        {displayName}
                        <span className={styles.inlineWeight}> &nbsp;1 kg</span>
                    </p>
                </div>

                <div className={styles.counter}>
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className={styles.quantityButton}
                        aria-label="decrease"
                    >
                        <Minus size={16} />
                    </button>
                    <span>{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className={styles.quantityButton}
                        aria-label="increase"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            <div className={styles.bottomRow}>
                <p className={styles.price}>${product.price}</p>
                <button
                    onClick={() => onAddToCart(product, quantity)}
                    className={styles.cartButton}
                >
                    Add to cart <ShoppingCart size={16} />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;