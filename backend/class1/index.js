let express = require("express")

require("dotenv").config();

let App = express();

App.use(express.json());

App.get('/', (req, res) => {
    // let { username, password } = req.body;
    // console.log(username, password);
    let obj = {
        message: "Hello from Express!"
    }
    res.send(obj);

})


App.get("/about", (req, res) => {
    const queryData = req.query;
    const obj = [
        {
            name: "John Doe",
            age: "32",
            city: "New York",
            profession: "Software Engineer"
        },
        {
            name: "Peter Parker",
            age: "31",
            city: "San Jose",
            profession: "Lawyer"
        },
        {
            name: "Hulk",
            age: "39",
            city: "California",
            profession: "Chemist"
        },
        { 
            name: "Ironman",
            age: "41",
            city: "New Jersey",
            profession: "Engineer"
        }
    ];

    // Find the object where name matches the query string
    const found = obj.find(person => person.name.toLowerCase() === queryData.name.toLowerCase());

    if (found) {
        res.send(
            { 
                age: found.age,
                profession: found.profession
            }
        );
    } else {
        res.send({ message: "Name not found" });
    }
})

App.get("/news", (req, res) => {
    let obj = {
        status: "1",
        news: "Breaking News: New JavaScript Features Released!"
    }
    res.send(obj);
})

App.listen(process.env.PORT ?? 8000, () => {
    console.log(`Server is running on port ${process.env.PORT ?? 8000}`);
})