import { ResultSetHeader } from 'mysql2';
import {
  InterUser, Login, User,
} from '../interfaces/InterUser';
import connection from './connection';

const createUser = async (user: InterUser): Promise<number> => {
  const { username, classe, level, password } = user;
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
    [username, classe, level, password],
  );
  const { insertId: id } = result;
  return id;
};

const loginUser = async (user: Login): Promise<User[] | ResultSetHeader> => {
  const { username, password } = user;
  const [result] = await connection.execute<ResultSetHeader>(
    'SELECT id,username FROM Trybesmith.Users WHERE username=? AND password=?',
    [username, password],
  );

  return result;
};

export { createUser, loginUser };