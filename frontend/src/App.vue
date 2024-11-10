<template>
  <div class="containerr" :data-theme="theme">
    <div class="theme-container">
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


<style scoped>
* {
  box-sizing: border-box;

}

body {
  margin: 0;
  padding: 0;
  text-decoration: none;
  background-color: var(--background-color);

}

.app {
  min-height: 100vh;
  display: flex;
  justify-content: center;

}

.containerr {
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
}

.theme-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

[data-theme="light"] {
  --background-color: #a3a3a3;
  --text-color: #000000;
}

/* Tema oscuro */
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


</style>
