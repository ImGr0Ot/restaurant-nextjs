import { Schema, model, models } from "mongoose"

const userSchema = new Schema({
	userId: {
		type: String,
		required: true,
		unique: true,
		minlength: 10,
		maxlength: 10,
	},
	fullName: {
		type: String,
		required: true,
		minlength: 6,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 6,
	},
	imgUrl: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	salary: {
		type: Number,
		default: 0,
	},
})
export default models.User || model("User", userSchema)
