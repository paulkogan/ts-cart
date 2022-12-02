import { Sequelize } from 'sequelize';
const env = process.env.NODE_ENV || 'development';
//const config = require(__dirname + '/../config/config.json')[env];
import { env_config } from "../config/config_json.js";
console.log('================');
console.log(env_config);
const config = env_config[env];
// const sequelize = config.url
//   ? new Sequelize(config.url, config)
//   : new Sequelize(config.database, config.username, config.password, config);
const sequelize = new Sequelize(config.database, config.username, config.password, config);
// export default { Sequelize, sequelize };
export default sequelize;
//# sourceMappingURL=index.js.map