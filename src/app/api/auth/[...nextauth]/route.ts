"use server"
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import UserClient from "../../../../models/userClient.model";
import { connectDB } from "../../../../utils/mongoose"
import { UserType } from "@/utils/types";
import bycrpt from "bcrypt";

const handler = NextAuth({
  providers: [GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    
  }, 

  ), 
  Credentials({
    name: "Credentials",
    credentials: {
      
    }, 
    async authorize(credentials, req) {
      const {email, password} = credentials as {email: string, password: string}
      const userClientFound: UserType | null = await UserClient.findOne({email})
      if (!userClientFound) return null
      
      const isPasswordValid = bycrpt.compare(password, userClientFound.password as string)
      if (!isPasswordValid) return null
      console.log(credentials)
      return credentials as any },
  }),
], 
  callbacks: { redirect: async () => "/",
  
    async signIn({ user, account}) {
      
     
      if (account!.provider === 'google') {
      const {email, name} = user
       try {
        
        await connectDB()
        
      const userClientExists = await UserClient.findOne({email})
      if (!userClientExists) {
         await new UserClient({
			fullName:name,
			email,
			
		}).save()
     
      return user as any
       
      }
     return user as any
    
       } catch (error) {
        console.log(error)
  
       }}

    },
  }
})
export { handler as GET, handler as POST };