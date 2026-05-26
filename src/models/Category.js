const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

/**
 * Category Model
 * Manages product categories and subcategories
 */
class Category {
  /**
   * Get all active categories
   * @returns {Promise<Array>}
   */
  static async getAll() {
    const query = `
      SELECT id, name, slug, description, image_url, parent_id, display_order
      FROM categories
      WHERE is_active = true
      ORDER BY display_order, name
    `;
    const result = await db.query(query);
    return result.rows;
  }

  /**
   * Get category by ID
   * @param {string} id - Category UUID
   * @returns {Promise<Object>}
   */
  static async getById(id) {
    const query = `
      SELECT *
      FROM categories
      WHERE id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  /**
   * Get category by slug
   * @param {string} slug - Category slug
   * @returns {Promise<Object>}
   */
  static async getBySlug(slug) {
    const query = `
      SELECT *
      FROM categories
      WHERE slug = $1
    `;
    const result = await db.query(query, [slug]);
    return result.rows[0] || null;
  }

  /**
   * Get subcategories for a parent category
   * @param {string} parentId - Parent category UUID
   * @returns {Promise<Array>}
   */
  static async getSubcategories(parentId) {
    const query = `
      SELECT id, name, slug, description, image_url, display_order
      FROM categories
      WHERE parent_id = $1 AND is_active = true
      ORDER BY display_order, name
    `;
    const result = await db.query(query, [parentId]);
    return result.rows;
  }

  /**
   * Create a new category
   * @param {Object} data - Category data
   * @returns {Promise<Object>}
   */
  static async create(data) {
    const { name, slug, description, image_url, parent_id } = data;
    const id = uuidv4();

    const query = `
      INSERT INTO categories (id, name, slug, description, image_url, parent_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const result = await db.query(query, [
      id,
      name,
      slug,
      description,
      image_url,
      parent_id || null,
    ]);

    return result.rows[0];
  }

  /**
   * Update a category
   * @param {string} id - Category UUID
   * @param {Object} data - Update data
   * @returns {Promise<Object>}
   */
  static async update(id, data) {
    const { name, slug, description, image_url, parent_id, display_order, is_active } = data;

    const query = `
      UPDATE categories
      SET
        name = COALESCE($1, name),
        slug = COALESCE($2, slug),
        description = COALESCE($3, description),
        image_url = COALESCE($4, image_url),
        parent_id = COALESCE($5, parent_id),
        display_order = COALESCE($6, display_order),
        is_active = COALESCE($7, is_active)
      WHERE id = $8
      RETURNING *
    `;

    const result = await db.query(query, [
      name,
      slug,
      description,
      image_url,
      parent_id,
      display_order,
      is_active,
      id,
    ]);

    return result.rows[0] || null;
  }

  /**
   * Delete a category (soft delete)
   * @param {string} id - Category UUID
   * @returns {Promise<boolean>}
   */
  static async delete(id) {
    const query = `
      UPDATE categories
      SET is_active = false
      WHERE id = $1
      RETURNING id
    `;

    const result = await db.query(query, [id]);
    return result.rows.length > 0;
  }
}

module.exports = Category;
