import { type BaseShoppingList, type ShoppingList } from '@/types/shoppingList';

export const useShoppingListManager = () => {
  function saveListToLocalStorage(list: ShoppingList) {
    const baseList = shoppingListAdapter(list);

    try {
      localStorage.setItem('shoppingList', JSON.stringify(baseList));
    } catch (e) {
      console.error(e);
    }
  }

  function getListFromLocalStorage() {
    try {
      const listFromStorage = localStorage.getItem('shoppingList');

      if (listFromStorage) {
        return JSON.parse(listFromStorage) as BaseShoppingList;
      } else {
        return [];
      }
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  function shoppingListAdapter(list: ShoppingList): BaseShoppingList {
    return list.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));
  }

  return {
    saveListToLocalStorage,
    getListFromLocalStorage,
    shoppingListAdapter,
  };
};
