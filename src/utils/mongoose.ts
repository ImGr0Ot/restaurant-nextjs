import { connect, connection } from "mongoose"

const conn = {
	isConnected: false,
}

export async function connectDB() {
	if (conn.isConnected) return console.log("MongoDB is already connected")
	else {
		const db = await connect(
			"mongodb+srv://anthonyperezpantaleon:Lazaro7991@cluster1.ways6sk.mongodb.net/test"
		)
		console.log("MongoDB connected")
		conn.isConnected = db.connections[0].readyState == 1
	}
}

connection.on("connected", () => {
	console.log("Mongoose connected")
})

connection.on("error", (err) => {
	console.log("Mongoose connection error", err)
})
