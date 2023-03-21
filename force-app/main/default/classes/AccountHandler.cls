public class AccountHandler {
    
    public static Account insertNewAccount(String name){
        Account asd = new Account(Name = name);
       
        
             try{
        insert asd;
           
        }catch(Exception e){
            return null;
            }
        return asd;
    }

}