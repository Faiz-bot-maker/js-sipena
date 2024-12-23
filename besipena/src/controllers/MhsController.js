const dbConnection = require('../config/Database');
  
exports.getPenelitian = async (req, res) => {
   
    const query = 'SELECT * FROM penelitian '; 
    dbConnection.query(query, (err, results) => { 
      if (err) {
        console.error('Kesalahan query database:', err);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
      }
      res.json({penelitian:results});
    });
        
};





