import { app } from './app.js';
// Init dotenv config to listen environtment variables
import { config } from 'dotenv';
config();
//Import 'cors' to allow CROSS ORIGIN transfers
import cors from 'cors';
app.use(cors());

//Set additional configs
import constants from './config.js';
const port = constants.port;

//Start server
app.listen(port);

try {
  console.log(`Server listening on port ${port}`);
} catch (error) {
  console.log(error);
}
