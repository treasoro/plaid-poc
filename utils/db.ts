import pg from 'pg';

export async function addUser(username: string) {
    const { Client } = pg
    const client = new Client()
    await client.connect()

    const text = "INSERT INTO public.users (username) VALUES ($1) RETURNING *"
    const values = [username]
    let result
    try {
        result = await client.query(text, values);
    } catch (error) {
        console.error(error)
        return error
    } finally {
        await client.end()
    }
    if (result) {
        console.log(result.rows[0])
        return result.rows[0]
    }
    return null
}

export async function getUserList() {
    const { Client } = pg
    const client = new Client()
    await client.connect()

    const query = "SELECT * FROM users"
    let result
    try {
        result = await client.query(query)
    } catch (error) {
        console.error(error)
        return error        
    } finally{
        await client.end()
    }
    if (result) {
        console.log("getUserList")
        console.log(result)
        return result.rows
    }
    return null
}

export async function getUserRecord(userId: number) {
    const { Client } = pg
    const client = new Client()
    await client.connect()

    const query = "SELECT * FROM users WHERE id = $1"
    const values = [userId]
    let result
    try {
        result = await client.query(query, values)
    } catch (error) {
        console.error(error)
        return error        
    } finally{
        await client.end()
    }
    if (result) {
        console.log("getUserRecord result")
        console.log(result)
        return result.rows[0]
    }
    return null
}