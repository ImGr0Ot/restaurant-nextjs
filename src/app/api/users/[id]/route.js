import { NextResponse } from "next/server"
import { connectDB } from "../../../../utils/mongoose"
import User from "../../../../models/user.model"
import { hash } from "bcrypt"

export async function GET(request, { params }) {
	try {
		connectDB()
		const users = await User.findById(params.id)
		if (!users) {
			return NextResponse.json({ message: "User not found" }, { status: 404 })
		}
		return NextResponse.json(users)
	} catch (error) {
		console.log(error.message)
		return NextResponse.json({ error: error.message })
	}
}
export async function PUT(request, { params }) {
	try {
		connectDB()
		const users = await User.findById(params.id)
		if (!users) {
			return NextResponse.json({ message: "User not found" }, { status: 404 })
		}
		const data = await request.json()
		data.password = await hash(data.password, 8)
		const updatedUser = await User.findByIdAndUpdate(params.id, data, {
			new: true,
		})
		console.log(updatedUser)
		return NextResponse.json(updatedUser)
	} catch (error) {
		console.log(error.message)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}

export async function DELETE(request, { params }) {
	try {
		connectDB()
		const users = await User.findById(params.id)
		if (!users) {
			return NextResponse.json({ message: "User not found" }, { status: 404 })
		}

		const deletedUser = await User.findByIdAndDelete(params.id)
		console.log(deletedUser)
		return NextResponse.json(deletedUser)
	} catch (error) {
		console.log(error.message)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
