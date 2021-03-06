const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const { generateFile } = require('./functions/generateFile');
const { executeProgram } = require('./functions/execute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5001;

app.use(express.static('./client/build'));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client", "build")));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.post('/run', async (req, res) => {
    const { content, language, args } = req.body;
    const filePath = await generateFile(content, language);
    try {
        const result = await executeProgram(filePath, args);
        try {
            fs.unlinkSync(filePath);
        } catch(err) {
            console.log(err);
        }
        res.json(result);
    } 
    catch (e) {
        console.log(e);
        try {
            fs.unlinkSync(filePath);
            res.json("Error");
        } catch(err) {
            console.error(err);
            res.json("Internal Error");
        }
    }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});