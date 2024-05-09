import { LightningElement } from 'lwc';
import createNewAccount from '@salesforce/apex/AccountRestService.createNewAccount'
import createNewAccountNormal from '@salesforce/apex/AccountRestService.createNewAccountNormal';

export default class CreateAccountLWC extends LightningElement {
    accountName ='';
    result = '';

    handleCreateAccount(){
        console.log( this.accountName);
        if(this.accountName){
            createNewAccount({accName:this.accountName})
            .then((result)=>{
                this.result = result;
                this.accountName = '';
            }).catch((error)=>{
                console.log('error: ',error);
            })
        }
    }

    createNewAccountNormal(){
        console.log( this.accountName);
        if(this.accountName){
            createNewAccountNormal({accName:this.accountName})
            .then((result)=>{
                this.result = result;
                this.accountName = '';
            }).catch((error)=>{
                console.log('error: ',error);
            })
        }
    }

    handleChange(event){
        this.accountName = event.target.value;
    }
}