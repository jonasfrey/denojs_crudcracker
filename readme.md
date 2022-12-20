# ./models 
## create models
`
cd ./models
deno run -A create_all.module.js
`
## a_o_model 
define your models here


# ./testdata

## create models
`
cd ./testdata
deno run -A create_test_data.module.js
`
## a_o_test_data  
define your test data here


# DB/Database: 
## mysql 
for the moment mysql is supported
### install
`sudo apt install mysql-server`
### create user 
`CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';`
### grant all privileges
`grant all privileges on *.* to 'admin'@'localhost';`