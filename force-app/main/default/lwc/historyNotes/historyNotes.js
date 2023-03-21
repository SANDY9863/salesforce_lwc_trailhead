import { LightningElement ,api, wire, track} from 'lwc';
import getAccountList from '@salesforce/apex/AccountHelper.getAccountList';

export default class HistoryNotes extends LightningElement {
    @track columns = [{
        label: 'Account name',
        fieldName: 'Name',
        type: 'text',
        sortable: true
    },
    {
        label: 'Type',
        fieldName: 'Type',
        type: 'text',
        sortable: true
    },
    {
        label: 'Annual Revenue',
        fieldName: 'AnnualRevenue',
        type: 'Currency',
        sortable: true
    },
    {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone',
        sortable: true
    },
    {
        label: 'Website',
        fieldName: 'Website',
        type: 'url',
        sortable: true
    },
    {
        label: 'Rating',
        fieldName: 'Rating',
        type: 'test',
        sortable: true
    }
];

@track error;
@track accList ;
    @wire(getAccountList)
    wiredAccounts({
        error,
        data
    }) {
        if (data) {
            this.accList = data;
        } else if (error) {
            this.error = error;
        }
    }
    keyword
    handleKeyWordChange(event){
        this.keyword = event.target.value;
        this.searchAll();
    }

    searchAll() {
        let searchStr = this.keyword.toLowerCase();
        const regex = new RegExp(
            "(^" + searchStr + ")|(." + searchStr + ")|(" + searchStr + "$)"
        );
        if (searchStr.length > 2) {
            this.searchable = this.data.filter((item) => {
                
                    regex.test(
                        item.caseData.CaseNumber.toLowerCase() +
                            " " +
                            item.caseData.CaseNumber.toLowerCase()
                    ) 
                ) {
                    return item;
                }
            });
        
    }
    
}