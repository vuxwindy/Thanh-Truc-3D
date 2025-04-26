const { pool } = require('../app');

class BaseRepository {
  constructor(tableName) {
    this.tableName = tableName;
    this.pool = pool;
  }

  async findAll() {
    const [rows] = await this.pool.query(`SELECT * FROM ${this.tableName}`);
    return rows;
  }

  async findById(id) {
    const [rows] = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async create(data) {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map(() => '?').join(', ');

    const [result] = await this.pool.query(
      `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`,
      values
    );

    return { id: result.insertId, ...data };
  }

  async update(id, data) {
    const setClause = Object.keys(data)
      .map(key => `${key} = ?`)
      .join(', ');
    const values = [...Object.values(data), id];

    const [result] = await this.pool.query(
      `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return { id, ...data };
  }

  async delete(id) {
    const [result] = await this.pool.query(
      `DELETE FROM ${this.tableName} WHERE id = ?`,
      [id]
    );

    return result.affectedRows > 0;
  }
}

module.exports = BaseRepository; 