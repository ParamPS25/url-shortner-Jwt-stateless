const Url = require("../models/urlModel");
//const {nanoid} = require("nanoid");

function generateRandomString() {
    const length = 8;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return String(result);
}

async function GenerateNewShortUrl(req, res) {
    if (!req.body.originalUrl) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        // Check if the URL already exists
        const existingUrl = await Url.findOne({ originalUrl: req.body.originalUrl });
        if (existingUrl) {
            return res.status(400).json({ error: "URL already exists" });
        }

        const newUrl = new Url({
            shortId: generateRandomString(),
            originalUrl: req.body.originalUrl,
            visitHistory: [],
            createdBy : req.user._id      // as authMiddleware added property to req.user object that will give user wrt to uuid and here we only need ._id of user to store in document record of url
        });
        await newUrl.save();
        res.render("home.ejs", {
            id: newUrl.shortId
        });
    } 
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getAnalytics(req,res){
    const shortId = req.params.shortId;
    if(!shortId) return res.json({err:"invalid shortId"});

    const result = await Url.findOne({shortId});

    res.json({
        totalClicks : result.visitHistory.length,
        analytics : result.visitHistory
    });
}

async function listAllUrl(req,res){
    try{
    const url = await Url.find()
    res.json(url)
    }
    catch(err){
        res.json({message:err.message})
    }
}

module.exports = {
    GenerateNewShortUrl,
    getAnalytics,
    listAllUrl
}