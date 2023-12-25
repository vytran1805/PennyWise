import Transaction from '../models/transaction.js';

/**
 * Create new transaction
 * @param {*} req
 * @param {*} res
 */
export const createTransaction = async (req, res) => {
  try {
    const { name, description, amount, category } = req.body;
    const newTransaction = new Transaction({
      name,
      description,
      amount,
      date: new Date(),
      category,
    });
    await newTransaction.save();
    res.status(201).json({ message: '201 - Transaction created successfully' });
  } catch (error) {
    res.status(500).json({ error: '500 - Internal Server Error' });
  }
};
/**
 * Get all transactions
 * @param {*} req
 * @param {*} res
 */
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(201).json(transactions);
  } catch (error) {
    res.status(500).json({ error: '500 - Unable to get transactions' });
  }
};
