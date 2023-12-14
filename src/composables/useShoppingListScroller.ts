import { type Ref } from 'vue';

type ShoppingListRef = Ref<HTMLUListElement | undefined>;
let shoppingListRef: ShoppingListRef;

export const useShoppingListScroller = () => {
  function setShoppingListRef(element: ShoppingListRef) {
    shoppingListRef = element;
  }

  function scrollTop() {
    const lastChild = _getLastChild();

    if (lastChild) {
      lastChild.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }

  function scrollBottom() {
    const lastChild = _getLastChild();

    if (lastChild) {
      lastChild.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }

  function _getLastChild() {
    return shoppingListRef.value?.lastElementChild || null;
  }

  return {
    setShoppingListRef,
    scrollTop,
    scrollBottom,
  };
};
