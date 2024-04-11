import { NextResponse } from "next/server"
import { connectDB } from "../../../utils/mongoose"
import Order from "../../../models/order.model.js"
import Product from "../../../models/product.model.js"

export async function GET() {
	try {
		connectDB()
		const orders = await Order.find()
		return NextResponse.json(orders)
	} catch (error) {
		console.log(error.message)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}

export async function POST(request) {
	try {
		connectDB()
		const { orderId, note, status, user, products, total, percentDiscount } =
			await request.json()
		const orderExisting = await Order.findOne({ orderId: orderId })
		if (orderExisting)
			//checking by duplicate item
			return NextResponse.json(
				{ message: "order already exists" },
				{ status: 409 }
			)

		const savedOrder = await new Order({
			orderId,
			note,
			status,
			user,
			products,
			total,
			percentDiscount,
		}).save()
		console.log(savedOrder)
		return NextResponse.json(savedOrder)
	} catch (error) {
		console.log(error.message)
		return NextResponse.json(error.message, { status: 500 })
	}
}
