import { Router } from 'express';
import {
  createNewUser,
  deleteUser,
  getUsers,
  getUsersByID,
} from '../controllers/users.js';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUsersByID);
router.post('/', createNewUser);
router.delete('/:id', deleteUser);

export default router;
