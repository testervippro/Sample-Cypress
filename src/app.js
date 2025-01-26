const { exec } = require('child_process');

// Define the command
const command = 'NGROK_AUTHTOKEN=2rY9YqgpPARdpK34kiVFwAzhajr_37gX2rHushKdELPhkTaof node index.js';

// Execute the command
exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing command: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Command stderr: ${stderr}`);
        return;
    }
    console.log(`Command output: ${stdout}`);
});