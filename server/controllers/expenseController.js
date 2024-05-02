import Expense from '../models/expense.js';

/**
 * Create new expense
 * @param {*} req
 * @param {*} res
 */
export const createExpense = async (req, res) => {
  try {
    const { user_id, name, description, amount, category_id, date, type } =
      req.body;
    const newExpense = new Expense({
      user_id,
      name,
      description,
      amount,
      date,
      category_id,
      type,
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

export const getExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findById(id);
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: '500 - Unable to get expenses' });
  }
};
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedExpense = await Expense.findByIdAndUpdate(
      id, // Use id directly as the first argument
      { ...req.body }, // Spread req.body to update fields
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
      message: 'Expense has been updated successfully',
      updatedData,
    });
  } catch (error) {
    res.status(500).json({ error: '500 - Unable to update expenses' });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params; // Extract the expense ID from the URL parameters

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    // Send a success response with the updated data after deletion
    const updatedExpenses = await Expense.find();
    res.status(200).json({
      message: 'Expense has been deleted successfully',
      updatedExpenses,
    });
  } catch (error) {
    res.status(500).json({
      error: '500 - Unable to delete the expense',
      message: error.message,
    });
  }
};
