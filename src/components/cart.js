import Headers from "./header"
import { useAuthContext } from "./context"
import { useEffect, useState } from "react";
import axios from 'axios';
import CartProductsComponent from "./cartProducts";
//import OrderPlaced from "./orderPlaced";
import { useNavigate } from "react-router-dom";
function CartComponent() {
    const navigate = useNavigate()
    const [flag, setFlag] = useState(0)
   const [clearCart, setClearCart] = useState(false)
   const [grandTotal, setGrandTotal] = useState(0)
    const {cart, setCart , cartList, setCartList} = useAuthContext();
    /* 
    cart = [{id : 1, quantity : 2}, {id : 2, quantity : 1}, {id : 3, quantity : 3}]
    products = [{
                    "id": "1",
                    "title": "Mens Kurta",
                    "price": "1199",
                    "compare_at_price": "1299",
                    "vendor": "Manyvar",
                    "badge_text": "Wedding Special",
                    "image": "https://plus.unsplash.com/premium_photo-1682090786689-741d60a11384",
                    "second_image": "https://plus.unsplash.com/premium_photo-1682090781379-4d177df45267"
                },
            {
                    "id": "3",
                    "title": "Green Charm",
                    "price": "1399",
                    "compare_at_price": "1499",
                    "vendor": "Myntra",
                    "badge_text": "On offer",
                    "image": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/22372642/2023/3/16/52d27507-a870-456b-addd-e62aefa0f79a1678911375020ESSLogoRegularFitMensT-Shirt1.jpg",
                    "second_image": "empty"
                }]
    */
    useEffect(() => {
      if (!clearCart) {
        const cartItems = async() => {
            const url = 'https://mernsignbackend.onrender.com/cart'
            const body = cart
            const response = await axios.post(url, body)  
            const res =  response.data
           console.log('response march 05', res.result)
            if(res.status === 200) {
               setCartList(res.result)
               console.log('success response')
            
            }

            else if (res.status === 201) {
                setFlag(0)
            }

            else {
                alert(res.message)
            }

            console.log('response in the cart component', response.data.result)
           
        }

        cartItems()
      } 

     else {
        setCart([])
     }
      
    }, [clearCart, cart, setCart, setCartList])

  useEffect(() => {
    if(cartList !== []) {
        setFlag(1)
    }
  }, [cartList])

useEffect(() => {
    let  total = 0
   cartList.map(eachProduct => (total = total + (eachProduct.quantity * eachProduct.price)))
   setGrandTotal(total)
   
}, [cartList])

const onCheckOut = () => {
   
    setClearCart(true)
    
  
}

useEffect(() => {
    console.log('march 05 clearcart', clearCart)
    if(clearCart) {
        navigate('/checkout')
      }
}, [clearCart, navigate])

   if(flag && !clearCart) {
        return (
            <div>
            <Headers/>
           <ul>
            {cartList.map(eachProduct => (<CartProductsComponent product = {eachProduct}/>))}
           </ul>
            <h1>Grand Total : {grandTotal}</h1>
            <button onClick={onCheckOut}>Check Out</button>
           </div>
            )
    } 
    
                return (
        <center>
            <Headers/>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png" alt="Loading" width = "30%"/>
            <h1>Your Cart is Empty</h1>

           
        </center>
    )
}


export default CartComponent
