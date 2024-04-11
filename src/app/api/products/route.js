import { NextResponse } from "next/server"
import { connectDB } from "../../../utils/mongoose"
import Product from "../../../models/product.model.js"

export async function GET() {
	try {
		connectDB()
		const products = await Product.find()
		return NextResponse.json(products)
	} catch (error) {
		console.log(error.message)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}

export async function POST(request) {
	try {
		connectDB()
		const { name, price, description, imgUrl, category, stock } =
			await request.json()
		const productExisting = await Product.findOne({ name: name })
		if (productExisting)
			//checking by duplicate item
			return NextResponse.json(
				{ message: "Product already exists" },
				{ status: 409 }
			)

		const savedProduct = await new Product({
			name,
			price,
			description,
			imgUrl,
			category,
			stock,
		}).save()
		console.log(savedProduct)
		return NextResponse.json(savedProduct)
	} catch (error) {
		console.log(error.message)
		return NextResponse.json(error.message, { status: 500 })
	}
}
