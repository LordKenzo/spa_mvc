export function Component(options: {
  tag: string,
  template: string
}){
  return function<T extends { new(...args:any[]):any }>(constructor: T){
    return class extends constructor{
      template = options.template;

      renderComponent(){
        return this.template;
      }
    }
  }
}
