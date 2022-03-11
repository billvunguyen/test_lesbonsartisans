const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
//pars request of content type - application/json
app.use(bodyParser.json());
// pars requests of content type application/x-www/form-urlenconded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.json ({ message: "Hello world" });
});
// set port, listen for resquest
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
const Role = db.role;
db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => {
        console.log("Connected to the database.");
        initial();
    })
    .catch(err => {
        console.log("Cannot connect to the database.", err);
        process.exit();
    });

    function initial() {
        Role.estimatedDocumentCount((err, count) => {
            if (!err & count === 0) {
                new Role({
                    name: "user"
                }).save(err => {
                    if (err) {
                        console.log("error", err);
                    }
                    console.log("added 'user' to roles collection");
                });
                new Role({
                    name: "moderator"
                }).save(err => {
                    if (err){
                        console.log("error", err);
                    }
                    console.log("added 'moderator' to roles collection")
                });
                new Role({
                    name: "admin"
                }).save(err => {
                    if (err){
                        console.log("error", err);
                    }
                    console.log("added 'admin' to roles collection")
                });
            }
        });
    }