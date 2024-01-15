<template>
  <component
    :is="iconsMap[name]"
    class="base-icon"
  />
</template>

<script setup lang="ts">
  import {
    XMarkIcon,
    CheckIcon,
    PlusIcon,
    MinusIcon,
    EllipsisVerticalIcon,
    TrashIcon,
  } from '@heroicons/vue/24/outline';
  import type { FunctionalComponent } from 'vue';

  defineProps<{
    name: string;
  }>();

  const iconsMap: Record<string, FunctionalComponent> = {
    'x-mark': XMarkIcon,
    check: CheckIcon,
    plus: PlusIcon,
    minus: MinusIcon,
    'dots-v': EllipsisVerticalIcon,
    trash: TrashIcon,
  };
</script>
