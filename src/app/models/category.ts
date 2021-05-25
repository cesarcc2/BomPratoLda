import { Item } from "./item";

export interface Category {
    name: string,
    items: Item[],
    image: string,
    type: CategoryType
}   

export enum CategoryType {
    burguers  = "burguers",
    sushi   = "sushi",
    pizzas  = "pizzas",
    beverages = "beverages"
}