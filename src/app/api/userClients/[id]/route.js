import { NextResponse } from "next/server"
import { connectDB } from "../../../../utils/mongoose"
import userClient from "../../../../models/userClient.model"
import { hash } from "bcrypt"

export async function GET(request, { params }) {
	try {
		connectDB()
		const userClients = await userClient.findById(params.id)
		if (!userClients) {
			return NextResponse.json(
				{ message: "userClient not found" },
				{ status: 404 }
			)
		}
		return NextResponse.json(userClients)
	} catch (error) {
		console.log(error.message)
		return NextResponse.json({ error: error.message })
	}
}
export async function PUT(request, { params }) {
	try {
		connectDB()
		const userClients = await userClient.findById(params.id)
		if (!userClients) {
			return NextResponse.json(
				{ message: "userClient not found" },
				{ status: 404 }
			)
		}
		const data = await request.json()
		data.password = await hash(data.password, 10)
		const updatedUserClient = await userClient.findByIdAndUpdate(
			params.id,
			data,
			{
				new: true,
			}
		)
		console.log(updatedUserClient)
		return NextResponse.json(updatedUserClient)
	} catch (error) {
		console.log(error.message)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}

export async function DELETE(request, { params }) {
	try {
		connectDB()
		const userClients = await userClient.findById(params.id)
		if (!userClients) {
			return NextResponse.json(
				{ message: "userClient not found" },
				{ status: 404 }
			)
		}

		const deleteduserClient = await userClient.findByIdAndDelete(params.id)
		console.log(deleteduserClient)
		return NextResponse.json(deleteduserClient)
	} catch (error) {
		console.log(error.message)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
