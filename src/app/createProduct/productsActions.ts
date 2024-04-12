"use server"

import { connectDB } from "@/utils/mongoose"
import Product from "@/models/product.model"


type Product = {
    name: string,
	description: string,
	price: number,
	imgUrl: string,
	category: string,
	
}
export async function addProduct(name: string,
		description: string,
		price: number,
		imgUrl: string,
		category: string) {
    

	const newProduct = {
		name ,
		description,
		price,
		imgUrl,
		category
	}
	try {await connectDB()
	//checking by duplicate item
	const productExisting = await Product.findOne({ name: newProduct.name })
	if (productExisting) {
		return "Product already exists"
	}
	
	//saving to database
	await new Product(newProduct).save()
	
	console.log("Add product to database")
	
	return "Product added successfully"
		
	} catch (error) {
			console.log(error)
	}
	
}