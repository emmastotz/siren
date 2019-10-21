DROP DATABASE IF EXISTS siren_db;
CREATE DATABASE siren_db;

USE siren_db;

CREATE TABLE products (
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(12,2) NULL,
  stock_quantity INTEGER(45) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blue Light Glasses", "clothing", 19.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bluetooth Wireless Headphones", "Electronics", 149.99, 19);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Down Sleeping Bag", "Outdoors", 269.95, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lightweight Tripod", "Electronics", 23.49, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Leather Crossbody Purse", "Clothing", 21.95, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Insulated Water Bottle", "Outdoors", 44.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("16mm Digital Camera Lens", "Electronics", 899.00, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop Cooling Pad", "Electronics", 24.99, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Agenda Book", "Crafts & Supplies", 12.95, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Acrylic Paint", "Crafts & Supplies", 19.99, 10);

SELECT * FROM siren_db;