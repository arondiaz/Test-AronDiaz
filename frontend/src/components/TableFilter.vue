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
                <h3>{{ selectedUser.usuarioNombre }}</h3>
                <p>Información adicional del usuario aquí...</p>
                <button @click="closeModal">Cerrar</button>
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
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;
}
</style>
