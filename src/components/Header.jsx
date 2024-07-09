import React, { useContext } from 'react'
import logo from './../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'
import UserProgress from '../store/UserProgress'

const Header = () => {
    const cartCtx = useContext(CartContext)
    const userCtx = useContext(UserProgress)

    function handleShowCart(){
        userCtx.showCart()
    }

    const totalCartItems = cartCtx.items.reduce((totalQuantity,item) => {return item.quantity + totalQuantity},0)
  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logo} alt="food-logo" />
        <h1>Sidhu Restaurant</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  )
}

export default Header
