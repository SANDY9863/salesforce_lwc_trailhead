import {LightningElement,api,track,wire} from 'lwc';
import numGenerator  from '@salesforce/apex/testData.saveAccount';
import timeIndicator from '@salesforce/apex/testData.lastupdatedtime';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class hexaCode extends LightningElement {
    @api recordId;
    @track rating;
    @track newVal;
    @track accounts;
    @track errorMsg;
    @track showConfirmDialog = true;
    @track Buttontrue;


 /*   @wire(timeIndicator,{AccountRec: '$recordId'})
    lasttime({ error, data }){
            if(data){
                var val = data;
                if(val === true){
                    this.Buttontrue = true;
                    const evt = new ShowToastEvent({
                        title: 'Info',
                        message: 'Button is disabled since the number is generated in last 24 hours',
                        variant: 'info',
                        mode: 'dismissable'
                    });
                    this.dispatchEvent(evt); 
                    
                }
            }
            if(error){
                console.log(error);
            }
    } */

    handleClick(){  
        this.showConfirmDialog = true;
        this.Buttontrue = true;
    }

    handleConfirmDialogYes(){
        this.showConfirmDialog = false;
        numGenerator({AccountRec: this.recordId})
        .then(result =>{
            this.accounts = result.accRecord;
           eval("$A.get('e.force:refreshView').fire();");
        })
        .then(error =>{
            this.errorMsg = error;
        });
        const evt = new ShowToastEvent({
            title: 'Success',
            message: 'New value has been Generated',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);

    }
    handleConfirmDialogNo(){
        this.showConfirmDialog = false;
        this.dispatchEvent(new CloseActionScreenEvent());
    }
    closeQuickAction() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }
}