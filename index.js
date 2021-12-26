
//required packages
const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

//create the express server
const app = express();

//server port number
const PORT =process.env.PORT || 3030;

app.set("view engine", "ejs");

app.use(express.static("public"))

app.use(express.urlencoded({
    extended: true

}))

app.use(express.json());

app.get("/", (req, res) => {
    res.render("index")

})

app.post("/convert-mp3", async (req, res) => {
    const videoId = req.body.videoID;
    if ( 
        videoId === undefined ||
        videoId === "" ||
        videoId === null
    ) {
        return res.render("index", { success: false, message: "Pleas enter a video ID" });
    } else {
        const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, {
            "methode": "GET",
            "headers": {
                "x-rapidapi-key": process.env.API_KEY,
                "x-rapidapi-host": process.env.API_HOST
            }
        });
        const fetchResponse = await fetchAPI.json();

        if (fetchResponse.status === "ok") {
            return res.render("index", {success: true, song_title: fetchResponse.title, song_link: fetchResponse.link
            }); 
        }
            else {
                return res.render("index", { success: false, message: fetchResponse.msg })
            }
       
    }


})


//start the server 
app.listen(PORT, () => {
    console.log(`server start on port ${PORT}`);

})
