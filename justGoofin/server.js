const express = require('express');
const monkeyRoutes = require("./monkeyRoutes")
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/apes", monkeyRoutes)

// app.get("/monkey/gorilla", (req, res) => {
//     console.log("Monkey hit")
//     res.status(200)
// })

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
