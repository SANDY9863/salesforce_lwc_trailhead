import {LightningElement,wire,api,track} from 'lwc';
import numGenerator from '@salesforce/apex/generateRandom.saveAccount';

export default class GenerateRandomValue extends LightningElement {
    @api recordId;
    @track Account;
    @track newVal;

    @wire(numGenerator, {AccountRec: $recordId})
    getnum(data,error){
        if(data){
            this.Account = data;
            this.error = undefined;
        }else{
            this.error = error;
            this.contacts = undefined;
        }

       
    }
}