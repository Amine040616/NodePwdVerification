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
/*
app.post('/', (req, res) => {
    //console.log(req.body())
    req.body.timestamp = Math.floor(new Date().getTime()/1000);
    res.send(req.body)
})*/


   

app.post('/', (req, res) => {
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

                
    }
    res.send(powerMessages[power]);
    /*



    for (var i = 0; i < chaine.length; i++) {
        var numerik = isNaN(chaine[i]);
        console.log(numerik);

        if(numerik == false && chaine[i] == chaine[i].toUpperCase()){
            found = "Mot de passe est normal";
            console.log(found);
            break;
        }
    }

    for (var i = 0; i < chaine.length; i++) {
        var numerik = isNaN(chaine[i]);
        console.log(numerik);
        
        if (numerik == false) {
        console.log(chaine[i]);
        found = "Mot de passe est faible";
        console.log(found);
        break;
        }
    }




for (var i = 0; i < chaine.length; i++) {
         if (nimrou.indexOf(chaine[i]) > -1) {
            console.log(chaine[i]);
            found = "Le numero trouver est : " + chaine[i] + " dans la position : " + i;
            break;
            //found++;
         } 

    /*
    for (var i = 0; i < chaine.length; i++) {
        var numerik = isNaN(chaine[i]);
        console.log(numerik);
        if (numerik == false) {
           console.log(chaine[i]);
           var found = "Le numero trouver est : " + chaine[i] + " dans la position : " + i;
           console.log(found);
           //found++;
           break;
        } 
        
   }*/
   
    /*
    var what = nimrou.indexOf(chaine);
    console.log(what);
    console.log(chaine);
    if(what > 0){
        res.send("sa77itek");
        console.log(req.body.password);
    } else {
        res.send("mouch sa77itek");
        console.log(req.body.password);
    }
    */
})

app.get('/app', (req, res) => res.send('Hello mouch World!'))


app.listen(5000, () => console.log('Example app listening on port 5000!'))