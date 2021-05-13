import { Ingredient } from "./ingredient";

export interface Item {
    name: string,
    description: string,
    type: ItemType,
    editableIngredients: Ingredient[]
}   

enum ItemType {
    burguer  = "burguer",
    sushi   = "sushi",
    pizza  = "pizza",
    beverage = "beverage"
}