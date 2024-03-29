
const env_config = {
	"development": {
		"use_env_variable": false,
		"username": "postgres",
		"password": "abc",
		"database": "ts_cart_db",
		"host": "127.0.0.1",
		"dialect": "postgres",
	},
	"test": {
		"use_env_variable": false,
		"username": "postgres",
		"password": "abc",
		"database": "ts_cart_test_db",
		"host": "localhost",
		"dialect": "postgres", 
	},
	"production": {
		"username": "root",
		"password": null,
		"database": "database_production",
		"host": "127.0.0.1",
		"dialect": "mysql"
	}
}
module.exports = env_config