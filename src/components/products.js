import Headers from "./header";
import { useEffect, useState } from "react";
import axios from 'axios';
import SingleProductComponent from "./singleproduct";
import { useAuthContext } from "./context";
//import Cookie from "js-cookie";
//import {  Navigate } from "react-router-dom";




function ProductComponent() {
    const [loading, setLoading] = useState(true)
    const {products,setProducts} = useAuthContext()
   
    useEffect(() => {
      try {
        const axiosData = async() => {
            const url = 'https://mernsignbackend.onrender.com/products'
            const response = await axios.get(url)
    
            const res = response.data 
            setProducts(res.data)
            console.log('products data from backend', res.data)
            setLoading(false)
    
           }
    
           axiosData()
      }

      catch(err) {
        alert('error in displaying the products', err)
      }
       
    })
   

    if(loading) {
        return <center>Loading...</center>
    }
    return (
        <div>
            <Headers/>
            <ul>
            {products.map(eachProduct => (<SingleProductComponent key = {eachProduct.id} product = {eachProduct}/>))}
            </ul>
        </div>
    )

    

    
}

export default ProductComponent;