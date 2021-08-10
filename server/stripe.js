const express = require('express');
const app = express();
const cors = require('cors');
const { json } = require('express');
const stripe = require('stripe')("sk_test_51JJK9rICpi1SVZZjJkq3Mo5E3bd8KhtrapjYhoNb2NXyjONuMT1YTs6pFiiSFeii9lSDI3VpsCvcdnrCimQONRCZ00aZHTFttO");
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('chl rha h')
})

app.post('/payment',(req,res)=>{

    const {product,token} = req.body;
    // console.log(token);
    // const ipk =42112;

    stripe.customers
    .create({
      email: 'customer@example.com',
    })
    .then((customer) => {
      // have access to the customer object
      return stripe.invoiceItems
        .create({
          customer: customer.id,
          amount: product.price,
          currency: 'pkr',
          description: product.name,
        })
        .then((invoiceItem) => {
          return stripe.invoices.create({
            collection_method: 'send_invoice',
            customer: invoiceItem.customer,
            due_date:10
          });
        })
        .then((invoice) => {
            console.log(invoice)
            res.json(invoice)
        })
        .catch((err) => {
            console.log(err)
            res.json(err)

        });
    });




    // return stripe.customers.create({
    //     email : token.email,
    //     source : token.id
    // }).then(customer=>{
    //     stripe.charges.create({
    //         amount : product.price * 100,
    //         currency : 'USD',
    //         customer : customer.id,
    //         receipt_email : token.email,
    //         description : product.name,
    //         shipping : {
    //             name : token.card.name,
    //             address : {
    //                 country : token.card.address_country+' '+token.card.address_city
    //             }
    //         }
    //     },{ipk})
    // }).then(result=>res.status(200).json(result))
    // .catch(error=>console.log(error))

})

app.listen(3001,()=>{
    console.log('stripe.js is running on 3001')
})