// =================================================
// REQUIREMENTS
// =================================================
require("dotenv").config();
var inquirer = require("inquirer");
var mysql = require("mysql");
// var Table = require("cli-table");

var keys = require("./keys.js");
var mySqlPass = keys.keys.secret;
var mySqlUser = keys.keys.id;
// var table = new Table ({
//   head: ["item_id", "product_name", "department_name", "price", "stock_quantity"],
//   colWidths: [100,200]
// });

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
  console.log("Connected at: " + connection.threadId);
  viewMenu();
});
// =================================================
// FUNCTIONS
// =================================================
function viewProducts() {
  let sqlQuery = "SELECT * FROM products";
  connection.query(sqlQuery, function (err, response) {
    if (err) {
      console.log("Error displaying products: " + err);
      connection.end();
    } else {
      console.log("------------------------------");
      for (var i = 0; i < response.length; i++) {
        console.log(response[i].item_id + " : " + response[i].product_name + ", " + response[i].price);
      }
      console.log("------------------------------");
      continueManaging();
    }
  });
};
// =================================================
function viewLowInventory() {
  let sqlQuery = "SELECT * FROM products WHERE stock_quantity <= 5";
  connection.query(sqlQuery, function (err,response) {
    if (response.length > 0){
      console.log("------------------------------");
      for (var i = 0; i < response.length; i++) {
        console.log(response[i].item_id + " : " + response[i].product_name + ", " + response[i].department_name + ", " + response[i].stock_quantity);
      };
      console.log("------------------------------");
    } else {
      console.log("No items need to be stocked at this time.");
    }
    continueManaging();
  });
};
// =================================================
function addInventory() {
  let sqlQuery = "SELECT * FROM products";
  connection.query(sqlQuery, function(err, response) {
    if (err) {
      console.log ("Error adding inventory/prompting manager.");
      connection.end();
    };

    inquirer.prompt([
      {
        type: "list",
        message: "Which item id would you like to add stock to?",
        name: "itemID",
        choices: [1,2,3,4,5,6,7,8,9,10]
      },
      {
        type: "input",
        message: "How many would you like to add?",
        name: "stockQuantity"
      }
    ]).then (function(answer){
      for (var i = 0; i < response.length; i++){
        if (response[i].item_id === parseInt(answer.itemID)) {
          var managerChoice = response[i];
        }
      }
      
      var newQuantity = managerChoice.stock_quantity + parseInt(answer.stockQuantity);
  
      connection.query (
        "UPDATE products SET ? WHERE ?", [
          {
            stock_quantity: newQuantity
          },
          {
            item_id: managerChoice.item_id
          }
        ],
        function (err) {
          if (err) {
            console.log("------------------------------");
            console.log ("Error in product updates.");
            console.log("------------------------------");
            connection.end();
          } else {
            console.log("------------------------------");
            console.log("Item #" + managerChoice.item_id + " has been stocked to " + newQuantity + "!");
            console.log("------------------------------");
            continueManaging ();
          }
        }
      )
    });
  })
};
// =================================================
function addNewProduct() {
  let sqlQuery = "SELECT * FROM products";
  connection.query(sqlQuery, function(err, response) {
    if (err) {
      console.log ("Error adding inventory/prompting manager.");
      connection.end();
    };

    inquirer.prompt([
      {
        type: "input",
        message: "What is the name of the product?",
        name: "productName",
      },
      {
        type: "input",
        message: "What department does this product belong to?",
        name: "departmentName",
      },
      {
        type: "input",
        message: "What is the price of the item?",
        name: "price",
      },
      {
        type: "input",
        message: "How many will be in stock?",
        name: "stockQuantity"
      }
    ]).then (function(answer){
      
      let productName = answer.productName;
      let departmentName = answer.departmentName;
      let price = parseFloat(answer.price);
      let stockQuantity = parseInt(answer.stockQuantity);

      var sqlQuery = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES(" + "\'" + productName + "\'" + ", " + "\'" + departmentName + "\'" + ", " + price + ", " + stockQuantity + ")";

      console.log("Query: " + sqlQuery);

      connection.query (sqlQuery, function (err) {
          if (err) {
            console.log("------------------------------");
            console.log ("Error in adding product.");
            console.log("------------------------------");
            connection.end();
          } else {
            console.log("------------------------------");
            console.log("Your new product " + productName + " has been added to " + "the inventory!");
            console.log("------------------------------");
            continueManaging ();
          }
        }
      )
    });
  })
};
// =================================================
function viewMenu () {
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "action",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }
  ]).then(function(response) {
    switch(response.action) {
      case "View Products for Sale":
        viewProducts();
        break;
      case "View Low Inventory":
        viewLowInventory();
        break;
      case "Add to Inventory":
        addInventory();
        break;
      case "Add New Product":
        addNewProduct();
        break;
    };
  });
}
// =================================================
function continueManaging (){
  inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "Are there any additional actions you'd like to take?"
  
    }
  ]).then(function(response) {
    if (response.confirm) {
      viewMenu();
    } else {
      process.exit();
    }
  });
};
// =================================================