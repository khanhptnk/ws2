Khanh Nguyen    
CS 326 
# Workshop 2

## 1. Create 'user.csv':

- Implement a python script to generate random strings for the fields.
- For each row, join the fields by commas.
- Write rows to file. 

## 2. Extend 'http-client.js':

- Add an argument option 'user_data' to allow requesting user data. Modify the if-statement and switch-statement to check for this case.
- Create object 'user_data_handler', created by 'createResponseHandler',
which takes the function that reads the JSON object, parse the object, save user data to the local folder as 'user_client.csv' and display user data in a textual way. 

## 3. Extend 'http-server.js':

- Add an argument option 'user_data' to offer user data service. Modify the if-statement and switch-statement to check for this case. 
- Implement function 'userDataHandler' that responds to the request of user data from the client. It reads the content of 'user.csv' from local folder and serializes it into a the 'user_data' field of a JSON object and sends the object back to the user. 
