const {Table,db} = require('./db.config')
const crypto = require('crypto')
// Create or Update users
const createOrUpdate = async (data = {}) =>{

    const postitem = {
        POST_ID : crypto.randomUUID(),
        POST_TITLE : data['POST_TITLE'],
        POST_CONTENT: data['POST_CONTENT']
      }


    const params = {
       TableName: "POSTS",
        Item: postitem
    }

    try{
        await db.put(params).promise()
        return { success: true }
    } catch(error){
        console.log(error);
        return { success: false}
    }
}

const insertMany = async (data = []) => {
    try {
        data.map( async(value,index) => {
            const status = await createOrUpdate(value);
        })
        return {success:true}
    } catch (error) {
        return {success:false}
    }
}

// Read all users
const readAllPosts = async()=>{
    const params = {
       TableName: "POSTS"
    }

    try{
        const { Items = [] } = await db.scan(params).promise()
        return { success: true, data: Items }

    } catch(error){
        console.log(error);
        return { success: false, data: null }
    }

}

// Read Users by ID
const getPostById = async (value, key = 'id') => {
    const params = {
        TableName: "POSTS",
        Key: {
            [key]: value
        }
    }
    try {
        const { Item = {} } =  await db.get(params).promise()
        return { success: true, data: Item }
    } catch (error) {
        return {  success: false, data: null}        
    }
}

// Delete User by ID
const deletePostById = async(value, key = 'id' ) => { 
    const params = {
       TableName: "POSTS",
        Key: {
            [key]: value
        }
    }
        
    try {
        await db.delete(params).promise()
        return {  success: true }

    } catch (error) {
        return{ success: false }
    }
}


module.exports = {
    createOrUpdate,
    insertMany,
    readAllPosts,
    getPostById,
    deletePostById
}