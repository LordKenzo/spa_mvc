import {App, Component, Page, Router} from './lib';

const app = new App("#app");

const pagina1 = new Page("Pagina1");
const pagina2 = new Page("Pagina2");
app.addPage(pagina1);
app.addPage(pagina2);

const router = new Router('#app');
router.addRoute(pagina1.pageName, "pagina1");
router.addRoute(pagina2.pageName, "pagina2");

@Component({
  tag: 'componente1',
  template: `<h1>{{6+2}} {{name}} {{clickMe()}} {{toString()}}</h1>
  <componente2></componente2><componente3></componente3>`
})
class Componente1{
  constructor(public name: string){}
  clickMe(){
    return 'Lorenzo';
  }
  toString(){
    return 'Arieccoce'
  }
}
pagina1.addComponent(new Componente1("componente1"));

@Component({
  tag: 'componente2',
  template: `<p>Ciao ${2+2}</p>`
})
class Componente2{
  constructor(public name: string){}

}
pagina1.addComponent(new Componente2("componente2"));

@Component({
  tag: 'componente3',
  template: `<p>{{name}} {{click()}}</p>`
})
class Componente3{
  constructor(public name: string){

  }
  click(){
    //setTimeout(() => 'Lorenzo', 1000);
    return 'Lorenzo Franceschini ;)'
  }
}
pagina1.addComponent(new Componente3("componente3"));

