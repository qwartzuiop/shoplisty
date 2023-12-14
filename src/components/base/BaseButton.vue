<template>
  <button
    class="base-button"
    :class="[labelColor, backgroundColor, iconName && label ? 'pr-2' : 'pr-3']"
    :type="type"
  >
    <slot name="leading" />

    <span
      v-if="label"
      class="leading-none"
      :class="{ '-mt-0.5': iconName }"
    >
      {{ label }}
    </span>

    <base-icon
      v-if="iconName"
      :name="iconName"
      :class="iconClass"
    />

    <slot name="trailing" />
  </button>
</template>

<script setup lang="ts">
  import { computed, type ButtonHTMLAttributes } from 'vue';
  import BaseIcon from '@/components/base/BaseIcon.vue';

  const props = withDefaults(
    defineProps<{
      label?: string;
      type?: ButtonHTMLAttributes['type'];
      appearance?: 'primary' | 'secondary' | 'text';
      iconName?: string;
      iconClass?: string;
    }>(),
    {
      label: '',
      type: 'button',
      appearance: 'primary',
      iconName: '',
      iconClass: '',
    }
  );

  const labelColor = computed(() => {
    switch (props.appearance) {
      case 'primary':
        return 'text-neutral-50';
      case 'secondary':
        return 'text-neutral-600';
      case 'text':
        return 'text-current';
      default:
        return 'text-neutral-50';
    }
  });

  const backgroundColor = computed(() => {
    switch (props.appearance) {
      case 'primary':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'secondary':
        return 'bg-neutral-200 hover:bg-neutral-300';
      case 'text':
        return 'bg-transparent hover:bg-neutral-100';
      default:
        return 'bg-blue-500';
    }
  });
</script>
