import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { useContext } from "./context";
import "./assets/main.css";

const app = createApp(App);

useContext(app);
app.use(createPinia());
app.mount("#app");
