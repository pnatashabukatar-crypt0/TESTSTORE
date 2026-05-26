const { Pool } = require('pg');
require('dotenv').config();

/**
 * Database Connection Pool Configuration
 * Uses environment variables for connection details
 */
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'candy_shop',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  min: parseInt(process.env.DB_POOL_MIN) || 2,
  max: parseInt(process.env.DB_POOL_MAX) || 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

/**
 * Execute a query with the pool
 * @param {string} query - SQL query string
 * @param {array} params - Query parameters for prepared statement
 * @returns {Promise} Query result
 */
const query = async (queryText, params = []) => {
  const start = Date.now();
  try {
    const res = await pool.query(queryText, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development') {
      console.log('Executed query', { queryText, duration, rows: res.rowCount });
    }
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

/**
 * Get a client from the pool for transactions
 * @returns {Promise} Client instance
 */
const getClient = async () => {
  return await pool.connect();
};

/**
 * Health check - verify database connectivity
 * @returns {Promise<boolean>}
 */
const healthCheck = async () => {
  try {
    await query('SELECT NOW()');
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
};

/**
 * Close all connections in the pool
 * @returns {Promise}
 */
const close = async () => {
  await pool.end();
};

module.exports = {
  pool,
  query,
  getClient,
  healthCheck,
  close,
};
