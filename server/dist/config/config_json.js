"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env_config = void 0;
exports.env_config = {
    "development": {
        "use_env_variable": false,
        "username": "postgres",
        "password": "abc",
        "database": "ts_cart_db",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "test": {
        "use_env_variable": false,
        "username": "postgres",
        "password": "abc",
        "database": "ts_cart_db",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
};
//# sourceMappingURL=config_json.js.map