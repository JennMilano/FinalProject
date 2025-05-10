import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Products from './components/Products'
import React from 'react'
import SingleProduct from './components/SingleProduct'
import Login from './components/login'
import Navigation from './components/Navigation'
import { useSelector } from 'react-redux'
import { selectToken } from './redux/authSlice'
import Cart from './components/Cart'
import Register from './components/Register'
import CreateProduct from './components/CreateProduct'

function App() {
  const token = useSelector(selectToken);

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">NFL App</h1>
          <Navigation />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-product" element={<CreateProduct />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;