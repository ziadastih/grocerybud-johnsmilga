const grocery = require("../mongooseSchema/schema");

const getList = async (req, res) => {
  try {
    const items = await grocery.find({});
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createItem = async (req, res) => {
  try {
    const item = await grocery.create(req.body);
    res.status(201).json({ item });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getOneItem = async (req, res) => {
  try {
    const { id: itemID } = req.params;
    const item = await grocery.findOne({ _id: itemID });
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id: itemID } = req.params;
    const item = await grocery.findByIdAndUpdate({ _id: itemID }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ item });
  } catch (error) {
    res.status(200).json({ msg: error });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id: itemID } = req.params;
    const item = await grocery.findByIdAndDelete({ _id: itemID });
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getList,
  getOneItem,
  createItem,
  updateItem,
  deleteItem,
};
