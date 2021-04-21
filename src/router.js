import { createRouter, createWebHistory } from "vue-router";
import Shop from "./components/pages/Shop";
import Cart from "./components/pages/Cart";
import Err from "./components/pages/404";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Shop, name: "main" },
    { path: "/cart", component: Cart, name: "cart" },
    { path: '/:notFound(.*)', component: Err, name: "404" },
  ],
});

export default router;
