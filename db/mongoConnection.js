const { MongoClient } = require("mongodb");
require("dotenv").config();
const mongo = () => {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  return client;
};

module.exports = {
  getData: async (databaseName, collection, query) => {
    const client = mongo();
    await client.connect();
    const database = client.db(databaseName);
    const collections = database.collection(collection);
    const data = await collections.find(query).toArray();
    client.close();
    return data;
  },

  getOrderData: async (databaseName, collection, query, order, number) => {
    const client = mongo();
    await client.connect();
    const database = client.db(databaseName);
    const collections = database.collection(collection);
    const data = await collections
      .find(query)
      .sort([[order, -1]])
      .limit(number)
      .toArray();
    client.close();
    return data;
  },

  insertData: async (databaseName, collection, insertingOBJ) => {
    const client = mongo();
    await client.connect();
    const database = client.db(databaseName);
    const collections = database.collection(collection);
    try {
      await collections.insertOne(insertingOBJ);
    } catch (e) {
      console.log(e);
    } finally {
      client.close();
    }
  },

  deleteData: async (databaseName, collection, queryToDelete) => {
    const client = mongo();
    await client.connect();
    const database = client.db(databaseName);
    const collections = database.collection(collection);

    try {
      await collections.deleteOne(queryToDelete);
    } catch (e) {
      console.log(e);
    } finally {
      client.close();
    }
  },

  updateData: async (databaseName, collection, queryToUpdate, newValues) => {
    const client = mongo();
    await client.connect();
    const database = client.db(databaseName);
    const collections = database.collection(collection);

    try {
      await collections.updateOne(queryToUpdate, newValues);
    } catch (e) {
      console.log(e);
    } finally {
      client.close();
    }
  },
};
