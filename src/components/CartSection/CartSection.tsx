import React, { useState } from 'react';
import type { Product } from '../../types/types.ts';
import styles from './CartSection.module.css';
import { Plus, Minus, Trash2 } from 'lucide-react';
import cartEmptyImg from '../../assets/cart_empty.svg';

interface CartItem {
    product: Product;
    quantity: number;
}

interface Props {
    cartItems: CartItem[];
    onIncrease: (productId: string) => void;
    onDecrease: (productId: string) => void;
    onClearCart: () => void;
}

const CartSection: React.FC<Props> = ({
                                          cartItems,
                                          onIncrease,
                                          onDecrease,
                                          onClearCart
                                      }) => {
    const [isClearing, setIsClearing] = useState(false);

    const handleClearCart = () => {
        setIsClearing(true);
        setTimeout(() => {
            onClearCart();
            setIsClearing(false);
        }, 300);
    };

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <div className={styles.wholeContainer}>
            <div
                className={
                    cartItems.length === 0
                        ? styles.cartContainerEmpty
                        : styles.cartContainer
                }
            >
                {cartItems.length === 0 ? (
                    <div className={styles.emptyContainer}>
                        <img src={cartEmptyImg} alt="Empty cart" className={styles.emptyImage} />
                        <span className={styles.emptyText}>Your cart is empty!</span>
                    </div>
                ) : (
                    <>
                        {cartItems.map(({ product, quantity }, index) => (
                            <React.Fragment key={product.id}>
                                <div
                                    className={`${styles.cartItemWrapper} ${
                                        isClearing ? styles.fadeOut : ''
                                    }`}
                                >
                                    <div className={styles.cartItem}>
                                        <img src={product.image} alt={product.name} className={styles.itemImage} />
                                        <div className={styles.itemDetails}>
                                            <div className={styles.nameLine}>
                                                <span>
                                                    <span className={styles.productName}>
                                                        {product.name.replace(/\s*[-–]?\s*1\s*Kg/i, '').trim()}
                                                    </span>
                                                    <span className={styles.inlineWeight}> &nbsp;1 kg</span>
                                                    <p className={styles.price}>${product.price}</p>
                                                </span>
                                            </div>
                                        </div>
                                        <div className={styles.quantityControl}>
                                            <button onClick={() => onDecrease(product.id)}>
                                                <Minus size={16} />
                                            </button>
                                            <span>{quantity}</span>
                                            <button onClick={() => onIncrease(product.id)}>
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {index < cartItems.length - 1 && <hr className={styles.divider} />}
                            </React.Fragment>
                        ))}

                        <hr className={styles.divider} />
                        <div className={styles.totalRow}>
                            <span>Total</span>
                            <strong>${totalPrice}</strong>
                        </div>

                        <button className={styles.clearButton} onClick={handleClearCart}>
                            <Trash2 size={16} style={{ marginRight: '8px' }} />
                            Clear Cart
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartSection;