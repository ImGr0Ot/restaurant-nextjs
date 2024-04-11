import { NextResponse } from "next/server"
import { connectDB } from "../../../../utils/mongoose"
import Order from "../../../../models/order.model.js"

export async function GET(request, { params }) {
	try {
		connectDB()
		const orders = await Order.findById(params.id)
		if (!orders) {
			return NextResponse.json({ message: "Order not found" }, { status: 404 })
		}
		return NextResponse.json(orders)
	} catch (error) {
		console.log(error.message)
		return NextResponse.json({ error: error.message })
	}
}
export async function PUT(request, { params }) {
	try {
		connectDB()
		const orders = await Order.findById(params.id)
		if (!orders) {
			return NextResponse.json({ message: "Order not found" }, { status: 404 })
		}
		const data = await request.json()
		const updatedOrder = await Order.findByIdAndUpdate(params.id, data, {
			new: true,
		})
		console.log(updatedOrder)
		return NextResponse.json(updatedOrder)
	} catch (error) {
		console.log(error.message)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}

export async function DELETE(request, { params }) {
	try {
		connectDB()
		const orders = await Order.findById(params.id)
		if (!orders) {
			return NextResponse.json({ message: "Order not found" }, { status: 404 })
		}

		const deletedOrder = await Order.findByIdAndDelete(params.id)
		console.log(deletedOrder)
		return NextResponse.json(deletedOrder)
	} catch (error) {
		console.log(error.message)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
