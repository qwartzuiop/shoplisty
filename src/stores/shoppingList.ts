import { ref, reactive, computed } from 'vue';
import { useShoppingListManager } from '@/composables/useShoppingListManager';
import { ShoppingListItem } from '@/types/shoppingList';

const { saveListToLocalStorage, getListFromLocalStorage } =
  useShoppingListManager();

const shoppingList = ref<Array<ShoppingListItem>>([]);

const totalShoppingListPrice = computed(() =>
  shoppingList.value.reduce((acc, prev) => {
    return acc + prev.price * prev.quantity;
  }, 0)
);

export const useShoppingListStore = () => {
  function initShoppingListFromLocalStorage() {
    try {
      const listFromStorage = getListFromLocalStorage();

      if (listFromStorage.length > 0) {
        listFromStorage.forEach((item) => {
          addToShoppingList(
            new ShoppingListItem({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })
          );
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  const updateItem = (item: Partial<ShoppingListItem>, index: number) => {
    Object.assign(shoppingList.value[index], item);
  };

  function addToShoppingList(item: ShoppingListItem) {
    shoppingList.value.push(reactive(item));

    saveListToLocalStorage(shoppingList.value);
  }

  function removeFromShoppingList(item: ShoppingListItem) {
    const targetIndex = shoppingList.value.findIndex((_item) => {
      return _item.id === item.id;
    });

    shoppingList.value.splice(targetIndex, 1);

    saveListToLocalStorage(shoppingList.value);
  }

  function clearShoppingList() {
    shoppingList.value = [];

    saveListToLocalStorage(shoppingList.value);
  }

  return {
    initShoppingListFromLocalStorage,
    shoppingList,
    totalShoppingListPrice,
    updateItem,
    addToShoppingList,
    removeFromShoppingList,
    clearShoppingList,
  };
};
