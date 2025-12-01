require('dotenv').config();

module.exports = { 
  mysqlHost: process.env.DB_HOST || "13.233.12.75",
  user: process.env.DB_USER || "esp",
  password: process.env.DB_PASSWORD || 'Espsoft123#',
  database: process.env.DB_NAME || "quant_fund",
  mysqlPort: process.env.DB_PORT || 3306,
  JWT_SECRET_KEY: process.env.JWT_SECRET || 'ly27lg35kci85tvgvl0zgbod4',
  SESSION_EXPIRES_IN: process.env.SESSION_EXPIRES_IN || '24h',
  imageUrl: '',
  contractAddress: process.env.CONTRACT_ADDRESS || '0x98Ff86eD5B0dDd3C85115845A90A6066C25bedf9',
  clientDepositAddress: process.env.CLIENT_DEPOSIT_ADDRESS || '0xEfcd2e9ca6483147A25a106C654a6E557eb8f916',
  // mailUrl : 'http://localhost:3000/silky_exchange/',

  // contractAddress: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", //LIVE
}