const express =require('express')
const routes =express.Router()
const conn = require('../db/database')



routes.post('/fullVerify' ,(req , res)=>{ 
     const {  fullName ,contact, email,address} =req.body
     if( fullName  || contact || email ||address){
  const query = `INSERT INTO products(fullname, contact , email , address) VALUES (?, ?, ?, ? )`;
  const values= [ fullName  ,contact , email ,address]
 const results = conn(query, values,(error, Result)=>{
    if(!results){
        res.status(400).json({mess : "error inserting data base"})
    }else {
        res.status(200).json({mess : " successfull inserting data"})
    }

  })
     }else{ 
        console.log('value not found');
        
     }
})




module.exports = routes