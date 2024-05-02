import Category from '../models/category.js';

export const createCategory = async (req, res) => {
  try {
    const { name, type } = req.body;
    const newCategory = new Category({ name, type });
    await newCategory.save();
    res.status(201).json({ message: '201 - Category created successfully' });
  } catch (error) {
    res.status(500).json({ error: '500 - Internal Server Error' });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(201).json(categories);
  } catch (error) {
    res.status(500).json({ error: '500 - Unable to get all categories' });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: '500 - Unable to get category' });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(
      id, // Use id directly as the first argument
      { ...req.body }, // Spread req.body to update fields
      {
        new: true, // Return the updated document after the update operation
        runValidators: true, // Run schema validators during the update operation
      }
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const updatedData = await Category.find();

    res.status(200).json({
      message: 'Categories has been updated successfully',
      updatedData,
    });
  } catch (error) {
    res.status(500).json({ error: '500 - Unable to update categories' });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryToDelete = await Category.findByIdAndDelete(id);
    if (!categoryToDelete) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const updatedCategories = await Category.find();
    res.status(200).json({
      message: 'Category has been deleted successfully',
      updatedCategories,
    });
  } catch (error) {
    res.status(500).json({
      error: '500 - Unable to delete the category',
      message: error.message,
    });
  }
};
