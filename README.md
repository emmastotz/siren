### **Siren**
#### *Siren is a CLI storefront that uses Node.js and MySQL.*

##### PROBLEM/SOLUTION
Siren is a one stop shop for all your shopping needs. Even better, purchase online from the comfort of your home. Enjoy quick, two year shipping and no money back guarantees.

##### Siren was coded into 2 main applications:
* 1. The Customer Application 
  * This application was coded into two main functions:
    * Display Products Function
      * This function creates a table variable to display our list of items in our MySQL database. It then queries the database, iterating through it and displaying it as a table for the customer to purchase something from.
    * Prompt Customer Function
      * The bulk of the code is in this function. Inquirer is used to prompt the user for the id of the item that they would like to purchase and asks them how many of said item they would like to purchase. From there, some simple logic/calculations/queries are made, and tells the user if Siren has enough of the item in stock or not or if they have successfully purchased an item.

* 2. The Manager Application
  * This application was coded into 5 main functions:
    * View Menu Function 
      * This function uses inquirer to ask the manager what of the 4 below functions they would like to do within the app. Also, it is called at the end of each of the other functions, giving the entire application a recursive feature.
    * View Products Function 
      * This function creates a table variable to display our list of items in our MySQL database. It then queries the database, iterating through it and displaying it as a table for the manager to view. (Same as above view products function).
    * View Low Inventory Function 
       * This function creates a table variable to display our list of items in MySQL database where the stock/quantity of an item is less than 5. Iterating through the database, it displays a table of only the items with low inventory.
    * Add Inventory Function 
      * This function prompts the manager to get the ID# of the item that they would like to re-stock, and the quantity that they would like to restock it to. It queries the database using their input and does simple math to do a restock of the item.
    * Add New Product Function 
      * This function gets input from the manager using inquirer, and adds the information as a new row in the database, thus adding a new product for purchase.

##### Instructions to Run the App
*See my demo here: https://drive.google.com/file/d/1Gt0wY57Ccpon9kTtpmuVe4fehH3Y8dK5/view*
* Clone the file from github. (https://github.com/emmastotz/siren)
* Install all dependencies needed to run the program ("npm install") and acquire needed API keys.
* Run the applications using node in the command line ("node siren-customer.js" or "node siren-manager.js").
* Follow the inquirer prompts to successfully make purchases from my database that provides prices, but doesn't actually charge you. 

##### Technologies Used
* JavaScript
* Node
* MySQL
* NPMs: Inquirer, dotenv, cli-table

This app was created entirely by Emma Stotz