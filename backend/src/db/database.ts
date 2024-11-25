import { MongoClient, Collection } from "mongodb";

const uri = "mongodb://localhost:27017"; 
const client = new MongoClient(uri);

export const connectDB = async () => {
  try {
    await client.connect();
    console.log('MongoDB conectado');
    return client.db('shopper-teste'); 
  } catch (error) {
    console.error('Erro ao conectar com MongoDB:', error);
    process.exit(1);
  }
};

export const getDB = () => client.db('shopper-teste');
