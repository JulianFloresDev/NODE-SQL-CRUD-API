import { Router } from 'express';
import {
  createNewUser,
  deleteUser,
  dropUserById,
  editUserById,
  getUsers,
  getUsersByID,
} from '../controllers/users.js';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUsersByID);
router.post('/', createNewUser);
router.patch('/:id', editUserById);
router.patch('/dropUser/:id', dropUserById);
router.delete('/:id', deleteUser);

export default router;
