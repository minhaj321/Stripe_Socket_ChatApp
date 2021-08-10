import React, { useState} from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const MyStripe = () => {
    const [product , setProduct]=useState({
        name : 'Minhaj',
        price : 10
    })

    const makePaymemt=async token=>{
        var data={
            product,
            token
        }
       await axios.post('http://localhost:3001/payment',data).then(res=>{
           console.log('response==>',res)
       }).catch(err=>{
           console.log('error==>',err)
       });
    }

    return ( 
        <div>
            Stripe
            <StripeCheckout 
            stripeKey="pk_test_51JJK9rICpi1SVZZjmhzj01PqkAGCn1YakjjEzcsOeHMGd9X0gAPNmX6geXxm4vmxSxFSWFwxTFeYFkdtZAumfwez00iCzhX9p3"
            token={makePaymemt}
            name="By Holder"
            // shippingAddress
            // billingAddress
            amount={product.price * 100}
            currency="PKR"
            />
        </div>
     );
}
 
export default MyStripe;