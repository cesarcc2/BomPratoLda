import { Ingredient } from "./ingredient";

export interface Item {
    name: string,
    description: string,
    image: string,
    type: ItemType,
    editableIngredients: Ingredient[],
    unitPrice:number
}   

enum ItemType {
    burguer  = "burguer",
    sushi   = "sushi",
    pizza  = "pizza",
    beverage = "beverage"
}