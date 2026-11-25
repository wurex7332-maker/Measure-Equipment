<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);

function increase(): void {
  count.value += 1;
}
</script>

<template>
  <main class="app">
    <h1>量仪管理</h1>
    <p data-testid="hint">首期骨架已就绪，业务页面将在后续需求中分级实现。</p>
    <p data-testid="count">点击次数：{{ count }}</p>
    <el-button type="primary" @click="increase">点击</el-button>
  </main>
</template>

<style scoped>
.app {
  max-width: 720px;
  margin: 0 auto;
  padding: 48px 16px;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  color: var(--el-text-color-primary);
}
</style>
