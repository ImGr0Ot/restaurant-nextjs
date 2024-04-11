import { NextResponse } from "next/server"
import { connectDB } from "../../../utils/mongoose"
import User from "../../../models/user.model.js"
import { hash } from "bcrypt"

export async function GET() {
	try {
		connectDB()
		const users = await User.find()
		return NextResponse.json(JSON.stringify(users), { status: 200 })
	} catch (error) {
		console.log(error.message)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
