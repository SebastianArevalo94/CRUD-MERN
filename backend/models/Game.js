import mongoose from "mongoose";

const { Schema, model } = mongoose;

const GameSchema = new Schema({
 	name: {
 		type: String,
 		required: true
 	},
 	price: {
 		type: Number,
 		required: true
 	},
 	description: {
 		type: String,
 		required: true
 	},
 	genre: {
 		type: String,
 		required: true
 	},
 	cover: {
 		type: String,
 		required: true
 	},
 	platform: {
 		type: String,
 		required: true
 	},
});

 export const Game = model("Game", GameSchema, "games");
