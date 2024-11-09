<script setup>
import DataTable from "./components/DataTable.vue";
</script>

<template>
  <DataTable class="app" />
</template>

<style scoped>
* {
  box-sizing: border-box;

}

body {
  margin: 0;
  padding: 0;
  text-decoration: none;

}

.app {
  min-height: 100vh;
  display: flex;
  justify-content: center;
}
</style>
