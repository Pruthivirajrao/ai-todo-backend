import dotenv from "dotenv";
import app from "./app";
import connectDataBase from "./config/database";

dotenv.config();

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  await connectDataBase();

  app.listen(PORT, () =>
    console.log(`Server is successfully running at http://localhost:${PORT}`),
  );
};
startServer();
