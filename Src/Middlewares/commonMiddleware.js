module.exports = {
    authTokenCheck : async function (req ,res, next) {
        console.log("Middeleware Sucessfully");
        next();
    }
}