import React, { useState, useEffect } from 'react';
import { ShoppingCart,  Search, Star, Heart, Plus, Minus } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  description: string;
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const ShopPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  // const [showFilters, setShowFilters] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Mock product data - replace with API call
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Premium Tennis Racket',
        price: 2499,
        originalPrice: 2999,
        image: '/api/placeholder/300/300',
        category: 'tennis',
        rating: 4.8,
        reviewCount: 124,
        description: 'Professional grade tennis racket with carbon fiber frame',
        inStock: true,
        isSale: true
      },
      {
        id: '2',
        name: 'Football Boots Pro',
        price: 3999,
        image: '/api/placeholder/300/300',
        category: 'football',
        rating: 4.6,
        reviewCount: 89,
        description: 'High-performance football boots for professional players',
        inStock: true,
        isNew: true
      },
      {
        id: '3',
        name: 'Basketball Jersey',
        price: 1299,
        originalPrice: 1599,
        image: '/api/placeholder/300/300',
        category: 'basketball',
        rating: 4.4,
        reviewCount: 67,
        description: 'Premium quality basketball jersey with moisture-wicking fabric',
        inStock: true,
        isSale: true
      },
      {
        id: '4',
        name: 'Badminton Shuttlecocks (12 pack)',
        price: 899,
        image: '/api/placeholder/300/300',
        category: 'badminton',
        rating: 4.7,
        reviewCount: 156,
        description: 'Tournament grade feather shuttlecocks',
        inStock: true
      },
      {
        id: '5',
        name: 'Cricket Bat Professional',
        price: 4999,
        image: '/api/placeholder/300/300',
        category: 'cricket',
        rating: 4.9,
        reviewCount: 203,
        description: 'English willow cricket bat for professional play',
        inStock: false
      },
      {
        id: '6',
        name: 'Swimming Goggles',
        price: 799,
        originalPrice: 999,
        image: '/api/placeholder/300/300',
        category: 'swimming',
        rating: 4.3,
        reviewCount: 45,
        description: 'Anti-fog swimming goggles with UV protection',
        inStock: true,
        isSale: true
      }
    ];
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'tennis', name: 'Tennis', count: products.filter(p => p.category === 'tennis').length },
    { id: 'football', name: 'Football', count: products.filter(p => p.category === 'football').length },
    { id: 'basketball', name: 'Basketball', count: products.filter(p => p.category === 'basketball').length },
    { id: 'badminton', name: 'Badminton', count: products.filter(p => p.category === 'badminton').length },
    { id: 'cricket', name: 'Cricket', count: products.filter(p => p.category === 'cricket').length },
    { id: 'swimming', name: 'Swimming', count: products.filter(p => p.category === 'swimming').length }
  ];

  // Filter and sort products
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery, sortBy]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/shop/checkout' } });
      return;
    }
    
    navigate('/shop/checkout', { state: { cartItems: cart } });
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sports Equipment Store
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Discover premium sports equipment and gear for all your athletic needs
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-4">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-primary-500 text-white shadow-medium'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.name}</span>
                        <span className={`text-sm ${
                          selectedCategory === category.id ? 'text-primary-100' : 'text-gray-500'
                        }`}>
                          {category.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
                <span className="text-gray-500 font-normal ml-2">
                  ({filteredProducts.length} products)
                </span>
              </h2>
              
              {/* Cart Summary */}
              {cart.length > 0 && (
                <div className="flex items-center gap-4">
                  <div className="bg-primary-500 text-white px-4 py-2 rounded-xl flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="font-medium">{getTotalItems()} items</span>
                    <span className="font-bold">₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl font-semibold transition-colors duration-200 shadow-medium hover:shadow-large"
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden group"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          New
                        </span>
                      )}
                      {product.isSale && (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Sale
                        </span>
                      )}
                      {!product.inStock && (
                        <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          wishlist.includes(product.id)
                            ? 'text-red-500 fill-current'
                            : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart */}
                    {cart.find(item => item.id === product.id) ? (
                      <div className="flex items-center justify-between bg-gray-50 rounded-xl p-2">
                        <button
                          onClick={() => updateQuantity(product.id, cart.find(item => item.id === product.id)!.quantity - 1)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold">
                          {cart.find(item => item.id === product.id)?.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, cart.find(item => item.id === product.id)!.quantity + 1)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                          product.inStock
                            ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-medium hover:shadow-large'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
