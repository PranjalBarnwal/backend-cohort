import { Client } from 'pg';

const client=new Client({
    connectionString:"postgresql://mydb_owner:R8psaQuK5BZT@ep-green-bonus-a5btoru8.us-east-2.aws.neon.tech/mydb?sslmode=require"
})


 
async function createUsersTable(){
    await client.connect();
    const result=await client.query(
        `CREATE TABLE customers (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )`
    )
    console.log(result);
    
}

createUsersTable();