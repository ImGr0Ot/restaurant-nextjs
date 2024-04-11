import { Schema, model, models } from "mongoose"

const userClientSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	fullName: {
		type: String,
	},
	password: {
		type: String,
		trim: true,
		minlength: 6,
	},
})
export default models.UserClient || model("UserClient", userClientSchema)
