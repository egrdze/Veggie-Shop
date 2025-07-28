import { useEffect, useState } from 'react';
import './App.css';
import type { Product } from './types/types.ts';
import ProductList from './components/ProductList/ProductList.tsx';
import Header from './components/Header/Header.tsx';
import CartSection from './components/CartSection/CartSection.tsx';
import {Skeleton} from '@mantine/core';

const App = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json'
                );
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Ошибка загрузки продуктов:', error);
            } finally {
                setLoading(false);
            }
        };

        setTimeout(fetchProducts, 3000);
    }, []);

    const handleAddToCart = (product: Product, quantity: number) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            return existing
                ? prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
                : [...prev, { product, quantity }];
        });
    };

    const handleIncrease = (productId: string) => {
        setCart((prev) =>
            prev.map((item) =>
                item.product.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const handleDecrease = (productId: string) => {
        setCart((prev) =>
            prev.map((item) =>
                item.product.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    return (
        <div style={{ minWidth: '100vw' }}>
            <Header cartItems={cart} onCartClick={() => setIsCartOpen((prev) => !prev)} />

            {isCartOpen && (
                <CartSection
                    cartItems={cart}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    onClearCart={() => setCart([])}
                />
            )}

            <div className="grid-container">
                <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: '49px' }}>
                    Catalog
                </h1>

                {loading ? (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                            gap: '24px',
                        }}
                    >
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                style={{
                                    height: 320,
                                    borderRadius: 20,
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                                    padding: 16,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#fff',
                                }}
                            >
                                <Skeleton animate height={180} radius="md" />
                                <Skeleton animate height={12} radius="xl" style={{ marginTop: 16 }} />
                                <Skeleton animate height={12} width="70%" radius="xl" style={{ marginTop: 8 }} />
                                <Skeleton animate height={24} width="40%" radius="xl" style={{ marginTop: 16 }} />
                                <Skeleton animate height={36} radius="md" style={{ marginTop: 8 }} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <ProductList products={products} onAddToCart={handleAddToCart} />
                )}
            </div>
        </div>
    );
};

export default App;