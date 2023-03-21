 // Source : lwcFactory.com
 import { LightningElement } from 'lwc';
 import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
 // import jquery & dataTables library from static resource
 import Jquery331 from '@salesforce/resourceUrl/Jquery331';
 import dataTable from '@salesforce/resourceUrl/DataTableDemo';
 // import apex class method from salesforce module 
 import fetchOpportunity from '@salesforce/apex/JQueryDataTableCtrl.fetchOpportunity';
 
 export default class JQueryDataTablesDemo extends LightningElement {
 
     recordsQueried = [];  // array property to store list of Opportunity 
   
     // The connectedCallback() lifecycle hook fires when a component is inserted into the DOM.
     async connectedCallback() {
        // call apex class method which will return the list<Opportunity>
        // assign returned list of records to ‘recordsQueried’ property    
        console.log("inside async call");
         this.recordsQueried = await fetchOpportunity();
         console.log(this.recordsQueried);
 
       // load jQuery, and DataTables [JS and CSS] from static resource 
         Promise.all([
             loadScript(this, Jquery331),
             loadScript(this, dataTable +'/DataTables-1.10.18/media/js/jquery.dataTables.min.js'),
             loadStyle(this, dataTable +'/DataTables-1.10.18/media/css/jquery.dataTables.min.css')
         ])
         .then(() => { 
             // get the table tag reference from html template using class   
             const table = this.template.querySelector('.tableCls');
             // set table headers 
             const columnHeaders = ['Name' ,'StageName','Amount', 'CloseDate' , 'Type'];
             
             // create html table header part 
             let columnHeaderHtml = '<thead> <tr>';
             columnHeaders.forEach(function(header) {
                 columnHeaderHtml += '<th>' + header + '</th>';
             });
             columnHeaderHtml += '</tr></thead>';
 
            // set <thead> element inside table element 
             table.innerHTML = columnHeaderHtml;
             
            //  apply dataTable library to the table and store reference in a variable 
             let oDataTable =  $(table).DataTable();
            
            // process all Opportunity records in a for loop and generate table row        
             this.recordsQueried.forEach(function(opp) {
                 let tableRow = []; 
                 let sUrl = '/lightning/r/Opportunity/' + opp.Id + '/view'; 
                  tableRow.push('<a href="' + sUrl + '">' + opp.Name + '</a>');
                  // if any field value is undefined then set blank string to avoid errors
                  tableRow.push(opp.StageName != undefined ? opp.StageName : '');
                  tableRow.push(opp.Amount != undefined ? opp.Amount : '');  
                  tableRow.push(opp.CloseDate != undefined ? opp.CloseDate : '');  
                  tableRow.push(opp.Type != undefined ? opp.Type : '');  
                  oDataTable.row.add(tableRow);
             }) 
           /*  tbl += '</tbody></table>';
             $('[Id $= "pbtbl"]').html(tbl);
             $('[Id $= "responseErrors"]').html('');
             $('[Id $= "testTable"]').css('display','block');        
             // Sets the attributes of the data table
             var accountsTable = $('#testTable').DataTable({
                 //enables results highlight
                 searchHighlight: true, 
                 scrollX: true,
                 scrollInnerX: true,
                 scrollY: "300px",  
                 //sets record lengths to show in picklist
                 aLengthMenu: [
                     [15, 25, 50, 100, 200, -1],
                     [15, 25, 50, 100, 200, "All"]
                 ],                   
                 stateSave: true,
                 // order: [[ 2, "desc" ], [ 4, "desc" ]],
                 order: [[ 3, "desc" ], [ 5, "desc" ]], 
                 columnDefs: [
                     { width: "50px", targets: 2, class: "noWrap" },
                     { width: "200px", targets: 3 }
                     
                 ],// {"searchable": false, "orderable": false,"targets": 0},
                 "iDisplayLength": 15,
                 //adds copy, print buttons...
                 dom: 'lBfrtip', //l=length, B=buttons, f=filter(search), r=processing, t=the table, I=table summary, p=page controls
                 buttons: [
                     'copyHtml5', 
                     {
                         extend: 'excelHtml5',
                         title: mid+'_'+fullacctName+'_'+date,                       
                     }, 
                     {
                         extend: 'pdfHtml5',
                         title: mid+'_'+fullacctName+'_'+date,  
                         orientation: 'landscape', 
                         pageSize : 'LEGAL',
                         pageSize : 'A3',
                         
                     },                    
                     {
                         extend: 'print',
                         customize: function(win) {
                             $(win.document.body)
                             .css( 'font-size', '10pt' )
                             
                             $(win.document.body).find( 'table' )
                             .addClass( 'compact' )
                             .css( 'font-size', 'inherit' );
                         }
                     }
                 ],
                 "language": {
                     "emptyTable": $Label.NoData,
                     "url": urlVal, 
                     "buttons": {
                         "copy": $Label.Copy,
                         "copyTitle": $Label.CopyTitle,
                         "copyKeys": $Label.CopyKeys,
                         /*"copySuccess": 
                         {
                             _: '%d lignes copiées',
                             1: '1 ligne copiée'
                         },*/
                        // "print":$Label.Print
                 //    }
                // }
           //  }); 
            // use DataTables plugin draw function to reflect your data changes on UI
             oDataTable.draw();
         });

         
     }
 }