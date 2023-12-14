<template>
  <section class="grid h-full grid-rows-[min-content]">
    <header
      class="flex items-center gap-2 border-b border-neutral-100 px-3 py-2"
    >
      <span>{{ todayDateString }}</span>

      <base-button
        v-if="shoppingList.length"
        class="ml-auto py-1"
        label="Clear"
        appearance="text"
        @click="clearShoppingList"
      />
    </header>

    <main class="flex flex-col overflow-auto">
      <ul
        ref="shoppingListRef"
        class="flex-1 overflow-auto"
      >
        <list-item
          v-for="(item, index) in shoppingList"
          :key="item.id"
          class="grid-cols-[3ch_1fr_6ch_5ch_8ch_24px]"
          :item="item"
          :count="index + 1"
          @update:item="updateItem($event, index)"
        />

        <li
          v-if="!shoppingList.length"
          class="grid h-full w-full items-center justify-center"
        >
          <span>Your list is empty</span>
        </li>
      </ul>

      <list-footer />
    </main>
  </section>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeMount } from 'vue';
  import BaseButton from '@/components/base/BaseButton.vue';
  import ListItem from '@/components/shoppingList/ListItem.vue';
  import ListFooter from '@/components/shoppingList/ListFooter.vue';
  import { useShoppingListStore } from '@/stores/shoppingList';
  import { useShoppingListScroller } from '@/composables/useShoppingListScroller';

  const {
    shoppingList,
    updateItem,
    clearShoppingList,
    initShoppingListFromLocalStorage,
  } = useShoppingListStore();

  const { setShoppingListRef } = useShoppingListScroller();

  onBeforeMount(initShoppingListFromLocalStorage);

  onMounted(() => setShoppingListRef(shoppingListRef));

  const shoppingListRef = ref<HTMLUListElement>();

  const todayDate = new Date();

  const todayDateString = todayDate.toLocaleString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
</script>
