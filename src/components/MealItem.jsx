import React, { useContext } from 'react'
import { currencyFormatter } from '../utils/formatter'
import Button from './UI/Button'
import CartContext from '../store/CartContext'

const SERVER_URL = import.meta.env.VITE_SERVER_URL
const MealItem = ({meal}) => {
    const cartCtx = useContext(CartContext)

    function handleAddToCart(){
        cartCtx.addItem(meal)
    }
  return (
    <li className='meal-item'>
      <article>
        <img src ={`${SERVER_URL}/${meal.image}`} alt={meal.name} />
        <div>
        <h3>{meal.name}</h3>
        <p className='meal-item-price'>{currencyFormatter.format(meal.price)}</p>
        <p className='meal-item-description'>{meal.description}</p>
        </div>
        <p className="meal-item-actions">
            <Button onClick={handleAddToCart}>Add To Cart</Button>
        </p>
      </article>
    </li>
  )
}

export default MealItem
