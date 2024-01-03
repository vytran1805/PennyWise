import Transaction from '../models/transaction.js';

/**
 * Create new transaction
 * @param {*} req
 * @param {*} res
 */
export const createTransaction = async (req, res) => {
  try {
    const { name, description, amount, category, type } = req.body;
    const newTransaction = new Transaction({
      name,
      description,
      amount,
      date: new Date(),
      category,
      type,
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

export const updateTransaction = async (req, res) => {
  try {
    const { _id } = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      { _id }, // Find transaction by _id
      { $set: { ...req.body } }, // Update fields
      {
        new: true, // Return the updated document after the update operation
        runValidators: true, // Run schema validators during the update operation
      }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    const updatedData = await Transaction.find();

    res.status(200).json({
      message: 'Transaction updated successfully',
      updatedData,
    });
  } catch (error) {
    res.status(500).json({ error: '500 - Unable to update transactions' });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { _id } = req.body;

    const deletedTransaction = await Transaction.findByIdAndDelete(_id);

    if (!deletedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Fetch the updated data after deletion
    const updatedTransaction = await Transaction.find();
    res.status(200).json({
      message: 'Transaction deleted successfully',
      updatedTransaction,
    });
  } catch (error) {
    res.status(500).json({
      error: '500 - Unable to delete transaction',
      message: error.message,
    });
  }
};
