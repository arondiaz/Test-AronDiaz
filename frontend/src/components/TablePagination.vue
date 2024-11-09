<template>
    <div class="pagination">
      <button
        class="btn btn-previous"
        @click="handlePrevious"
        :disabled="currentPage === 0"
      >
        Anterior
      </button>
      <button
        class="btn btn-next"
        @click="handleNext"
        :disabled="currentPage === totalPages - 1"
      >
        Siguiente
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true,
      },
      totalUsers: {
        type: Number,
        required: true,
      },
      itemsPerPage: {
        type: Number,
        required: true,
      },
      onPageChange: {
        type: Function,
        required: true,
      },
    },
    computed: {
      totalPages() {
        return Math.ceil(this.totalUsers / this.itemsPerPage);
      },
    },
    methods: {
      handlePrevious() {
        if (this.currentPage > 0) {
          this.onPageChange(this.currentPage - 1);
        }
      },
      handleNext() {
        if (this.currentPage < this.totalPages - 1) {
          this.onPageChange(this.currentPage + 1);
        }
      },
    },
  };
  </script>
  
  <style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.btn {
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 1rem;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.btn:disabled {
  background-color: #ccc; 
  color: #818181; 
  cursor: not-allowed;
  opacity: 0.8;
}

.btn-previous {
  background-color: rgb(139, 4, 4);
}

.btn-next {
  background-color: rgb(0, 4, 216);
}
  </style>
  