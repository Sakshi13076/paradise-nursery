import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

// Builds a simple plant illustration (SVG) so every thumbnail renders offline.
// You can replace `image` with any real photo URL if you prefer.
const makeThumb = (leaf, pot) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="#eef3e6"/>
    <path d="M100 120 C60 110 50 60 70 40 C95 55 105 90 100 120Z" fill="${leaf}"/>
    <path d="M100 120 C140 110 150 60 130 40 C105 55 95 90 100 120Z" fill="${leaf}" opacity="0.8"/>
    <path d="M100 125 C85 95 90 60 100 30 C112 60 115 95 100 125Z" fill="${leaf}" opacity="0.9"/>
    <path d="M62 125 H138 L128 180 H72Z" fill="${pot}"/>
    <rect x="56" y="118" width="88" height="14" rx="4" fill="${pot}"/>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', description: 'Produces oxygen at night and removes toxins.', cost: 15, image: makeThumb('#3f7d4e', '#b86b3f') },
      { name: 'Spider Plant', description: 'Filters formaldehyde and xylene from the air.', cost: 12, image: makeThumb('#6fae5a', '#c98a5b') },
      { name: 'Peace Lily', description: 'Removes mold spores and brightens any room.', cost: 18, image: makeThumb('#2f6b46', '#a45a3a') },
      { name: 'Boston Fern', description: 'Naturally humidifies and cleans indoor air.', cost: 20, image: makeThumb('#4e9a54', '#8d5a3b') },
      { name: 'Rubber Plant', description: 'Large glossy leaves that absorb airborne toxins.', cost: 17, image: makeThumb('#25583a', '#c0713f') },
      { name: 'Aloe Vera', description: 'Purifies air and its gel soothes minor burns.', cost: 14, image: makeThumb('#7fb069', '#b3744a') },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', description: 'Calming scent that helps with relaxation and sleep.', cost: 20, image: makeThumb('#8c7bb8', '#b86b3f') },
      { name: 'Jasmine', description: 'Sweet floral fragrance that fills the room.', cost: 18, image: makeThumb('#5ea06b', '#c98a5b') },
      { name: 'Rosemary', description: 'Fragrant herb that is also great for cooking.', cost: 15, image: makeThumb('#52805a', '#a45a3a') },
      { name: 'Mint', description: 'Fresh, cooling aroma; perfect for teas and drinks.', cost: 12, image: makeThumb('#69c07a', '#8d5a3b') },
      { name: 'Lemon Balm', description: 'Citrus scent that eases stress and repels pests.', cost: 14, image: makeThumb('#9ccc65', '#c0713f') },
      { name: 'Hyacinth', description: 'Bold spring blooms with a rich perfume.', cost: 22, image: makeThumb('#6f8fd0', '#b3744a') },
    ],
  },
  {
    category: 'Low Light and Succulent Plants',
    plants: [
      { name: 'ZZ Plant', description: 'Thrives in low light and almost any neglect.', cost: 25, image: makeThumb('#1f5c3d', '#b86b3f') },
      { name: 'Pothos', description: 'Trailing vine that grows well in dim corners.', cost: 10, image: makeThumb('#4aa35a', '#c98a5b') },
      { name: 'Jade Plant', description: 'Hardy succulent said to bring good luck.', cost: 16, image: makeThumb('#3e8e5a', '#a45a3a') },
      { name: 'Haworthia', description: 'Compact, striped succulent for desks and shelves.', cost: 13, image: makeThumb('#5b9a6a', '#8d5a3b') },
      { name: 'Cast Iron Plant', description: 'Nearly indestructible; tolerates deep shade.', cost: 19, image: makeThumb('#2a4f36', '#c0713f') },
      { name: 'Echeveria', description: 'Rosette-shaped succulent in soft blue-green tones.', cost: 11, image: makeThumb('#86b3a0', '#b3744a') },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  // Total number of items (sum of quantities) shown on the cart icon
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem({ name: plant.name, image: plant.image, cost: plant.cost }));
  };

  const handleHome = (e) => {
    e.preventDefault();
    onHomeClick();
  };
  const handlePlants = (e) => {
    e.preventDefault();
    setShowCart(false);
  };
  const handleCart = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  return (
    <div className="product-page">
      {/* Navbar: shown on both the Plants page and the Cart page */}
      <nav className="navbar">
        <a href="#home" className="nav-brand" onClick={handleHome}>
          <span className="nav-logo" aria-hidden="true">🌿</span>
          <span className="nav-title">Paradise Nursery</span>
        </a>
        <div className="nav-links">
          <a href="#home" onClick={handleHome}>Home</a>
          <a href="#plants" onClick={handlePlants} className={!showCart ? 'active' : ''}>Plants</a>
          <a
            href="#cart"
            onClick={handleCart}
            className={`cart-link ${showCart ? 'active' : ''}`}
            aria-label={`Cart, ${totalQuantity} items`}
          >
            <svg className="cart-icon" viewBox="0 0 256 256" width="34" height="34" aria-hidden="true">
              <rect width="256" height="256" fill="none" />
              <circle cx="80" cy="216" r="12" />
              <circle cx="184" cy="216" r="12" />
              <path
                d="M42.3 72H221.7l-26.4 92.4A15.9 15.9 0 0 1 179.9 176H84.1a15.9 15.9 0 0 1-15.4-11.6L32.5 37.8A8 8 0 0 0 24.8 32H8"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
            <span className="cart_quantity_count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <main className="product-grid-wrapper">
          {plantsArray.map((section) => (
            <section key={section.category} className="category-section">
              <h2 className="category-title">{section.category}</h2>
              <div className="product-grid">
                {section.plants.map((plant) => {
                  const added = isInCart(plant.name);
                  return (
                    <article key={plant.name} className="product-card">
                      <img className="product-image" src={plant.image} alt={plant.name} />
                      <h3 className="product-title">{plant.name}</h3>
                      <p className="product-description">{plant.description}</p>
                      <div className="product-price">${plant.cost}</div>
                      <button
                        className={`product-button ${added ? 'added-to-cart' : ''}`}
                        onClick={() => handleAddToCart(plant)}
                        disabled={added}
                      >
                        {added ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
      )}
    </div>
  );
}

export default ProductList;
