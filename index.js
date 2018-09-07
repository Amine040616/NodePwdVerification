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
})

// Validation adresse mail :

app.post('/', (req, res) => {
     
    var identify = req.body.identifiant;
    var found = "Votre Identifiant est invalide";
    var evo = 0;
    var valid = 0;
    var reponse = "";

    //var forme = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

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
})

app.get('/app', (req, res) => res.send('Hello mouch World!'))


app.listen(5000, () => console.log('Example app listening on port 5000!'))