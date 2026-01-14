// db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',  // user on line  c2700852c_postgres 
  host: 'localhost',
  database: 'signalement_db',
  password: '',    // Pass on line 'Signal@2025!'
  port: 5432,
});
export default pool;