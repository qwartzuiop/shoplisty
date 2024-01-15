<template>
  <footer class="pb-4">
    <div
      v-if="totalShoppingListPrice"
      class="mb-2 flex items-center justify-end border-t border-neutral-100 px-3 pt-2"
    >
      <span>
        <strong> Total:&nbsp; </strong>
      </span>

      <span>
        <strong> {{ totalShoppingListPrice }} </strong>
      </span>
    </div>

    <base-button
      v-if="!isEditMode"
      class="m-auto"
      label="Add"
      type="submit"
      appearance="primary"
      icon-name="plus"
      icon-class="stroke-[2.5px] !h-4 !w-4"
      @click="enterEditMode"
    />

    <div
      v-if="isEditMode"
      class="flex items-center border-t border-neutral-100 px-3 pt-4"
    >
      <div class="w-full">
        <form
          class="flex flex-col gap-2"
          @submit.prevent="addItemToShoppingList"
          @reset.prevent="exitEditMode"
        >
          <div class="grid grid-cols-[min-content_4fr_2fr] items-center gap-2">
            <span>{{ shoppingList.length + 1 + '.' }}</span>

            <input
              v-model="itemData.name"
              class="min-w-0 rounded-md px-2 py-1 ring-1 ring-neutral-300"
              name="name"
              type="text"
              inputmode="text"
              enterkeyhint="next"
              placeholder="Product"
              autocomplete="off"
              autofocus
              @keypress.enter.prevent="
                focusNextInput($event.target as HTMLElement)
              "
            />

            <input
              v-model.number="itemData.price"
              class="min-w-0 rounded-md px-2 py-1 ring-1 ring-neutral-300"
              name="price"
              type="number"
              inputmode="decimal"
              placeholder="Price"
              autocomplete="off"
              :min="0"
              enterkeyhint="done"
            />
          </div>

          <menu class="flex gap-2">
            <div class="mr-auto flex items-center gap-2">
              <base-button
                class="!p-2"
                appearance="secondary"
                icon-name="minus"
                icon-class="stroke-[2.5px] !h-4 !w-4"
                :disabled="itemData.quantity === 1"
                @click="itemData.quantity -= 1"
              />

              <input
                v-model.number="itemData.quantity"
                class="w-[5ch] min-w-0 rounded-md px-2 py-1 text-center ring-1 ring-neutral-300"
                name="price"
                type="number"
                inputmode="decimal"
                placeholder="1"
                autocomplete="off"
                :min="1"
                enterkeyhint="done"
              />

              <base-button
                class="!p-2"
                appearance="secondary"
                icon-name="plus"
                icon-class="stroke-[2.5px] !h-4 !w-4"
                @click="itemData.quantity += 1"
              />
            </div>

            <base-button
              label="Cancel"
              type="reset"
              appearance="secondary"
              icon-name="x-mark"
              icon-class="stroke-[2.5px] !h-4 !w-4"
            />

            <base-button
              label="Add"
              type="submit"
              appearance="primary"
              icon-name="check"
              icon-class="stroke-[2.5px] !h-4 !w-4"
              :disabled="!itemData.name || !itemData.price"
            />
          </menu>
        </form>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import { ref, reactive, nextTick } from 'vue';
  import BaseButton from '@/components/base/BaseButton.vue';
  import { useShoppingListStore } from '@/stores/shoppingList';
  import { useShoppingListScroller } from '@/composables/useShoppingListScroller';
  import { focusNextInput } from '@/utils';
  import { ShoppingListItem } from '@/types/shoppingList';

  const { shoppingList, addToShoppingList, totalShoppingListPrice } =
    useShoppingListStore();

  const { scrollBottom } = useShoppingListScroller();

  const isEditMode = ref(false);

  const enterEditMode = async () => {
    isEditMode.value = true;

    await nextTick();
    scrollBottom();
  };

  const exitEditMode = () => {
    isEditMode.value = false;
    Object.assign(itemData, defaultItemData);
  };

  const defaultItemData = {
    name: '',
    price: null,
    quantity: 1,
  };

  const itemData = reactive({
    name: '',
    price: null,
    quantity: 1,
  });

  const addItemToShoppingList = async () => {
    const item = new ShoppingListItem({
      name: itemData.name,
      price: Number(itemData.price),
      quantity: itemData.quantity,
    });

    addToShoppingList(item);

    // exitEditMode();
    Object.assign(itemData, defaultItemData);

    await nextTick();
    scrollBottom();
  };
</script>
