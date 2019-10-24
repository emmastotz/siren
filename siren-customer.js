// =================================================
// REQUIREMENTS
// =================================================
require("dotenv").config();
var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");

var keys = require("./keys.js");
var mySqlPass = keys.keys.secret;
var mySqlUser = keys.keys.id;
// =================================================
// MySQL CONNECTION TO DATABASE
// =================================================
var connection = mysql.createConnection ({
  // properties...
  host: "localhost",
  port: 3306,
  user: mySqlUser,
  password: mySqlPass,
  database: "siren_db"
});

connection.connect(function(err) {
  if (err) throw err; 
  // console.log("Connected at: " + connection.threadId);
  displayProducts();
});

// =================================================
// FUNCTIONS
// =================================================
function displayProducts() {
  connection.query("SELECT * FROM products", function (err, response) {
    var table = new Table ({
      head: ["item_id", "product_name", "department_name", "price", "stock_quantity"],
      colWidths: [10,25,25,10,15]
    });

    if (err) {
      console.log("Error displaying products: " + err);
      connection.end();
    } else {
      console.log("------------------------------");
      for (var i = 0; i < response.length; i++) {
        table.push([
          response[i].item_id, response[i].product_name, response[i].department_name, response[i].price, response[i].stock_quantity
        ]);
      }
      console.log(table.toString());
      promptCustomer();
    }
  });
};
// =================================================
function promptCustomer () {
  connection.query("SELECT * FROM products", function (err, response) {
    if (err) {
      console.log("Error prompting customer: " + err);
      connection.end();
    };

    var respLength = parseInt(response.length);

    inquirer.prompt([
      {
        type: "input",
        message: "Select the item ID for the item that you would you like to add stock to.",
        name: "itemID",
        validate: function (input) {
          num = parseInt(input);
          if (isNaN(input) === true) {
            console.log('\n Invalid Input');
            return false;
          } else if (num > respLength) {
            console.log('\n Invalid Input');
            return false;
          } else {
            return true;
          }        
        }
      },
      {
        type: "input",
        message: "How many of these would you like to purchase?",
        name: "stockQuantity"
      }
    ]).then (function(answer){
      for (var i = 0; i < response.length; i++) {
        if (response[i].item_id === parseInt(answer.itemID)) {
          var customerChoice = response[i];
        };
      };

      if (customerChoice.stock_quantity < parseInt(answer.stockQuantity)) {
        console.log("------------------------------");
        console.log("Sorry, we don't have enough of that item in stock!");
        console.log("------------------------------");
        connection.end();
      } else {
        var newQuantity = customerChoice.stock_quantity - parseInt(answer.stockQuantity);

        connection.query(
          "UPDATE products SET ? WHERE ?", [
            {
              stock_quantity: newQuantity
            },
            {
              item_id: customerChoice.item_id
            }
          ],
          function (err) {
            if (err) {
              console.log("Error in price calculation: " + err);
              connection.end();
            } else {
              var price = customerChoice.price * parseInt(answer.stockQuantity);
              console.log("------------------------------");
              console.log("Your total is: " + price);
              console.log("Thank you for your purchase.");
              console.log("We now only have " + newQuantity + " of these in stock.");
              console.log("------------------------------");
              connection.end();
            }
          }
        )
      }
    })
  });
};
// =================================================