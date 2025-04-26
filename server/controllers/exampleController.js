const exampleService = require('../services/ExampleService');

const exampleController = {
  // Get all examples
  getAll: async (req, res) => {
    try {
      const examples = await exampleService.getAllExamples();
      res.json(examples);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get example by ID
  getById: async (req, res) => {
    try {
      const example = await exampleService.getExampleById(req.params.id);
      res.json(example);
    } catch (error) {
      if (error.message === 'Example not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  },

  // Create new example
  create: async (req, res) => {
    try {
      const example = await exampleService.createExample(req.body);
      res.status(201).json(example);
    } catch (error) {
      if (error.message === 'Name is required' || error.message === 'Example with this name already exists') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  },

  // Update example
  update: async (req, res) => {
    try {
      const example = await exampleService.updateExample(req.params.id, req.body);
      res.json(example);
    } catch (error) {
      if (error.message === 'Example not found' || error.message === 'Example with this name already exists') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  },

  // Delete example
  delete: async (req, res) => {
    try {
      await exampleService.deleteExample(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === 'Example not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }
};

module.exports = exampleController; 