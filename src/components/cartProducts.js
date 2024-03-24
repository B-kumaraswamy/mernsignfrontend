import './cartProducts.css'
function CartProductsComponent(props) {
    const { title, price, imageUrl, quantity} = props.product
    return (
        <li className="cart-item">
            <img src = {imageUrl} alt="Loading" className="cart-img" width = "20%"/>
            <h1 className="cart-titl">{title}</h1>
            <p >quantity : {quantity}</p> <br/> <br/> 
            <p >price : {price}</p> <br/> <br/>
            <p >Total :{quantity * price}</p> <br/> <br/>

        </li>
    )
}

export default CartProductsComponent;