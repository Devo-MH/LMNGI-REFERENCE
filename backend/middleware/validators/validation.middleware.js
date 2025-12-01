const { body, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      msg: 'Validation failed', 
      errors: errors.array() 
    });
  }
  next();
};

// Validation rules for withdrawals
const withdrawalValidation = [
  body('withdrawal_address')
    .notEmpty().withMessage('Withdrawal address is required')
    .matches(/^0x[a-fA-F0-9]{40}$/).withMessage('Invalid Ethereum address'),
  body('token')
    .isNumeric().withMessage('Token must be numeric')
    .custom(value => parseFloat(value) >= 10000).withMessage('Minimum withdrawal: 10,000 tokens'),
  validate
];

// Validation rules for staking
const stakingValidation = [
  body('staking_period_id')
    .isInt({ min: 1 }).withMessage('Invalid staking period'),
  body('busd_amount')
    .isFloat({ min: 0.01 }).withMessage('Invalid amount'),
  body('quantity')
    .isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('hash')
    .matches(/^0x[a-fA-F0-9]{64}$/).withMessage('Invalid transaction hash'),
  validate
];

// Validation rules for transactions
const transactionValidation = [
  body('hash')
    .notEmpty().withMessage('Transaction hash required')
    .matches(/^0x[a-fA-F0-9]{64}$/).withMessage('Invalid transaction hash'),
  body('busd_amount')
    .isFloat({ min: 0 }).withMessage('Invalid amount'),
  validate
];

// Validation rules for address/signature
const addressValidation = [
  body('address')
    .notEmpty().withMessage('Address is required')
    .matches(/^0x[a-fA-F0-9]{40}$/).withMessage('Invalid Ethereum address'),
  body('signature')
    .notEmpty().withMessage('Signature is required')
    .isLength({ min: 130 }).withMessage('Invalid signature format'),
  validate
];

// Validation for referral address (optional)
const referralValidation = [
  body('referral_address')
    .optional()
    .matches(/^0x[a-fA-F0-9]{40}$/).withMessage('Invalid referral address'),
];

module.exports = {
  validate,
  withdrawalValidation,
  stakingValidation,
  transactionValidation,
  addressValidation,
  referralValidation
};

