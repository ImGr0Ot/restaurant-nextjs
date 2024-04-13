"use server"
import Order from "@/models/order.model"
import { connectDB } from "@/utils/mongoose"

export async function updateOrderStatus(orderId: string) {
    await connectDB()
			await Order.findByIdAndUpdate(orderId.replace(/['"]+/g, ""), {
				status: "Done",
			})
			//empty the cart
			console.log("Order status updated")}