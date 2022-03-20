export interface CadProd {
  name: string,
  amount: string,
}

export interface IdProd extends CadProd {
  id: number,
}

export interface TokenUser{
  token: string,
}