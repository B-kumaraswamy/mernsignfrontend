
import { useEffect, useState } from "react"
import { useAuthContext } from "./context"
import './singleproduct.css'
function SingleProductComponent(props) {

    const {imageUrl, title, price, vendor, id} = props.product
    const {cart, setCart, setProducts} = useAuthContext()
   
    const [q, setQ] = useState(0)

    const onDecrease = () => {
        if(q > 0) {
            setQ(q => q-1)
         
        }
        
    }

    const onIncrease = () => {
        setQ(prevQ => prevQ + 1)
    }    
    

    useEffect(() => {
       setProducts((prevProducts) => prevProducts.map(eachProduct => (eachProduct.id === id ? {
        ...eachProduct,
        quantity : q 
       } : eachProduct)))
    }, [q])

    /*
    cart = []

    cart = [{id : id, quantity : quantity}, {id : 1, quantity : 2}]
    ...cart
    */
    useEffect(() => {
        if (q>0) {
           const existingProduct = cart.find(eachProduct => eachProduct.id === id)
           if(existingProduct) {
           setCart(prevCart => (
            prevCart.map(eachProduct => (eachProduct.id === id ? {...eachProduct, quantity : q} : eachProduct))
           ))
           }

           else {
            setCart(prevCart => ([
                ...prevCart,
                {id : id, quantity : q}
            ]))
           }
        }
    }, [q])

    useEffect(() => {
        console.log('march 04 cart items are', cart)
    }, [cart])
   
    /*
    products = [
        {
            id : 1,
            quantity : 0,
            vendor : fiat
        },

        {
            id : 2,
            quantity : 3,
            vendor : nike
        }
    ]
    */
    return (
        <li className="cart-container">
        
            
            <img src = {imageUrl} alt = "loading" width = "20%"/>
            
            <h1 className="cart-heading">{title}</h1>
            <p className="cart-price">{`${price}/-`}</p>
            <p className="cart-vendor">{vendor}</p> 
            <button onClick={onDecrease}>-</button> &nbsp;
            <label>{q}</label>  &nbsp;
            <button onClick={onIncrease}>+</button>  &nbsp;  &nbsp;  &nbsp;

            <p>Click cart button after adding desired quantity</p>
          
       
        </li>
    )
}


export default SingleProductComponent;
