<script setup lang="ts">
import { VNodeRef } from "vue";
import { Container as ContainerBase } from "@codewrapper/templating-base/vue";
import { setElement } from "@codewrapper/core";

// const callback: VNodeRef = (el) => setElement(el as HTMLElement)
const callback: VNodeRef = (el) => {};
</script>

<template>
  <ContainerBase :ref="callback" />
</template>
