import { Component } from "./Component";

interface IComponent {
  name: string;
  template: string;
}

export class Page {

  private components: {[index: string]:IComponent | any} = {};
  private customTags: {[index: string]: string} = {};

  constructor(public pageName: string){
  }

  addComponent(component: IComponent | any){
    this.components[component.name] = component;
    this.customTags[component.name] = generateHtml(component.template)(component);
  }

  renderPage(): string{
    let render: string = '';
    for(let component in this.components){
      render += this.customTags[component];

    }

    return render;
  }
}

function generateHtml(html:string){
  return function(data:any){

    const metodi = html.match(/{{[a-zA-Z][a-zA-Z0-9]+\(\)}}/g);
    if(metodi){
      metodi.map(x => {
        const nomeMetodo = x.match(/([a-zA-Z0-9])+/g);
        if(nomeMetodo){
          html = html.replace(x, data[nomeMetodo[0]]());

        }
      })
    }

    for(var x in data){
      var re = "{{\\s?" + x + "\\s?}}";
      html = html.replace(new RegExp(re, "ig"), data[x]);
    }

    const espressioni = html.match(/{{(.*)}}+/);
    if(espressioni){
      espressioni.map(x => {
        html = html.replace(`{{${x}}}`, `${eval(x)}`);
      })
    }
    return html;
  };
};