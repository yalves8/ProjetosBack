export interface Login {
  username: string,
  password: string,
}

export interface InterUser extends Login {
  classe: string,
  level: number,
}

export interface User extends Login {
  id: number
}

export interface DecodeTokenId {
  userId: number,
  iat: number,
  exp: number,
}
