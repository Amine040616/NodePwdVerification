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



//validation nickname :

function nickname (req, res){
    var validate = "Votre pseudonyme n'est pas valide";
    for (var i = 0; i < req.length; i++) {
        if (req[i] == " ") {
            validate = "Votre pseudonyme n'est pas valide";
            break;
        } else {
            validate = "Votre pseudonyme est valide";
        }   
    }
    res.send(validate);
};

app.post('/pseudonyme', (req, res) => {
    nickname(req.body.pseudonyme, res);
});

//validation birth Date :

function age (a, b){
    var oneyear = 60*60*24*365*1000;
    return Math.floor(Math.abs(a-b)/oneyear);
}

function birthdatevalidation (req, res){
    var validate = "Vous n'avez pas l'age pour accéder au site";
    var birthdate = req.body.daybirth + " " + req.body.monthbirth + " " + req.body.yearbirth;
    var ancien = Date.parse(birthdate);
    var present = Date.now();
    
    console.log(age (present, ancien));
    
    if (age (present, ancien) < 18) {
        validate = "Vous n'avez pas l'age pour accéder au site";
    } else {
        validate = "Bienvenue dans notre site web";
    }   
    
    res.send(validate);
};



app.post('/birthdate', (req, res) => {
    birthdatevalidation(req, res);
});

// Validation adresse mail :

//Function mailvalidation :

function mailvalidation (req, res){
    var rightexpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (rightexpression.test(req)){
        res.send("Votre Identifiant est valide");
    } else {
        res.send("Votre Identifiant est invalide");
    }
};


app.post('/method04mail', (req, res) => {
    mailvalidation(req.body.identifiant, res);
});


// Validation MDP :

//Function mdpvalidation :

function mdpvalidation (req, res){
    
    var nimrou = ["@","_","-",".",",",";",":"];
    var power = 0;
    var powerMessages = ['Faible', 'Normale', 'Fort', 'Super', 'Mot de passe invalide.'];
    
    if(req.length < 8){
        power = "4";
    } else {
    
        for (var i = 0; i < req.length; i++) {
            if(isNaN(req[i]) == false){
                power++;
                console.log('Number');
                break;
            }
        }

        for (var i = 0; i < req.length; i++) {
            if(nimrou.indexOf(req[i]) == -1 && isNaN(req[i]) && req[i] == req[i].toUpperCase()){
                power++;
                console.log('Uppercase');
                break;
            }
        }

        for (var i = 0; i < req.length; i++) {
            if(nimrou.indexOf(req[i]) > -1){
                power++;
                console.log('Special');
                break;
            }   
        }                
    }
    
    res.send(powerMessages[power]);
    };
    
    
    app.post('/method04mdp', (req, res) => {
        mdpvalidation(req.body.password, res);
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