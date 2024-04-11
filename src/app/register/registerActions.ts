"use server"
import { z } from "zod"
import UserClient from "@/models/userClient.model"
import { connectDB } from "@/utils/mongoose"
import { hash } from "bcrypt"

 const userWorkerSchema = z.object({
	fullName: z.string()
		.max(50, "FullName: Max length is 50 characters")
		.min(15, "FullName: Min length is 15 characters")
		.regex(/(^(([A-Z]{1})([a-z]{2,16})([ ]{0,1}))+)$/,
					"FullName: Is not a valid full name"),
	email: z
		.string()
		.email("Email: Isnt a valid email")
		.min(15, "Email: Min length is 15 characters")
		.max(40, "Email: Max length is 40 characters"),
	password: z
		.string()
		.min(8, "Password: Min length is 8 characters")
		.max(20, "Password: Max length is 20 characters")
		.regex(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.,]).{8,20}$/,
			"Password: Must have at least 1 especial character, 1 number, 1 mayus and minus character"
		),
	userId: z
		.string()
		.min(10, "UserId: Length is 9 characters")
		.max(10, "UserId: Length is 9 characters"),
})

const userClientSchema = userWorkerSchema.omit({
	fullName: true,
	userId: true,
})

export async function validateUserClient(e: FormData) {
		
    	const newClientUser = {
			email: e.get("email")?.toString(),
			password: e.get("password")?.toString(),
		}
		const result = userClientSchema.safeParse(newClientUser)
		if (!result.success) {
			return result.error.issues as z.ZodIssue[]
}
}

export async function addUserClientToDatabase(e: FormData) {
    

	const newClientUser = {
		email: e.get("email")?.toString(),
		password: e.get("password")?.toString(),
	}
	try {connectDB()
	//checking by duplicate item
	const userExisting = await UserClient.findOne({ email: newClientUser.email })
	if (userExisting) {
		return  "error" as string
	}
	const hashedPassword = await hash(newClientUser.password as string, 10)
	await new UserClient({
		email: newClientUser.email,
		password: hashedPassword,
	}).save()
	
	console.log("User added to database")
	return newClientUser.email as string
		
	} catch (error) {
			console.log(error)
	}
	
}
