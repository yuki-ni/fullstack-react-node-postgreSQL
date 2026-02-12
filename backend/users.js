const pool = require('./database')

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}

const createUser = (request, response) => {
    const { name, email } = request.body;

    if (!name || !email) {
        return response.status(400).json({ error: "Name and email are required" });
    }

    pool.query('INSERT INTO users(name, email) VALUES($1, $2) RETURNING *', [name, email], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).json(results.rows[0]);
    });
}



const getUserById = (request, response) => {
    const id = parseInt(request.params.id);
    if (isNaN(id)) return response.status(400).json({ error: "Invalid ID" });

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) throw error;
        if (results.rows.length === 0) {
            return response.status(404).json({ error: "User not found" });
        }
        response.status(200).json(results.rows[0]);
    });
}


const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Name and email are required" });

  pool.query(
    'UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *',
    [name, email, id],
    (err, result) => {
      if (err) throw err;
      if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
      res.status(200).json(result.rows[0]);
    }
  );
};


const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  pool.query('DELETE FROM users WHERE id=$1 RETURNING *', [id], (err, result) => {
    if (err) throw err;
    if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: `User deleted with ID: ${id}` });
  });
};


module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
} 

// only for testing
//module.exports = {getUsers}