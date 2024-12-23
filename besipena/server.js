const app = require('./src/app');
const PORT = process.env.PORT || 3010;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${server.address().port}`);
});

// Handle errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${error.port} is already in use. Please try another port.`);
        process.exit(1);
    } else {
        console.error('Server error:', error);
    }
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
