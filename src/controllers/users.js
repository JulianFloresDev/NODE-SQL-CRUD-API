import { connection } from '../db.js';

export const getUsers = async (req, res) => {
  try {
    const [usersFromDDBB] = await connection.query(
      'SELECT * FROM users AS usersFromDDBB'
    );
    if (usersFromDDBB.length === 0 || !usersFromDDBB) {
      return res.status(404).json({
        message: 'Users list is empty',
        data: usersFromDDBB,
        error: true,
      });
    } else {
      return res.status(200).json({
        message: 'List of users',
        data: usersFromDDBB,
        error: false,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: `Something was wrong with the request: ${error}`,
      error: true,
    });
  }
};

export const getUsersByID = async (req, res) => {
  try {
    const { id } = req.params;
    const [userFromDDBB] = await connection.query(
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );

    if (!userFromDDBB) {
      return res.status(404).json({
        message: 'User with this id is not in the DDBB',
        data: null,
        error: true,
      });
    } else {
      return res.status(200).json({
        message: 'User found in DDBB',
        data: userFromDDBB,
        error: false,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: `Something was wrong with the request: ${error}`,
      error: true,
    });
  }
};

export const createNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await connection.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    res.status(201).json({
      message: 'User created succefully!',
      data: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Something was wrong with the request: ${error}`,
      error: true,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userDeleted = await connection.query(
      `DELETE FROM users WHERE id = ?`,
      [id]
    );

    if (userDeleted) {
      res.status(204).json({
        message: 'User deleted succfully',
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: `Something was wrong with the request: ${error}`,
      error: true,
    });
  }
};
