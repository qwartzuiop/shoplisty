<template>
  <component
    :is="iconsMap[name]"
    class="h-6 w-6"
  />
</template>

<script setup lang="ts">
  import {
    XMarkIcon,
    CheckIcon,
    PlusIcon,
    MinusIcon,
    EllipsisVerticalIcon,
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
  };
</script>
