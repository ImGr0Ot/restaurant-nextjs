import { Schema, model, models } from "mongoose"

const productSchema = new Schema({
	_id: Schema.Types.ObjectId, // Mongoose automatically generates this ID
	name: {
		type: String,
		unique: true,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	imgUrl: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		enum: ["pizza", "burguer", "spaggettis", "drink", "combo"],
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	price: {
		type: Number,
		required: true,
	},
})
export default models.Product || model("Product", productSchema)
