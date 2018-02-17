import { App } from "./lib/App";
import { Page } from "./lib/Page";
import { Router } from "./lib/Router";

const app = new App("#app");
const router = new Router('#app');
const pagina1 = new Page("Pagina1");
const pagina2 = new Page("Pagina2");

app.addPage(pagina1);
app.addPage(pagina2);

router.addRoute(pagina1.pageName, "pagina1");
router.addRoute(pagina2.pageName, "pagina2")