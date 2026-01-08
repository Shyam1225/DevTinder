const express = require('express');
const User = require('../models/user');
const { userAuth } = require("../middleware/auth")
const connectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName age gender skills about photoUrl";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequests = await connectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName", "age", "gender", "about", "skills", "photoUrl"]);
        res.json({
            message: "Data fetched successfully",
            data: connectionRequests,
        });
    }
    catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }

})

userRouter.get("/user/connections", userAuth, async(req, res)=> {
    try{
        const loggedInUser = req.user;

        const connectionRequests = await connectionRequest.find({
            $or: [
                { toUserId : loggedInUser._id, status: "accepted" },
                { fromUserId : loggedInUser._id, status: "accepted" },
            ],
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequests.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId; 
            }
            return row.fromUserId});

        res.json({ data });
    }
    catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
})

userRouter.get("/user/feed", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page-1)*limit;        

        const connectionRequests = await connectionRequest.find({
            $or: [{fromUserId: loggedInUser._id}, {toUserId: loggedInUser._id}]
        }).select("fromUserId toUserId");

        const hideUserFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUserFromFeed) } },
                { _id: { $ne: loggedInUser._id } },
            ],           
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.json({ data: users });
    } catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
})

module.exports = userRouter;