import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { createContext } from "./context";
import "./assets/main.css";

const app = createApp(App);

createContext(app);
app.use(createPinia());
app.mount("#app");
