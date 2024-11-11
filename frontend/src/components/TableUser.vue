<template>
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th v-if="visibleColumns.id">ID</th>
            <th v-if="visibleColumns.nombre">Nombre</th>
            <th v-if="visibleColumns.apellidos">Apellidos</th>
            <th v-if="visibleColumns.telefono">Telefono</th>
            <th v-if="visibleColumns.email">Email</th>
            <th>Imagen</th>
            <th></th>
          </tr>
        </thead>
  
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id">
            <td v-if="visibleColumns.id">{{ user.id }}</td>
            <td v-if="visibleColumns.nombre">{{ user.usuarioNombre }}</td>
            <td v-if="visibleColumns.apellidos">{{ user.usuarioApellidoPaterno + " " + user.usuarioApellidoMaterno }}</td>
            <td v-if="visibleColumns.telefono">{{ user.usuarioTelefono }}</td>
            <td v-if="visibleColumns.email">{{ user.usuarioEmail }}</td>
            <td>
              <div class="image-container">
                <img v-if="user.imageUrl" :src="user.imageUrl" :alt="`${user.nombre} ${user.apellidos}`" />
                <div v-else class="image-display"></div>
                <input type="file" accept="image/*" @change="handleImageUpload(user.id, $event)" class="file-input" :id="'image-upload-' + user.id" />
                <label :for="'image-upload-' + user.id" class="upload-label">Foto</label>
              </div>
            </td>
            <td>
              <button @click="deleteUser(user.usuarioEmail)" class="delete-btn">✖︎</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      users: Array,
      paginatedUsers: Array,
      visibleColumns: Object,
      handleImageUpload: Function,
      deleteUser: Function,
    },
  };
  </script>
  