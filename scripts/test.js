import dotenv from 'dotenv'

dotenv.config({ path: '.env' });

console.log(process.env.Firebase_measurementId);

console.log(import.meta.env.Firebase_apiKey);
