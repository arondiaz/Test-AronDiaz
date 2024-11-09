<template>
  <div class="container">
    <div class="filter-container">
      <TableFilter :users="users" />
    </div>
    <div class="header">
      <div class="column-toggle">
        <button @click="toggleColumnOptions" class="display-btn">
          Display
        </button>
        <div v-show="showColumnOptions" class="column-options">
          <label v-for="(value, key) in visibleColumns" :key="key">
            <input type="checkbox" v-model="visibleColumns[key]" />
            {{ capitalizeFirstLetter(key) }}
          </label>
        </div>
      </div>
    </div>
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th v-if="visibleColumns.id">ID</th>
            <th v-if="visibleColumns.nombre">Nombre</th>
            <th v-if="visibleColumns.apellidos">Apellidos</th>
            <th v-if="visibleColumns.telefono">Telefono</th>
            <th v-if="visibleColumns.email">Email</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id">
            <td v-if="visibleColumns.id">{{ user.id }}</td>
            <td v-if="visibleColumns.nombre">{{ user.usuarioNombre }}</td>
            <td v-if="visibleColumns.apellidos">{{ user.usuarioApellidoPaterno + " " + user.usuarioApellidoMaterno }}
            </td>
            <td v-if="visibleColumns.telefono">{{ user.usuarioTelefono }}</td>
            <td v-if="visibleColumns.email">{{ user.usuarioEmail }}</td>

            <td>
              <div class="image-container">
                <img v-if="user.imageUrl" :src="user.imageUrl" :alt="`${user.nombre} ${user.apellidos}`" />
                <div v-else class="placeholder"></div>
                <input type="file" accept="image/*" @change="handleImageUpload(user.id, $event)" class="file-input"
                  :id="'image-upload-' + user.id" />
                <label :for="'image-upload-' + user.id" class="upload-label">

                  Foto </label>
              </div>
            </td>
            <td>
              <button @click="deleteUser(user.usuarioEmail)" class="delete-btn">
                ✖︎
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
import TableFilter from './TableFilter.vue';

export default {
  components: {
    TablePagination,
    TableFilter,
  },
  setup() {
    const users = ref(JSON.parse(localStorage.getItem('users')) || []);
    const currentPage = ref(0);
    const itemsPerPage = 4;
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
      console.log(email);
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
        const data = await getUsers();
        users.value = data.map((user, index) => ({
          ...user, id: index + 1,
        }))
      }
      // else {
      //   users.value = storedUsers;
      // }

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

<style scoped>
.filter-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  padding: 20px;
  max-width: 80%;
}


.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}


.header h1 {
  font-size: 24px;
  font-weight: bold;
}

.display-btn {
  background-color: black;
  color: white;
  border-radius: 1rem;
  margin-bottom: 1rem;
}

.column-toggle {
  position: relative;
  display: inline-flex;

}

.column-toggle button {
  padding: 0.5rem 1rem;
  font-size: 14px;
  cursor: pointer;
  margin-left: auto;
}

.column-options {
  position: absolute;
  right: 0;
  top: 36px;
  width: 150px;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

}

.check {
  margin-right: 0.5rem;
  cursor: pointer;
}

.table-container {
  overflow-x: auto;
  background-color: var(--dark-blue);
  border: 1px solid black;
  /* Background color for the table container */
}


.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 12px;
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
  border: 1px solid black;

}

.placeholder {
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
</style>