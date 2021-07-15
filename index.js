const express = require("express");
const MercadoPago = require("mercadopago");
const app = express();
const { v4: uuidv4 } = require('uuid');

MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-4964002272849451-071500-9e18af637a15c945d64f167b03a6e2bb-178408811",

});

app.get("/", (request, response) =>{
    response.send("Olá mundo");
});

app.get("/pagar", async (request, response) =>{
    var email = "matheus@gmail.com"
    var id = uuidv4();

    var data = {
        items: [
            item = {
                id: id,
                title: "2x video games;3x camisas",
                quantity: 1,
                currency_id: 'BRL',
                unit_price:  parseFloat(150)
            }
        ],
        payer: {
            email: email
        },
        external_reference: id,
    };

    try{
        var payment = await MercadoPago.preferences.create(data);
        console.log(payment);
        return response.redirect(payment.body.init_point);
    }catch(err){
        return response.send(err.message);
    }

});

app.listen(process.env.PORT || 3000, (request, response) =>{
    console.log("Server is running");
})
