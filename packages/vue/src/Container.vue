<script setup lang="ts">
import { VNodeRef } from "vue";
import {Container as ContainerBase} from "@mitosis.template/templating-base/vue";
import { setElement } from "@mitosis.template/core";

const callback: VNodeRef = (el) => setElement(el as HTMLElement)
</script>

<template>
  <ContainerBase :ref="callback"/>
</template>
