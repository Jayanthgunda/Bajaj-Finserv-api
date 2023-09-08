const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs")
const { log } = require("console");

const app = express();
app.set('view engine', 'ejs');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const user_details = {
    full_name: "Jayanth_Gunda",
    dob: "18122001",
    email: "jayanthgunda123@gmail.com",
    roll_number: "AP20110010281"
};

function findHighestAlphabet(data) {
    const alphabets = data.filter(item => typeof item === 'string' && item.length === 1 && /[a-zA-Z]/.test(item));
    if (alphabets.length > 0) {
        return [alphabets.reduce((a, b) => a > b ? a : b)];
    } else {
        return [];
    }
}

app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid 'data' in the request" });
        }

        const numbers = data.filter(item => typeof item === 'number');
        const alphabets = data.filter(item => typeof item === 'string' && item.length === 1 && /[a-zA-Z]/.test(item));

        const response = {
            is_success: true,
            user_id: `${user_details.full_name}_${user_details.dob}`,
            email: user_details.email,
            roll_number: user_details.roll_number,
            numbers,
            alphabets,
            highest_alphabet: findHighestAlphabet(alphabets)
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ is_success: false, message: "Internal server error" });
    }
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

