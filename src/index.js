import app from './app.js';

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
