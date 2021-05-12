import { Address } from './address';

export interface Client {
    username: string,
    password: string,
    addresses: Address[]
}