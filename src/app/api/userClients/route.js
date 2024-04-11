import { NextResponse } from "next/server"
import { connectDB } from "../../../utils/mongoose"
import userClient from "../../../models/userClient.model.js"
import { hash } from "bcrypt"

export async function GET() {
	try {
		connectDB()
		const userClients = await userClient.find()
		return NextResponse.json(userClients)
	} catch (error) {
		console.log(error.message)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}

export async function POST(request) {
	try {
		connectDB()
		const { email, fullName, password } = await request.json()
		const userClientExisting = await userClient.findOne({
			email,
		})
		if (userClientExisting)
			//checking by duplicate item
			return NextResponse.json(
				{ message: "userClient already exists" },
				{ status: 409 }
			)
		const hashedPassword = await hash(password, 8)
		const savedUserClient = await new userClient({
			fullName,
			email,
			password: hashedPassword,
		}).save()
		console.log(savedUserClient)
		return NextResponse.json(savedUserClient)
	} catch (error) {
		console.log(error.message)
		return NextResponse.json(error.message, { status: 500 })
	}
}
