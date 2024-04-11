import { NextResponse } from "next/server"
import { connectDB } from "../../../../utils/mongoose"
import Product from "../../../../models/product.model.js"

export async function GET(request, { params }) {
	try {
		connectDB()
		const products = await Product.findById(params.id)
		if (!products) {
			return NextResponse.json(
				{ message: "Product not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(products)
	} catch (error) {
		console.log(error.message)
		return NextResponse.json({ error: error.message })
	}
}
export async function PUT(request, { params }) {
	try {
		connectDB()
		const products = await Product.findById(params.id)
		if (!products) {
			return NextResponse.json(
				{ message: "Product not found" },
				{ status: 404 }
			)
		}
		const data = await request.json()
		const updatedProduct = await Product.findByIdAndUpdate(params.id, data, {
			new: true,
		})
		console.log(updatedProduct)
		return NextResponse.json(updatedProduct)
	} catch (error) {
		console.log(error.message)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}

export async function DELETE(request, { params }) {
	try {
		connectDB()
		const products = await Product.findById(params.id)
		if (!products) {
			return NextResponse.json(
				{ message: "Product not found" },
				{ status: 404 }
			)
		}

		const deletedProduct = await Product.findByIdAndDelete(params.id)
		console.log(deletedProduct)
		return NextResponse.json(deletedProduct)
	} catch (error) {
		console.log(error.message)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
