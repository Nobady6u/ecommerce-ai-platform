# E-Commerce AI Platform - Frontend README

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your API URL
REACT_APP_API_URL=http://localhost:5000/api
```

### Development

```bash
# Start dev server
npm start

# Build for production
npm run build

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📁 Project Structure

```
frontend/
├── public/           # Static files
├── src/
│  ├── pages/        # Page components
│  ├── components/   # Reusable components
│  ├── redux/        # Redux store & slices
│  ├── hooks/        # Custom React hooks
│  ├── utils/        # Utility functions
│  ├── styles/       # Global styles
│  └── App.jsx       # Root component
└── package.json
```

## 🎨 Components

### Layout Components
- **Navbar** - Navigation bar with cart counter
- **Footer** - Footer with social links
- **Layout** - Main layout wrapper

### Page Components
- **Home** - Landing page with features
- **Products** - Product listing with filters
- **ProductDetail** - Single product page
- **Cart** - Shopping cart management
- **Checkout** - Order checkout
- **Login** - User login form
- **Register** - User registration form
- **Dashboard** - User dashboard
- **Orders** - Order history
- **Wishlist** - Saved products

### Feature Components
- **ProductCard** - Product card display
- **PriceFilter** - Price range filter
- **CategoryFilter** - Category filter
- **RatingStars** - Star rating display
- **Pagination** - Page navigation

## 🎯 Redux Store

### Slices

#### authSlice
```javascript
// State
{
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null
}

// Actions
loginUser(email, password)
registerUser(userData)
loadUser(token)
logout()
```

#### cartSlice
```javascript
// State
{
  items: [],
  total: 0,
  itemCount: 0
}

// Actions
addToCart(product)
removeFromCart(productId)
updateQuantity(productId, quantity)
clearCart()
```

#### productsSlice
```javascript
// State
{
  items: [],
  selectedProduct: null,
  loading: false,
  totalPages: 1,
  currentPage: 1
}

// Actions
fetchProducts(filters)
fetchProductDetail(productId)
```

## 🎨 Styling

We use **Tailwind CSS** for styling. Key classes:

- `bg-gradient-to-br` - Gradient backgrounds
- `dark:` - Dark mode support
- `hover:` - Hover effects
- `transition` - Smooth animations

### Dark Mode
```javascript
// Dark mode is supported with 'dark:' prefix
<div className="bg-white dark:bg-slate-800">
  Dark mode supported!
</div>
```

## 🔐 Authentication Flow

1. User enters email/password
2. Redux dispatch `loginUser` action
3. API returns JWT token
4. Token stored in localStorage
5. Token added to all requests
6. User data stored in Redux state
7. Redirect to home page

## 🛒 Shopping Flow

1. Browse products
2. Add to cart (Redux)
3. Update quantities
4. View cart
5. Proceed to checkout
6. Enter shipping address
7. Select payment method
8. Confirm order
9. Payment processing
10. Order confirmation

## 🔄 API Integration

### Axios Instance
```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const client = axios.create({
  baseURL: API_URL
});

// Add token to requests
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Async Thunks
```javascript
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

### Example Test
```javascript
import { render, screen } from '@testing-library/react';
import HomePage from './Home';

test('renders welcome message', () => {
  render(<HomePage />);
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
});
```

## 🚀 Build & Deploy

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
# Creates optimized build in 'build/' folder
```

### Deploy to Vercel
```bash
vercel
# Or push to GitHub and connect Vercel
```

### Deploy to Netlify
```bash
netlify deploy --prod --dir=build
```

## 📊 Performance Optimization

- Code splitting with React.lazy()
- Image optimization
- Minification
- Caching strategies
- Bundle analysis

```javascript
const Products = React.lazy(() => import('./pages/Products'));

// Use with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Products />
</Suspense>
```

## 🌐 Environment Variables

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_KEY=pk_test_...
REACT_APP_GA_ID=tracking_id
```

## 📱 Responsive Design

The app is fully responsive:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

```css
/* Tailwind breakpoints */
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## 🐛 Debugging

### React DevTools
- Install React DevTools browser extension
- Inspect components
- View props and state

### Redux DevTools
```javascript
// Enable in development
const store = configureStore({
  reducer: { ... },
  devTools: process.env.NODE_ENV !== 'production'
});
```

## 📚 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run eject` | Eject config (irreversible) |

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Redux Documentation](https://redux.js.org)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)

## 📞 Support

- Check issues on GitHub
- Read the documentation
- Create a new issue if needed

## 📄 License

MIT License - See LICENSE file

---

Made with ❤️ by the E-Commerce AI Team
