import express from 'express'

const router = express.Router();

export const createPost = async (req, res) => {
    const newSearchedKeyword = req.body
    console.log(newSearchedKeyword)
}