({
    refreshAccount : function(component, event, helper) {
        console.log('refresh event');
        
        location.reload();
        // $A.get('e.force:refreshView').fire();      
        
    }
})
