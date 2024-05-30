import asyncHandler from "express-async-handler";

const Category = require("../models/category");
const Product = require("../models/product");
import dataCatagory from "../../data/cate_brand";
import dataProduct from "../../data/data2.json";
import slugify from "slugify";

// export const insert = asyncHandler(async(req,res) => {
//     await dataCatagory.forEach(cate => (
//         insertCate(cate)
//     ))
//     return res.json('OK')
// })

export const insert2 = asyncHandler(async (req, res) => {
  await dataProduct.forEach((product) => insertProduct(product));
  return res.json("OK");
});

// const insertCate = async(cate) => {
//     await Category.create({
//         title: cate.title,
//         brand: cate.brand,
//         image: cate.image,
//         icon: cate.icon
//     })
// }

const insertProduct = async (product) => {
  await Product.create({
    title: product?.name,
    slug: slugify(product?.name) + Math.round(Math.random() * 100) + '',
    description: product?.description,
    brand: product?.brand,
    price: Math.round(Number(product?.price?.match(/\d/g).join("")) / 100),
    category: product?.category[1],
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: product?.images,
    color: product?.variants?.find((el) => el.label === "Color")?.variants[0],
    thumb: product?.thumb,
    totalRatings: 0,
  });
};
