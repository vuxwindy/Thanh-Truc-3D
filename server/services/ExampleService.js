const exampleRepository = require('../repositories/ExampleRepository');

class ExampleService {
  async getAllExamples() {
    try {
      return await exampleRepository.findAll();
    } catch (error) {
      throw new Error('Error fetching examples');
    }
  }

  async getExampleById(id) {
    try {
      const example = await exampleRepository.findById(id);
      if (!example) {
        throw new Error('Example not found');
      }
      return example;
    } catch (error) {
      throw new Error('Error fetching example');
    }
  }

  async createExample(data) {
    try {
      // Add any business logic here
      if (!data.name) {
        throw new Error('Name is required');
      }

      // Check if example with same name exists
      const existingExample = await exampleRepository.findByName(data.name);
      if (existingExample) {
        throw new Error('Example with this name already exists');
      }

      return await exampleRepository.create(data);
    } catch (error) {
      throw new Error('Error creating example');
    }
  }

  async updateExample(id, data) {
    try {
      const example = await exampleRepository.findById(id);
      if (!example) {
        throw new Error('Example not found');
      }

      // Add any business logic here
      if (data.name) {
        const existingExample = await exampleRepository.findByName(data.name);
        if (existingExample && existingExample.id !== id) {
          throw new Error('Example with this name already exists');
        }
      }

      return await exampleRepository.update(id, data);
    } catch (error) {
      throw new Error('Error updating example');
    }
  }

  async deleteExample(id) {
    try {
      const example = await exampleRepository.findById(id);
      if (!example) {
        throw new Error('Example not found');
      }

      return await exampleRepository.delete(id);
    } catch (error) {
      throw new Error('Error deleting example');
    }
  }
}

module.exports = new ExampleService(); 