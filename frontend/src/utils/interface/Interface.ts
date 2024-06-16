export interface User {
  _id?: string;
  email?: string;
  name?: string;
  picture?: string;
  email_verified?: boolean;
  given_name?: string;
  family_name?: string;
  sub?: string;
}

export interface Vault {
  _id?: string;
  name?: string;
  description?: string;
  master_key?: string;
}

export type CreateVaultInput = Omit<Vault, '_id'>;

export interface Password {
  _id?: string;
  username?: string;
  domain?: string;
  encrypted_password?: string;
  vault_id?: string;
}
