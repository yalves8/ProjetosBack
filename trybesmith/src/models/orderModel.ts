import { RowDataPacket, ResultSetHeader } from 'mysql2';
import connection from './connection';

const searchIdsProducts = async (products: Array<number>): Promise<boolean> => {
  const [result] = await connection.execute<RowDataPacket[]>(
    'SELECT * FROM Trybesmith.Products',
  );
  const size = products.length;
  const ids = result.map(({ id }) => id);
  const arr: Array<number> = [];
  products.forEach((i) => {
    ids.forEach((o) => {
      if (o === i) {
        arr.push(o);
      }
    });
  });
  console.log(arr.length);
  if (size === arr.length) return true;
  return false;
};

const createOrder = async (idToken: number) => {
  const [result] = await connection.execute<ResultSetHeader>(`INSERT INTO Trybesmith.Orders 
  (userId) VALUES (?)`, [idToken]);
  const { insertId: id } = result;
  return id;
};

const updateProductsWithOrder = async (products: number, orderId: number) => {
  const [result] = await connection.execute<ResultSetHeader>(`UPDATE Trybesmith.Products 
    SET orderId = ? WHERE id = ?`, [orderId, products]);
  return result;
};

const verifyArray = async (idsProduct: number[], orderId: number) => {
  const findIds = await searchIdsProducts(idsProduct);
  if (findIds) {
    return Promise.all(idsProduct.map((ids: number) => updateProductsWithOrder(ids, orderId)));
  }
  return false;
};
  
export { searchIdsProducts, createOrder, verifyArray };