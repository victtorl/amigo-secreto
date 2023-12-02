import { createWebHistory, createRouter } from "vue-router";
import ListaregalosVue from "../components/Listaregalos.vue";


const routes = [
    { path: "/", component: ListaregalosVue },

];

const history = createWebHistory();

const router = createRouter({
    history,
    routes,
});

export default router;