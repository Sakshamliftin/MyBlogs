
const { Pool } = require('pg');

const pool = new Pool({
  user: 'Postgres',
  host: 'localhost',
  database: 'blog_db',
  password: 's@123',
  port: 5432,
});