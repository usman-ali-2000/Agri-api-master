const mongoose = require('mongoose');
mongoose.set('strictQuery', false);


async function checkConnection() {

  try {
   await mongoose.connect('mongodb+srv://usmanzulfiqar14:agri-api12345@agri-data.nxksfyb.mongodb.net/?retryWrites=true&w=majority');
    console.log('Connected to MongoDB');

    const state = mongoose.connection.readyState;
    console.log(`Connection state: ${state}`);

    
   
  } catch (error) {
    console.error(`Connection error: ${error.message}`);
    process.exit(1);  
}
   
}

process.on('uncaughtException', err => {
    console.error(`Uncaught exception: ${err}`);
    process.exit(1);
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    console.error(`Unhandled rejection at ${promise}, reason: ${reason}`);
    process.exit(1);
  });

checkConnection();