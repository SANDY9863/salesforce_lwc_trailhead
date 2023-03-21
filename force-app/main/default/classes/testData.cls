public with sharing class testData {

    @AuraEnabled
    public static AccountHistoryListWrapper saveAccount(Id AccountRec){
    Boolean updatedtime;    
    AccountHistoryListWrapper accHistList = new AccountHistoryListWrapper();
    List<Account> acct = new List<Account>();
    for(Account acc : [SELECT Id, Rating FROM Account WHERE id=: AccountRec]){
        acc.Rating = testData.getindex();
        acct.add(acc);
    }
    update acct;

    List<AccountHistory> AccountHistoryRecord = [SELECT AccountId, Field, NewValue, OldValue, 
                                                CreatedById, CreatedDate
                                                FROM AccountHistory
                                                WHERE AccountId=: AccountRec AND createddate <= LAST_N_DAYS:1
                                                ORDER BY CreatedDate DESC
                                                LIMIT 1];
        if(!AccountHistoryRecord.isEmpty()){
            updatedtime = true;
        }

            accHistList.accRecord = acct;
            accHistList.AccHistoryList = AccountHistoryRecord;
            accHistList.updatedtime = updatedtime;
        return accHistList;
    }
    public static String getindex(){
        
        Integer len = 6;
		Blob blobKey = crypto.generateAesKey(128);
		String key = EncodingUtil.convertToHex(blobKey);
		String num = key.substring(0,len);
        return num;
}
public class AccountHistoryListWrapper{
    @AuraEnabled
    public List<Account> accRecord{get;set;}
    @AuraEnabled
    public List<AccountHistory> AccHistoryList{get;set;}
    @AuraEnabled
    public  Boolean updatedtime{get;set;}

    

}

@AuraEnabled(cacheable=true)
    public static Boolean lastupdatedtime(Id AccountRec){
        boolean updatedtime;
        DateTime dt = System.Now().addHours(-24);
        List<AccountHistory> AccountHistoryRecord = [SELECT AccountId, Field, NewValue, OldValue, 
                                                CreatedById, CreatedDate
                                                FROM AccountHistory
                                                WHERE AccountId=: AccountRec AND 
                                                createddate >= LAST_N_DAYS:1
                                                ORDER BY CreatedDate DESC
                                                LIMIT 1];
        if(!AccountHistoryRecord.isEmpty() && AccountHistoryRecord[0].NewValue != null){
        //AccountHistoryRecord[0].CreatedDate <= dt){
            updatedtime = true;
        }
        return updatedtime;
}
}