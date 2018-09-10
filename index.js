const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
});

// Validation adresse mail :

//Function mailvalidation :

function mailvalidation (req, res){
    var rightexpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (rightexpression.test(req)){
        return res.send("Votre Identifiant est valide");
    } else {
        return res.send("Votre Identifiant est invalide");
    }
};


app.post('/method04', (req, res) => {
    mailvalidation(req.body.identifiant);
});

// Regex :
// Method test(); :

app.post('/method02', (req, res) => {
    var identify = req.body.identifiant;
    var rightexpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (rightexpression.test(identify)){
        res.send("Votre Identifiant est valide");
    } else {
        res.send("Votre Identifiant est invalide");
    }
});

// Method match(); :

app.post('/method03', (req, res) => {
    var identify = req.body.identifiant;
    var rightexpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var found = identify.match(rightexpression);
    console.log(found);
    if (!found){
        console.log("Votre Identifiant est invalide ya bacha");
        res.send("Votre Identifiant est invalide");
    } else {
        console.log("Votre Identifiant est valide ya bacha");
        res.send("Votre Identifiant est valide");
    }
});

// NonRegex :

app.post('/', (req, res) => {
     
    var identify = req.body.identifiant;
    var found = "Votre Identifiant est invalide";
    var evo = 0;
    var valid = 0;
    var reponse = "";


    for (var i = 0; i < identify.length; i++) {
        
        if (identify[i] == "@" && i>1){
            evo = i;
            valid = valid + 1;
            console.log("Charactére est : " + identify[i] + " à la position : " +i);
        }
        if (identify[i] == "." && i>evo+3){
            evo = i;
            valid = valid + 1;
            console.log("Charactére est : " + identify[i] + " à la position : " +i);
        }
        if (valid == 2 && i>evo+2){
            console.log("Charactére est : " + identify[i] + " à la position : " +i);
            found = "Votre Identifiant est valider";
        }  
    }

    // Validation MDP :

    // NonRegex :

    if (found == "Votre Identifiant est valider"){

    var nimrou = ["@","_","-",".",",",";",":"];
    var chaine = req.body.password;
    var power = 0;
    var powerMessages = ['Faible', 'Normale', 'Fort', 'Super', 'Mot de passe invalide.'];
    
    if(chaine.length < 8){
        power = "4";
    } else {
    
        for (var i = 0; i < chaine.length; i++) {
            if(isNaN(chaine[i]) == false){
                power++;
                console.log('Number');
                break;
            }
        }

        for (var i = 0; i < chaine.length; i++) {
            if(nimrou.indexOf(chaine[i]) == -1 && isNaN(chaine[i]) && chaine[i] == chaine[i].toUpperCase()){
                power++;
                console.log('Uppercase');
                break;
            }
        }

        for (var i = 0; i < chaine.length; i++) {
            if(nimrou.indexOf(chaine[i]) > -1){
                power++;
                console.log('Special');
                break;
            }   
        }

        reponse = found + "  et votre mot de passe du niveau : " + powerMessages[power];
                
    }}else{
        reponse = found;
    }
    
    //res.send(found + "  et votre mot de passe du niveau : " + powerMessages[power]);
    res.send(reponse);
});




app.get('/app', (req, res) => res.send('Hello mouch World!'));


app.listen(5000, () => console.log('Example app listening on port 5000!'));