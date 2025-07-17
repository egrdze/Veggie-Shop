import { ShoppingCart } from 'lucide-react';
import styles from './Header.module.css';
import type { Product } from '../../types/types.ts';

interface HeaderProps {
    cartItems: { product: Product; quantity: number }[];
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItems, onCartClick }) => {
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);



    return (
        <header className={styles.header}>
            <div className={styles.titleShop}>
        <span className={styles.titleText}>
          Vegetables <span className={styles.highlight}>SHOP</span>
        </span>
            </div>

            <button className={styles.btn} onClick={onCartClick}>
                {totalCount > 0 && (
                    <span className={styles.countBubble}>{totalCount}</span>
                )}
                Cart
                <ShoppingCart size={20}/>
            </button>
        </header>
    );
};

export default Header;