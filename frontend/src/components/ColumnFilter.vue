<template>
    <div class="filter-container">
      <button @click="toggleColumnOptions" class="filter-btn">Filtrar</button>
      <div v-show="showColumnOptions" class="filter-options">
        <label v-for="(value, key) in visibleColumns" :key="key">
          <input type="checkbox" v-model="visibleColumns[key]" />
          {{ capitalizeFirstLetter(key) }}
        </label>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      visibleColumns: Object,
    },
    data() {
      return {
        showColumnOptions: false,
      };
    },
    methods: {
      toggleColumnOptions() {
        this.showColumnOptions = !this.showColumnOptions;
      },
      capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
    },
  };
  </script>
  