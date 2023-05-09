// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model")

// all your routes here


//* GET "/celebrities/create" => render la vista donde se crearan celebridades
router.get("/create", (req, res, next) => {
    Celebrity.find()
    .then((allCelebrities)=>{
        res.render("celebrities/new-celebrity.hbs", {
            allCelebrities: allCelebrities, 
        })
    })
    .catch((err) => {
        next(err)
    });
})



//* POST "/celebrities/create" => recibe info de un libro y lo crea agregandolo a la base de datos
router.post("/create", (req, res, next) => {
    console.log(req.body)
    Celebrity.create({
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    })
    .then(() => {
        console.log("Famoso creado")
        res.redirect("/celebrities") 
    })
    .catch((err) => {
        next(err)
    });
});

//* GET "/celebrities" => render todas las celebrities
router.get("/", (req, res, next) => {
    Celebrity.find()
    .select({name: 1})
    .then((allNames) => {
        console.log(allNames)
        res.render("celebrities/celebrities.hbs", {
            allNames: allNames
        })
    })
    .catch((err) => {
        next(err)
    })
})







module.exports = router;