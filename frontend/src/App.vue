<template>
  <div class="container" :data-theme="theme">
    <div class="btn-theme-container">
      <button @click="toggleTheme" class="btn-theme">{{ theme === "dark" ? "LIGHT" : "DARK" }}</button>
    </div>
    <DataTable class="app" />
  </div>
</template>

<script setup>
import DataTable from "./components/DataTable.vue";
import { ref, onMounted, watch } from 'vue';

const theme = ref(localStorage.getItem('theme') || 'dark');
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', theme.value);

  return theme;
};

onMounted(() => {
  document.documentElement.setAttribute('data-theme', theme.value);
});
watch(theme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme);
});

</script>


<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  text-decoration: none;
  background-color: var(--background-color);
}

.app {
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.container {
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
}

.btn-theme-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

[data-theme="light"] {
  --background-color: #f5f5f5;
  --text-color: #000000;
}

[data-theme="dark"] {
  --background-color: #000000;
  --text-color: #ffffff;
}

.btn-theme {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-theme:hover {
  background-color: #555;
}

/* scrollbar */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: var(--background-color);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: var(--dark-blue);
  border-radius: 10px;
  border: 2px solid var(--background-color);
}
</style>
