import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
const port = 3000
dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());
const userData = [
    {
        id: 1,
        name: "Akarsh",
        age: 20
    },
    {
        id: 2,
        name: "Akshat",
        age: 21
    },
    {
        id: 3,
        name: "Ansh",
        age: 17
    }
];
app.get('/' , (req,res)=>{
    res.send(`listening on port ${port}`)
    res.status(200)
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.get('/users', (req, res) => {
    try {
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/registered', (req, res) => {
    try {
        const { name, age } = req.query;
        const newUser = { id: userData.length + 1, name, age };
        userData.push(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/users/:id', (req, res) => {
    try {
        const id = req.param.id;
        const user = userData.find((u) => u.id == id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/create', (req, res) => {
    try {
        const { name, age } = req.body;
        if(!name || !age) {
            return res.status(400).json({ message: "Name and age are required" });
        }
        const newUser = { id: userData.length + 1, name, age };
        userData.push(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.put('/edit/:id', (req, res) => {
    try {
        const { id } = req.params.id;
        const { name, age } = req.body
        const index = userData.findIndex((u) => u.id == id);
        if (index == -1) {
            return res.status(404).json({ message: "User not found" });
        }
        userData[index] = {id, name, age };
        res.status(200).json(userData[index]);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});