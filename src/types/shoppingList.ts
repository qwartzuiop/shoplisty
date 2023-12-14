import { v4 as uuid } from 'uuid';

export interface BaseShoppingListItem {
  name: string;
  quantity: number;
  price: number;
}

export interface ShoppingListItem extends BaseShoppingListItem {
  id: string;
}

export type BaseShoppingList = Array<BaseShoppingListItem>;

export type ShoppingList = Array<ShoppingListItem>;

export class ShoppingListItem implements ShoppingListItem {
  constructor({ name, quantity, price }: BaseShoppingListItem) {
    this.id = uuid();
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }

  get totalPrice() {
    return this.price * this.quantity;
  }
}
