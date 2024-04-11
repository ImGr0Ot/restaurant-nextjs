"use server"
import { CartItemType, OrderType, ProductType } from "@/utils/types";
import Order from "@/models/order.model"
import Product from "@/models/product.model"
import { connectDB } from "@/utils/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function cancelOrder(orderId: string){
    
    try {
			connectDB()
			await Order.findByIdAndUpdate(orderId, {
				status: "Canceled",
			})
			
		} catch (error) {
			console.log(error)
		}
}

export async function createOrder(products: CartItemType[], total: number){
    //find products id
    try {
    await connectDB()
    let productsName: string [] = []
    const allProducts: ProductType[] = await Product.find()
    allProducts.map(product => {
       products.map(item => {
           if(product.name === item.name){
              productsName.push( "'" + product.name as string + "'"+" ")
           }
       })
       
    })
    console.log("Products to order" + "=>" + productsName)   
 
    const order: OrderType = await new Order({
        products:productsName,
        total,
        status: 'Pending', 
        createdAt: new Date(),
    }).save()
     // return order id
     
        console.log("Order created" + "=>" + order._id)
       return JSON.stringify(order._id) 
       
    } catch (error) {
        console.log(error)
    }
   
   
}

export async function createCheckoutSessionServer(products: CartItemType[], orderId: string) {
    
    // create orderId to put in url
    const url= (`/?${new URLSearchParams({
								orderId:orderId,
							})}`)
    
    const transformProducts = products.map(product => ({
        quantity: 1,
        price_data: {
            currency: 'usd',
            unit_amount: product.price * 100,
            product_data: {
                name: product.name,
                images: [product.imgUrl],
            }
        }
    }))
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
            allowed_countries: ['US', 'CA']
        },
        line_items: transformProducts,
        mode: 'payment',
        success_url:`${process.env.HOST}/success${url}`,
        cancel_url:`${process.env.HOST}/cart${url}`,
        metadata: {
            images: JSON.stringify(products.map(product => product.imgUrl))
        }
    })
    return session.url as string}
