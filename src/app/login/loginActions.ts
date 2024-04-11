"use server"
import  UserClient  from "@/models/userClient.model"
import { connectDB } from "@/utils/mongoose"
import { compare } from "bcrypt"
import { UserType } from "@/utils/types"

export async function login(e: FormData){
      console.log("in login function")
      const email = e.get("email")?.toString()  
      const password = e.get("password")?.toString()
   try {
     connectDB()
	//checking by duplicate item
	const userClientExists: UserType | null  = await UserClient.findOne({email})
      if (!userClientExists) {
        return "errorNotExists" as string
}
else { const match = await compare(password as string, userClientExists.password as string)
    if (!match) {
        return "errorNotPasswordMatch" as string
    }   return email as string
  }
   } catch (error) {
    console.log(error)
   }
}


