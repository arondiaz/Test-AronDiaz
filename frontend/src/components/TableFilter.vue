<template>
    <div>
        <label>
            <input class="search" type="search" list="searchResults" name="q" placeholder="Buscar por nombre"
                v-model="searchTerm" @input="handleSearch(searchTerm)" @focus="showResults = true" />
        </label>

        <ul class="searchResults" v-show="showResults && searchResults.length > 0">
            <div class="results-container">
                <li v-for="user in searchResults.slice(0, 3)" :key="user.id"
                    @click="showUserModal(user); showResults = false" class="li">
                    {{ user.usuarioNombre }}
                </li>
            </div>
        </ul>


        <div v-if="selectedUser" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <div class="close-btn-container">
                    <button @click="closeModal">x</button>

                </div>
                <div v-show="selectedUser.imageUrl" class="image-container">
                    <img v-if="selectedUser.imageUrl" :src="selectedUser.imageUrl"
                        :alt="`${selectedUser.usuarioNombre} ${selectedUser.usuarioNombre}`" />
                </div>
                <div>
                    <h3><strong class="strong"> Nombre: </strong>{{ selectedUser.usuarioNombre }}</h3>
                <h3><strong class="strong"> Apellidos: </strong>{{ selectedUser.usuarioApellidoPaterno }} {{
                    selectedUser.usuarioApellidoMaterno }}</h3>
                <h3><strong class="strong"> Email: </strong>{{ selectedUser.usuarioEmail }}</h3>
                <h3><strong class="strong"> Telefono: </strong>{{ selectedUser.usuarioTelefono }}</h3>
                <h3><strong class="strong"> Registro número: </strong>{{ selectedUser.id }}</h3>

                </div>
                

            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch, onMounted, onUnmounted } from "vue";

export default {
    props: {
        users: {
            type: Array,
            required: true,
        },
    },
    setup(props) {
        const searchTerm = ref("");
        const searchResults = ref([]);
        const showResults = ref(false);
        const selectedUser = ref(null);

        const handleSearch = (term) => {
            if (term) {
                searchResults.value = props.users.filter((user) =>
                    user.usuarioNombre.toLowerCase().includes(term.toLowerCase())
                );
            } else {
                searchResults.value = [];
            }
            // console.log(searchResults.value.length > 1);
        };


        const showUserModal = (user) => {
            selectedUser.value = user;
            console.log(selectedUser);
        };

        const closeModal = () => {
            selectedUser.value = null;
        };


        const route = (id) => {
            console.log(id);
        };

        const handleClickOutside = (event) => {
            if (!event.target.closest(".search") && !event.target.closest(".searchResults")) {
                showResults.value = false;
            }
        };

        watch(searchTerm, handleSearch);

        onMounted(() => {
            document.addEventListener("click", handleClickOutside);
        });

        onUnmounted(() => {
            document.removeEventListener("click", handleClickOutside);
        });

        return {
            searchTerm,
            searchResults,
            handleSearch,
            route,
            showResults,
            closeModal,
            selectedUser,
            showUserModal,

        };
    },
};
</script>

<style scoped>
.search {
    padding: 0.5rem 0.8rem;
    border-radius: 1rem;
}

.searchResults {
    position: relative;
}

.results-container {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    max-width: 180px;
    border-radius: 0.2rem;
    background-color: white;
    border: 1px solid #e2e8f0;
    /* box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06); */
}

.results-container.hidden {
    display: none;
}

.li {
    margin: 0.3rem 0.5rem;
    list-style-type: none;
    cursor: pointer;
    color: black;
}

ul li:nth-child(even) {
    background-color: rgb(219, 218, 218);
    color: #333;
}


.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}



.modal-content {
    background-color: #fff;
    border-radius: 10px;
    width: 90%;
    max-width: 500px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    text-align: center;
}


.close-btn-container {
    display: flex;
    justify-content: flex-end;
}

.close-btn-container button {
    padding: 0.5rem;
    border-radius: 50%;
    border: none;
    background-color: #ff4d4d;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.close-btn-container button:hover {
    background-color: #ff3333;
    transform: scale(1.1);
}

.close-btn-container button:active {
    transform: scale(0.9);
}

.image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -10px;
}

.image-container img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
}

h3 {
    font-size: 1.2rem;
    margin: 0.5rem 0;
    color: #333;
    font-weight: lighter;
}

.strong {
    font-weight: 700;
}
</style>
