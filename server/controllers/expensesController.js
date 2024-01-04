import Expense from '../models/expense.js';

/**
 * Create new expense
 * @param {*} req
 * @param {*} res
 */
export const createExpense = async (req, res) => {
  try {
    const { name, description, amount, category, date } = req.body;
    const newExpense = new Expense({
      name,
      description,
      amount,
      date,
      category,
    });
    await newExpense.save();
    res.status(201).json({ message: '201 - Expense created successfully' });
  } catch (error) {
    res.status(500).json({ error: '500 - Internal Server Error' });
  }
};
/**
 * Get all expenses
 * @param {*} req
 * @param {*} res
 */
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(201).json(expenses);
  } catch (error) {
    res.status(500).json({ error: '500 - Unable to get expenses' });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { _id } = req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(
      { _id }, // Find expense by _id
      { $set: { ...req.body } }, // Update fields
      {
        new: true, // Return the updated document after the update operation
        runValidators: true, // Run schema validators during the update operation
      }
    );

    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    const updatedData = await Expense.find();

    res.status(200).json({
      message: 'Expense updated successfully',
      updatedData,
    });
  } catch (error) {
    res.status(500).json({ error: '500 - Unable to update expenses' });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { _id } = req.body;

    const deletedExpense = await Expense.findByIdAndDelete(_id);

    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    // Fetch the updated data after deletion
    const updatedExpense = await Expense.find();
    res.status(200).json({
      message: 'Expense deleted successfully',
      updatedExpense,
    });
  } catch (error) {
    res.status(500).json({
      error: '500 - Unable to delete expense',
      message: error.message,
    });
  }
};
