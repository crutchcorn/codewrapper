<script lang="ts" setup>
import { Container, useContainerState } from "@codewrapper/vue";

const { ref, value } = useContainerState("<div>Test</div>\n\nTesting");
const setValue = (e: Event) => {
  value.value = (e.target as HTMLInputElement).value;
};
</script>

<template>
  <div>
    <h2>Base CodeMirror Editor</h2>
    <Container :ref="ref" />
    <h2>Vue Projected Value</h2>
    <pre>{{ value }}</pre>
    <h2>Vue setValue Usage</h2>
    <textarea :value="value" @input="setValue($event)" />
  </div>
</template>
