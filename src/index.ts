import { createServer } from "http";
import configuration from "./common/configurations/config";
import app from "./app";
import { createMongoConnection } from "./common/utils/db.util";
import logger from "./common/utils/logger.util";

const PORT = configuration.port;
const server = createServer(app);

server.listen(PORT, async () => {
  try {
    await createMongoConnection();
    logger.info(`Server started at PORT ${PORT}`);
  } catch (error) {
    logger.error({ error });
    process.exit(1);
  }
});
