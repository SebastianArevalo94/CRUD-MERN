import {Game} from '../models/Game.js';

export const getAll = async (req, res) => {
	try { 
		let games = await Game.find();
		res.status(200).json({data:games});
	} catch(error) {
		console.log('Hubo un error', error); 
		res.status(500).json({message:'Internal Server Error.'})
	}	
};

export const getOne = async (req, res) => {
	try {
		const id = req.params.id;
		const game = await Game.findById(id);
		res.status(200).json({data:game});
	} catch (error) {
		console.log(error);
		res.status(500).json({message:'Internal Server Error.'})
	}
};

export const createGame = async (req, res) => {
	try {
		 const game = new Game(req.body);
		 await game.save();
		 res.status(201).json({message:'Game created', data: game});
	} catch(error) {
		console.log(error) 
		res.status(400).json({message:'Invalid JSON'})
	} 
};

export const updateGame = async (req, res) => { 
	try{ 
		const id = req.params.id;
		const updated = await Game.findByIdAndUpdate(id, { $set: req.body });
		res.status(200).json({message:'Game Updated'})
	} catch(error){
		console.log(error);
		res.status(400).json({message:'Game not found.'})
	}
};

export const deleteGame = async (req, res) => {
	try {
		let game = await Game.findById(req.params.id);
		await Game.findOneAndRemove({_id: req.params.id});
		res.status(200).json({message:'Game deleted', gameDeleted: game});
	} catch (error) {
		res.status(404).json({message:'Game not found.'})
	}
}
