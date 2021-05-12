export interface Item {
    name: string,
    description: string,
    type: ItemType,
}   

enum ItemType {
    burguer  = "burguer",
    sushi   = "sushi",
    pizza  = "pizza",
    beverage = "beverage"
}