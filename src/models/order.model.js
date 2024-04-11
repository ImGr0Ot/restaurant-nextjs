import { Schema, model, models } from "mongoose"

const orderSchema = new Schema({
	note: {
		type: String,
	},

	createdAt: {
		type: Date,
	},
	status: {
		type: String,
		required: true,
		enum: ["Pending", "Done", "Canceled"],
	},

	products: [
		{
			type: String,
			required: true,
		},
	],

	total: {
		type: Number,
		required: true,
	},
})
export default models.Order || model("Order", orderSchema)
