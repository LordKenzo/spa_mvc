import { throwError } from "./Utils";
import { Page } from "./Page";

export class App extends HTMLElement{

  private htmlElement: HTMLElement | null;
  private pages: {[index: string]: Page} = {};
  private root: ShadowRoot;
  private currentPage: Page | null = null;


  constructor(public selector: string){
    super();
    this.root = this.attachShadow({mode:"open"});
    this.htmlElement = document.querySelector(selector);
    if(!this.htmlElement){
      throwError(`Elemento ${selector} non presente nel tuo HTML.`);
    } else {
      this.htmlElement.addEventListener('hashChanged', (e) => {
        const customevt: CustomEvent = e as CustomEvent;
        this.showPage(customevt.detail.pageName)
      }, true);
      this.htmlElement.addEventListener('404', (e) => {
        const customevt: CustomEvent = e as CustomEvent;
        this.showError(customevt.detail.pageName)
      }, true);
    }
  }

  public addPage(page: Page){
    this.pages[page.pageName] = page;
  }

  public showPage(pageName: string){
    if(!this.pages[pageName]){
      throwError(`Pagina ${pageName} non presente in Applicazione.`);
    }
    this.currentPage = this.pages[pageName];
    this.updateView();
  }

  public updateView(){
    if(this.htmlElement){
      if(this.currentPage)
        this.htmlElement.innerHTML = this.currentPage.renderPage();
    }

  }

  public showError(error: string){
    if(this.htmlElement){
      this.htmlElement.innerHTML = error;
    }

  }

}

customElements.define('mini-app', App);