
export interface UserType{
    email: String
    password: String
    
}
export interface ProductType{
    _id:String
    name:String
    description:String
    imgUrl:String
    category:String
    price:Number
}
export interface CartItemType{
    name:string
    imgUrl:string
    price:number
    quantity:number
}
export interface CartType{
    products: CartItemType[]
    totalItems:number
    totalPrice:number
   
}
export interface ActionType{
    addToCart: (item:CartItemType)=>void;
    removeFromCart: (item:CartItemType)=>void;
}
export interface OrderType{
        _id: String
        products: string []
        total: number
        status: string
        createdAt: Date
}