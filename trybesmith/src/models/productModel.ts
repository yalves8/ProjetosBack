import { ResultSetHeader } from 'mysql2';
import { CadProd } from '../interfaces/InterProduct';
import connection from './connection';

const createProduct = async (product: CadProd): Promise<number> => {
  const { name, amount } = product;
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
    [name, amount],
  );
  const { insertId: id } = result;
  return id;
};

const listProducts = async (): Promise<CadProd | ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    'SELECT * FROM Trybesmith.Products',
  );
  return result;
};

export { createProduct, listProducts };