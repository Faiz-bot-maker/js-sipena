const dbConnection = require('../config/Database');

// Get all penelitian
exports.getAllPenelitian = (req, res) => {
    const query = 'SELECT * FROM penelitian';
    
    dbConnection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching penelitian:', err);
            res.status(500).json({
                status: false,
                message: 'Failed to fetch penelitian',
                error: err
            });
        } else {
            res.status(200).json({
                status: true,
                message: 'Successfully retrieved penelitian',
                data: results
            });
        }
    });
};

// Get penelitian by ID
exports.getPenelitianById = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM penelitian WHERE kd_penelitian = ?';
    
    dbConnection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching penelitian:', err);
            res.status(500).json({
                status: false,
                message: 'Failed to fetch penelitian',
                error: err
            });
        } else if (results.length === 0) {
            res.status(404).json({
                status: false,
                message: 'Penelitian not found'
            });
        } else {
            res.status(200).json({
                status: true,
                message: 'Successfully retrieved penelitian',
                data: results[0]
            });
        }
    });
};

// Create new penelitian
exports.createPenelitian = (req, res) => {
    const { judul, lokasi, thn_akademik, tanggal, status } = req.body;
    const query = 'INSERT INTO penelitian (judul, lokasi, thn_akademik, tanggal, status) VALUES (?, ?, ?, ?, ?)';
    
    dbConnection.query(query, [judul, lokasi, thn_akademik, tanggal, status], (err, results) => {
        if (err) {
            console.error('Error creating penelitian:', err);
            res.status(500).json({
                status: false,
                message: 'Failed to create penelitian',
                error: err
            });
        } else {
            if (!results.insertId) {
                return res.status(500).json({
                    status: false,
                    message: 'Failed to get new penelitian ID',
                });
            }
            
            res.status(201).json({
                status: true,
                message: 'Successfully created penelitian',
                data: {
                    kd_penelitian: results.insertId,
                    judul,
                    lokasi,
                    thn_akademik,
                    tanggal,
                    status
                }
            });
        }
    });
};

// Update penelitian
exports.updatePenelitian = (req, res) => {
    const id = req.params.id;
    const { judul, lokasi, thn_akademik, tanggal, status } = req.body;
    const query = 'UPDATE penelitian SET judul = ?, lokasi = ?, thn_akademik = ?, tanggal = ?, status = ? WHERE kd_penelitian = ?';
    
    dbConnection.query(query, [judul, lokasi, thn_akademik, tanggal, status, id], (err, results) => {
        if (err) {
            console.error('Error updating penelitian:', err);
            res.status(500).json({
                status: false,
                message: 'Failed to update penelitian',
                error: err
            });
        } else if (results.affectedRows === 0) {
            res.status(404).json({
                status: false,
                message: 'Penelitian not found'
            });
        } else {
            res.status(200).json({
                status: true,
                message: 'Successfully updated penelitian',
                data: {
                    kd_penelitian: parseInt(id),
                    judul,
                    lokasi,
                    thn_akademik,
                    tanggal,
                    status
                }
            });
        }
    });
};

// Delete penelitian
exports.deletePenelitian = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM penelitian WHERE kd_penelitian = ?';
    
    dbConnection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting penelitian:', err);
            res.status(500).json({
                status: false,
                message: 'Failed to delete penelitian',
                error: err
            });
        } else if (results.affectedRows === 0) {
            res.status(404).json({
                status: false,
                message: 'Penelitian not found'
            });
        } else {
            res.status(200).json({
                status: true,
                message: 'Successfully deleted penelitian'
            });
        }
    });
};

    