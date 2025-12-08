import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "", {
      dbName: "db-sipontren",
    });

    return Promise.resolve("Database connected");
  } catch (error) {
    return Promise.reject(error);
  }
};

// export
export default connect;
