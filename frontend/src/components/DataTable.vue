<template>

  <div>
    <div class="search-container">
      <TableFilter :users="users" :visibleColumns="visibleColumns" />
    </div>
    <div class="header-container">
      <ColumnFilter :visibleColumns="visibleColumns" />
    </div>
    <TableUser :users="users" :paginatedUsers="paginatedUsers" :visibleColumns="visibleColumns"
      :handleImageUpload="handleImageUpload" :deleteUser="deleteUser" />
    <div class="pagination-container">
      <TablePagination :currentPage="currentPage" :totalUsers="totalUsers" :itemsPerPage="itemsPerPage"
        @page-change="setCurrentPage" />
    </div>
  </div>

</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import { getUsers } from '../../data/api.js';
import TablePagination from './TablePagination.vue';
import TableUser from './TableUser.vue';
import TableFilter from './TableFilter.vue';
import ColumnFilter from './ColumnFilter.vue';

export default {
  components: {
    TablePagination,
    TableUser,
    TableFilter,
    ColumnFilter,
  },
  setup() {
    const users = ref(JSON.parse(localStorage.getItem('users')) || []);
    const error = ref("");
    const currentPage = ref(0);
    const itemsPerPage = 10;
    const visibleColumns = ref({
      id: true,
      nombre: true,
      apellidos: true,
      telefono: true,
      email: true,
    });
    const showColumnOptions = ref(false);

    const toggleColumnOptions = () => {
      showColumnOptions.value = !showColumnOptions.value;
    };

    const deleteUser = (email) => {
      users.value = users.value.filter(user => user.usuarioEmail !== email);
      localStorage.setItem('users', JSON.stringify(users.value));
    };

    const handleImageUpload = (id, event) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          users.value = users.value.map((user) =>
            user.id === id ? { ...user, imageUrl: reader.result } : user
          );
        };
        reader.readAsDataURL(file);
      }
    };

    const fetchData = async () => {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      if (storedUsers.length === 0) {
        try {
          const data = await getUsers();
          if (data.length == 0) {
            return error.value = "Error al obtener usuarios, intente nuevamente"
          }
          users.value = data.map((user, index) => ({
            ...user, id: index + 1,
          }))
        } catch (error) {
          console.log("Error al obtener usuarios", error);
          error.value = "Hubo un problema al cargar los usuarios"
        }
      }
    };

    const startIdx = () => currentPage.value * itemsPerPage;

    const paginatedUsers = computed(() => {
      return users.value.slice(startIdx(), startIdx() + itemsPerPage);
    });
    const totalUsers = computed(() => users.value.length);

    const setCurrentPage = (page) => {
      currentPage.value = page;
    };

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    onMounted(() => {
      fetchData();
    });

    watch(users, () => {
      localStorage.setItem('users', JSON.stringify(users.value));
    });

    return {
      users,
      error,
      currentPage,
      itemsPerPage,
      visibleColumns,
      showColumnOptions,
      toggleColumnOptions,
      deleteUser,
      handleImageUpload,
      paginatedUsers,
      totalUsers,
      setCurrentPage,
      capitalizeFirstLetter,
    };
  },
};
</script>


<style>
.data-table-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  padding: 1rem;
  max-width: 80%;
  background-color: var(--background-color);
}

.search-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.header-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

}

.filter-container {
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #014083;
  border: none;
  border-radius: 0.7rem;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.filter-btn:hover {
  background-color: #1159a7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.filter-options {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  padding: 0.5rem;
  width: 150px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.filter-options label {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: #333;
  padding: 0.3rem 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.filter-options label:hover {
  background-color: #f0f8ff;
}

.filter-options input[type="checkbox"] {
  margin-right: 0.5rem;
  accent-color: #007bff;
}

.table-container {
  overflow-x: auto;
  background-color: var(--dark-blue);
  border: 1px solid var(--text-color);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 0.8rem;
  text-align: center;
  background-color: var(--light-blue);
  border-bottom: 1px solid #ddd;
}

.data-table th {
  background-color: #f7f7f7;
  text-transform: uppercase;
  font-size: 0.9rem;
  color: #555;
}

.image-container {
  display: flex;
  align-items: center;
}

.image-container img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.image-container .file-input {
  display: none;
}

.image-container .upload-label {
  margin-left: 8px;
  font-size: 1rem;
  color: var(--dark-blue);
  cursor: pointer;
  font-weight: 700;
  background-color: #f7f7f700;
  padding: 0.5rem 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--dark-blue);

}

.image-display {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
}

.delete-btn {
  color: var(--dark-red);
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
}

.hidden {
  display: none;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.error-message {
  color: red;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem;
}
</style>
