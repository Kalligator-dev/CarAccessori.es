import { createApp } from "vue";
import App from "./App.vue";
import store from './store/store'
import router from './router'
import BaseIcon from "./components/ui/BaseIcon";
import BaseCard from "./components/ui/BaseCard";


const app = createApp(App);
app.use(store)
app.use(router)
app.component('base-icon', BaseIcon)
app.component('base-card', BaseCard)


app.mount("#app");
