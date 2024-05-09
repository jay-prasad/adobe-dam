@RestResource(urlMapping='/TestAccountService/*')
global with sharing class AccountREST {
	@HttpPost
    global static String createAccount(string AccountName){
        //In here you can create some crazy logic with resources available to authorized users.
        //Resources in Managed Packages if the authorized users got assigned licenses. 
        Account acc = new Account(Name=AccountName);
        insert acc;
        return 'Success';
    }
}