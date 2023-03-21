import { LightningElement } from 'lwc';

export default class LifeCycleParent extends LightningElement {
    isChildVisible = false
    constructor(){ 
        super()
        console.log("parent constructor called")
    }
    connectedCallback(){ 
        console.log("parent connectedCallback called")
        this.isChildVisible = false;
    }
    renderedCallback(){ 
        console.log("parent renderedCallback called")
        
    }

    name
    changeHandler(event){
        this.name = event.target.value
    }
    handleClick(){ 
        this.isChildVisible = !this.isChildVisible
    }

   errorCallback(error,stack){
         console.log(error.message);
         console.log(stack)
    }
}