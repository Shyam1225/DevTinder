const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked!");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized) {
        res.status(401).send("Unauthorized user");
    }
    else{
        next();
    }
}

const userAuth = (req, res, next) => {
    console.log("User auth is getting checked!");
    const token = "xyz1";
    const isUserAuthorized = token === "xyz1";
    if(!isUserAuthorized) {
        res.status(401).send("Unauthorized user");
    }
    else{
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth
}