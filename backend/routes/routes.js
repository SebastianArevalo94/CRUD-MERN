import { Router } from "express";
import {getAll, createGame, getOne, deleteGame, updateGame} from "../controllers/gameControllers.js";

const router = Router();

router.get('/getAll', getAll);
router.get('/getOne/:id', getOne);
router.post('/createGame', createGame);
router.put('/updateGame/:id', updateGame);
router.delete('/deleteGame/:id', deleteGame);

export default router
