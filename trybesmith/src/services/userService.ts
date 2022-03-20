import { createUser, loginUser } from '../models/userModel';
import { InterUser, User } from '../interfaces/InterUser';

const createUserService = async (user: InterUser) => createUser(user);
const loginService = async (user:User) => loginUser(user);

export { createUserService, loginService };