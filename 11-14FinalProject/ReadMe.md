1. Install MongoDB to your computer.
2. Run mongo command on your command line to start mongo shell.
3. Open second terminal window in the folder called "backend" and run "npm i" to install all the node dependencies.
4. Run "node seed.js" in this folder, it will automatically create database "shop" all the needed documents and seed some data into them.
5. Run "npm start", if you see two messages "Connected to mongodb://.." and "Listening to port 8000" then server runs successfully.
6. Open third terminal window in the folder called "frontend" and run "npm i" to install all the node dependencies. 
7. Run "npm start", in result you should see the "products" page in the opened browser window.

Also to test all the functionalities you shoud login with Admin's account - login: "+51241244" password: "12345"
if you want add balance to your account to test the purchase - open "seed.js" file in "backend" folder, modify balance of any user 
to desired one and run "node seed.js". You can modify data in db using MongoDB Compass https://www.mongodb.com/products/compass.
