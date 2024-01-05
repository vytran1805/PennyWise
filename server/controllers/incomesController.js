import Income from '../models/income.js';

/**
 * Create new income
 * @param {*} req
 * @param {*} res
 */
export const createIncome = async (req, res) => {
  try {
    const { name, description, amount, category, date } = req.body;
    const newIncome = new Income({
      name,
      description,
      amount,
      date,
      category,
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
export const getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.find();
    res.status(201).json(incomes);
  } catch (error) {
    res.status(500).json({ error: '500 - Unable to get incomes' });
  }
};

export const updateIncome = async (req, res) => {
  try {
    const { _id } = req.body;

    const updatedIncome = await Income.findByIdAndUpdate(
      { _id }, // Find income by _id
      { $set: { ...req.body } }, // Update fields
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
      message: 'Income updated successfully',
      updatedData,
    });
  } catch (error) {
    res.status(500).json({ error: '500 - Unable to update incomes' });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const { _id } = req.body;

    const deletedIncome = await Income.findByIdAndDelete(_id);

    if (!deletedIncome) {
      return res.status(404).json({ error: 'Income not found' });
    }

    // Fetch the updated data after deletion
    const updatedIncome = await Income.find();
    res.status(200).json({
      message: 'Income deleted successfully',
      updatedIncome,
    });
  } catch (error) {
    res.status(500).json({
      error: '500 - Unable to delete income',
      message: error.message,
    });
  }
};
