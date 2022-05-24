# System Design

![alt text](https://raw.githubusercontent.com/Shoreasg/code-challenge/master/src/problem6/System%20design.jpg)


1. We will have a service to keep track of post request transaction

2. Once post request is submitted, we will send this request to our sign data service.

3. This service will signs the data. If it is successful, we will respond Status code 200 and a signed transaction as an output, from there, we will broadcast the signed transaction to the blockchain

4. I would recoomend to have a check status function be running after signs data. This check status should collate all of the request. Once it reach a certain amount of transaction, we will sign the data.

If signing data failed, means broadcast transaction failed, we will have to retry with the same request data. We will try this every 60 seconds for 3 times. If we failed, we will show in the portal that it is a failed transaction. 

5. I would also recommend to have another check status function after sending a request to the blockchain. This check status should be run every 60 seconds for 3 times where we will send a request to the blockchain. If the blockchain didn't respond to us within this 180 seconds, we will update the status as failed.

This check status should be able to cater for the 1% of the time, it does not respond earlier than 30 seconds, 95% of the time, it will respond within 1-2 seconds and lastly, rest of the time, it will returns a failure code.

6. Assumning that when we respond HTTP 200 ok, we also assumed that the transaction will be eventually be broadcast. The check status after the signs data and after sending request to the blockchain should have a database where we will store all of the status of the signed transaction. If let say the services restarts unexpectedly, at least we can query our DB and retried those status 200 signed transaction automatically.

7. The transaction page should have both failed and passed data after our system have run the check status. The page should also have a retry button for failed transactions. When admin click on retry, we will resubmit a post request again.

8. With the check status, we can also provide a notification email where after retrying to send a request to the blockchain, and they failed to respond us, we will received an email for the admin to retry again

# Things to think about

1. Security. I would suggest to add another parameter into the post request. Maybe an APIKEY or a private key. We do not want any hackers to find out our URL and randomly do a post request.

2. Concurrency. I am not sure if this API will have any concurrency issue where we might accidentally make the same type of transaction ID to the blockchain.

3. Is this substainable in the long run? How many transactions is this service serving? Personally i think that this is substainable. With a portal and check status service where we can automate the retry without the involvment of the developers. This will also help save time for developers when they can focus on other development work 