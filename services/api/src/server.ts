import app from './app';
import { CONFIG } from './config';

const port = Number(CONFIG.PORT);
app.listen(port, () => {
  console.log(`RUACH API listening on ${port}`);
});
