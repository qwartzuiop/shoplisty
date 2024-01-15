<template>
  <li
    class="grid grid-flow-col items-center justify-start border-b border-neutral-100 px-3 py-2 last-of-type:border-0"
  >
    <span>{{ count + '.' }}</span>

    <span>{{ item.name }}</span>

    <span class="text-end">
      <span>
        {{ item.quantity }}
      </span>

      <span>&nbsp;&nbsp;&times;&nbsp;&nbsp;</span>
    </span>

    <span class="overflow-hidden text-ellipsis">
      {{ item.price }}
    </span>

    <span class="overflow-hidden text-ellipsis">
      <span>&nbsp;&nbsp;=&nbsp;&nbsp;</span>
      <span>{{ item.totalPrice }}</span>
    </span>

    <popover-wrapper class="relative">
      <popover-button
        as="button"
        class="base-button h-6 w-6 p-0 text-neutral-600"
      >
        <base-icon
          class="h-4 w-4 stroke-2"
          name="dots-v"
        />
      </popover-button>

      <transition
        enter-active-class="transition duration-75"
        enter-from-class="opacity-0 scale-50"
        leave-active-class="transition"
        leave-to-class="opacity-0 scale-50"
      >
        <popover-panel
          as="ul"
          class="absolute -bottom-1 right-0 z-30 w-32 origin-top-right translate-y-full rounded-[0.875rem] bg-neutral-50 p-2 shadow-md"
        >
          <li class="flex items-center">
            <base-button
              class="w-1/2 rounded-r-none !p-2"
              appearance="secondary"
              icon-name="minus"
              icon-class="stroke-[2.5px] !h-4 !w-4"
              :disabled="item.quantity === 1"
              @click="updateItemQuantity(item.quantity - 1)"
            />

            <base-button
              class="w-1/2 rounded-l-none !p-2"
              appearance="secondary"
              icon-name="plus"
              icon-class="stroke-[2.5px] !h-4 !w-4"
              @click="updateItemQuantity(item.quantity + 1)"
            />
          </li>

          <hr class="my-2" />

          <li>
            <base-button
              class="w-full !p-1 font-normal text-red-400"
              label="Delete"
              appearance="text"
              icon-name="trash"
              icon-class="stroke-2 h-4 w-4 ml-auto"
              @click="removeFromShoppingList(item)"
            />
          </li>
        </popover-panel>
      </transition>
    </popover-wrapper>
  </li>
</template>

<script setup lang="ts">
  import {
    Popover as PopoverWrapper,
    PopoverButton,
    PopoverPanel,
  } from '@headlessui/vue';
  import BaseButton from '@/components/base/BaseButton.vue';
  import BaseIcon from '@/components/base/BaseIcon.vue';
  import { useShoppingListStore } from '@/stores/shoppingList';
  import type { ShoppingListItem } from '@/types/shoppingList';

  withDefaults(
    defineProps<{
      item: ShoppingListItem;
      count?: number;
    }>(),
    {
      count: 1,
    }
  );

  const emit = defineEmits<{
    (e: 'update:item', update: Partial<ShoppingListItem>): void;
  }>();

  const updateItemQuantity = (newQuantity: number) => {
    emit('update:item', { quantity: newQuantity });
  };

  const { removeFromShoppingList } = useShoppingListStore();
</script>
