const Example = require('../models/Example');

class ExampleRepository {
  async findAll() {
    return await Example.findAll();
  }

  async findById(id) {
    return await Example.findByPk(id);
  }

  async findByName(name) {
    return await Example.findOne({ where: { name } });
  }

  async create(data) {
    return await Example.create(data);
  }

  async update(id, data) {
    const example = await Example.findByPk(id);
    if (!example) {
      return null;
    }
    return await example.update(data);
  }

  async delete(id) {
    const example = await Example.findByPk(id);
    if (!example) {
      return false;
    }
    await example.destroy();
    return true;
  }
}

module.exports = new ExampleRepository(); 