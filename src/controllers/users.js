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

    if (!userFromDDBB || userFromDDBB.length === 0) {
      return res.status(404).json({
        message: 'User with this id is not in the DDBB',
        data: null,
        error: true,
      });
    } else {
      return res.status(200).json({
        message: 'User found in DDBB',
        data: userFromDDBB[0],
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
    const [result] = await connection.query(
      'SELECT IF(count(*) > 0, true, false) AS emailAlreadyExist from users WHERE email = ?',
      [email]
    );

    if (result[0]?.emailAlreadyExist) {
      return res.status(409).json({
        message: 'Email is already in use by other user.',
        error: true,
      });
    }

    await connection.query(
      'INSERT INTO users (name, email, password, isActive) VALUES (?, ?, ?, ?)',
      [name, email, password, true]
    );
    return res.status(201).json({
      message: 'User created succefully!',
      error: false,
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
    const [response] = await connection.query(
      `DELETE FROM users WHERE id = ?`,
      [id]
    );

    if (response.affectedRows <= 0) {
      return res.status(404).json({
        massage: 'User with this id is not in DDBB.',
        error: true,
      });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).json({
      message: `Something was wrong with the request: ${error}`,
      error: true,
    });
  }
};

export const editUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const [result] = await connection.query(
      'UPDATE users SET name = IFNUll(?, name), email = IFNUll(?, email), password = IFNULL(?, password) WHERE id = ?',
      [name, email, password, id]
    );

    if (result.affectedRows <= 0) {
      return res.status(400).json({
        message: "Can't update user. I",
        error: true,
      });
    }

    const [userUpdated] = await connection.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );

    return res.status(200).json({
      message: 'User updated correctly!',
      error: false,
      data: userUpdated,
    });
  } catch (error) {}
};

export const dropUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await connection.query(
      'UPDATE users SET isActive = false WHERE id = ?',
      [id]
    );

    if (result.affectedRows <= 0) {
      return res.status(400).json({
        message:
          "Cant't modify user with this id. Try again in a few minutes, if error persiste contact help service",
        error: true,
      });
    }

    return res.status(205).json({
      message: 'User has been droped from database.',
      error: false,
    });
  } catch (error) {}
};
