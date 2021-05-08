const Express = require("express");
const fs = require("fs");
const app = Express();

const PORT = 8080;

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/post", (req, res) => {});

app.listen(PORT, () => {
    console.log(`listening on port" ${PORT}`);
});
