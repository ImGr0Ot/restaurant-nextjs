"use server"
import  Order  from "@/models/order.model"
import { connectDB } from "@/utils/mongoose"
import { OrderType } from "@/utils/types"

export async function getOrders(){
    try {
          connectDB()
     const orders: OrderType [] = await Order.find()
     
     return JSON.parse(JSON.stringify(orders))

    } catch (error) {
      console.log(error)  
    }
  
}	

	