import Income from '../models/income.js';

/**
 * Create new income
 * @param {*} req
 * @param {*} res
 */
export const createIncome = async (req, res) => {
  try {
    const { user_id, name, description, amount, date, category_id, type } =
      req.body;
    const newIncome = new Income({
      user_id,
      name,
      description,
      amount,
      date,
      category_id,
      type,
    });
    await newIncome.save();
    res.status(201).json({ message: '201 - Income created successfully' });
  } catch (error) {
    res.status(500).json({ error: '500 - Internal Server Error' });
  }
};
/**
 * Get all incomes
 * @param {*} req
 * @param {*} res
 */
export const getUserIncomes = async (req, res) => {
  try {
    const incomes = await Income.find();
    res.status(201).json(incomes);
  } catch (error) {
    res.status(500).json({ error: '500 - Unable to get incomes' });
  }
};

export const getIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Income.findById(id);
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ error: '500 - Unable to get incomes' });
  }
};

export const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedIncome = await Income.findByIdAndUpdate(
      id, // Find income by _id
      { ...req.body }, // Spread req.body to update fields
      {
        new: true, // Return the updated document after the update operation
        runValidators: true, // Run schema validators during the update operation
      }
    );

    if (!updatedIncome) {
      return res.status(404).json({ error: 'Income not found' });
    }
    const updatedData = await Income.find();

    res.status(200).json({
      message: 'Income has been updated successfully',
      updatedData,
    });
  } catch (error) {
    res.status(500).json({ error: '500 - Unable to update incomes' });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params; // Extract the expense ID from the URL parameters

    const deletedIncome = await Income.findByIdAndDelete(id);

    if (!deletedIncome) {
      return res.status(404).json({ error: 'Income not found' });
    }

    // Fetch the updated data after deletion
    const updatedIncome = await Income.find();
    res.status(200).json({
      message: 'Income has been deleted successfully',
      updatedIncome,
    });
  } catch (error) {
    res.status(500).json({
      error: '500 - Unable to delete the income',
      message: error.message,
    });
  }
};
