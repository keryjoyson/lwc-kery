import { LightningElement, wire, track } from 'lwc';
import getAccountNames from '@salesforce/apex/accountListClass.accMethod';

export default class AccountList extends LightningElement {
    @track accountNames = [];
    @track searchTerm = '';
   
    

    @wire(getAccountNames)
    wiredAccountNames({ error, data }) {
        if (data) {
            this.accountNames = data;
        } else if (error) {
            console.error(error);
        }
    }

    handleSearchChange(event) {
        this.searchTerm = event.target.value;
    }

    get filteredAccountNames() {
        return this.accountNames.filter(account =>
            account.Name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    
}
