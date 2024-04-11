"use server"
import { connectDB } from "@/utils/mongoose"
import { ProductType } from "@/utils/types"
import Product from "@/models/product.model"

export async function getProducts  () : Promise<ProductType[]>{
	connectDB()
	const data = await Product.find({
		category: "combo",
	})
	const products: ProductType[] = JSON.parse(JSON.stringify(data))
    
	return products}