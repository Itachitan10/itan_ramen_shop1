const express = require("express")
const routes =express.Router()



const products = [
  {
    id: 1,
    name: "Shoyu Ramen",
    category: "Ramen",
    price: 250,
    img: "https://static01.nyt.com/images/2024/01/10/multimedia/ND-Shoyu-Ramen-qflv/ND-Shoyu-Ramen-qflv-threeByTwoMediumAt2X.jpg",
    createDate: "2025-06-05",
  },
  {
    id: 2,
    name: "Miso Ramen",
    category: "Ramen",
    price: 270,
    img: "https://tse3.mm.bing.net/th/id/OIP.5dK9nU1_HKGa8mzs4FUjGgHaHa?r=0&rs=1&pid=ImgDetMain",
    createDate: "2025-06-05",
  },
  {
    id: 3,
    name: "IcedCoffee",
    category: "Coffee",
    price: 120,
    img: "https://i.pinimg.com/originals/44/c8/68/44c8684d4f81e86197c69abfbbf74b56.jpg",
    createDate: "2025-06-05",
  },
  {
    id: 4,
    name: "Matcha Latte",
    category: "Coffee",
    price: 140,
    img: "https://th.bing.com/th/id/OIP.JmkxzaVJsfQH1Wf2I6wukwHaHa?w=198&h=198&c=7&r=0&o=5&pid=1.7",

    createDate: "2025-06-05",
  },
  {
    id: 5,
    name: "Takoyaki",
    category: "Food",
    price: 180,
    img: "https://th.bing.com/th/id/OIP.5Nn8OVMpUjK_sctVnHwl8AHaE8?w=256&h=180&c=7&r=0&o=5&pid=1.7",
    createDate: "2025-06-05",
  },
  {
    id: 6,
    name: "Karaage",
    category: "Food",
    price: 200,
    img: "https://th.bing.com/th/id/OIP.TOGVguWM5Alsj962il9zFwHaE8?w=253&h=180&c=7&r=0&o=5&pid=1.7",
    createDate: "2025-06-05",
  },
];

// Route for /product

routes.get('/product' , (req, res)=>{
    if(products){
    res.json({product : products })
  }

  })

module.exports = routes