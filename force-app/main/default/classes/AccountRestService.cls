public with sharing class AccountRestService {
	private static string createAccountRest(string accountName){
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:CallOurSalesforceAPI/services/apexrest/TestAccountService');
        req.setMethod('POST');
        req.setTimeout(120000);
        map<string,string> selapp = new map<string,string>();
        selapp.put('accountName',accountName);
        req.setBody(JSON.serialize(selapp));
        req.setHeader('Content-Type', 'application/json');
        Http http = new Http();
        system.debug(req.getBody());
        HTTPResponse res = http.send(req);
        return res.getBody();
    }
    
    @AuraEnabled
    public static String createNewAccount(String accName){
        try {
            string result = createAccountRest(accName);
            return result;
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @AuraEnabled
    public static String createNewAccountNormal(String accName){
        try {
            Account acc = new Account(Name=accName);
            insert acc;
            return 'Success';
            
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}