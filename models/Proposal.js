import mongoose from 'mongoose';

const proposalSchema = new mongoose.Schema({
	freelancer: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: 'The user is required'
	},
	cv: {
		type: String,
		required: 'You must upload your cv'
	},
	messages : {
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	}
})