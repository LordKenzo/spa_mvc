import { throwError } from "./Utils";

/* route è il tipo che definisce
una tupla <Nome Pagina, URL Associata> che userò in routes
*/

type route = {pageName:string, pageURL:string}

export class Router{

  private routes: Array<route> = [];

  constructor(public appSelector: string){
    if(!document.querySelector(this.appSelector)){
      throwError(`Elemento Applicazione ${appSelector} non valido!`);
    }
    window.addEventListener('hashchange', e => {
      console.debug('#Hash Nuovo url:', location.href);
      this.hashChange();
    });
  }

  addRoute(pageName: string, pageURL: string){
    this.routes.push({
      pageName,
      pageURL
    })
  }

  hashChange(){
    const hash = window.location.hash.toLocaleLowerCase();
    const app = document.querySelector(this.appSelector);
    if(app){
      const route : route[] = this.routes
        .filter(route => {
          const test = hash.match(new RegExp(route.pageURL.toLocaleLowerCase()));
          if (test){
            return test[0];
          }
        });
      if(route.length>0){
        const hashChanged = new CustomEvent("hashChanged", {
          detail: {
            pageName: route[0].pageName
          }
        });


        app.dispatchEvent(hashChanged);

      } else {
        const hashChanged = new CustomEvent("404", {
          detail: {
            pageName: `<h1>404 Page Not Found</h1>`
          }
        });
        app.dispatchEvent(hashChanged);
      }
    }
  }
}