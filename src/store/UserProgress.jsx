import { createContext, useState } from "react";

const UserProgress = createContext({
    progress: '',
    showCart: ()=>{},
    hideCart: ()=>{},
    showCheckout: ()=>{},
    hideCheckout: ()=>{},
})

export function UserProgressProvider ({children}){
    const [userProgress, setUserProgress] = useState('')
    function showCart(){
        setUserProgress('cart')
    }
    function hideCart(){
        setUserProgress('')
    }
    function showCheckout(){
        setUserProgress('checkout')
    }
    function hideCheckout(){
        setUserProgress('')
    }
    const userProgressCtx = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }
    return (
        <UserProgress.Provider value={userProgressCtx}>{children}</UserProgress.Provider>
    )
}

export default UserProgress