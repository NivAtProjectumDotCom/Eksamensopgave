
// DETTE ER EN COPY PASTE FRA HELPER MAPPEM



//Opretter og gemmer ændringer på brugerne(vores data). Fx. ved at tilføje eller slette en bruger.
var fs = require("fs"); //File system module, som giver os tilladelse til at arbejde med fil system på computeren. Vi kan læse vores filer. Vi bruger den fordi vi har en fil i vores computer som vi vil have i js. 


const absolutePath = __dirname + "/../../data"; //Vi refererer til mappen data. 
const brugerFil = "/brugere.json"; // brugere.json bliver lagt over.  
const vareFil = "/varer.json"; //  




class database { //Når class bruges, behøves der ikke at blive skrevet function foran alle nedenstående funktioner. 
    constructor() {
      this.brugere = this.aabenFil(brugerFil); //Her gemmes listen med brugerne og der holdes styr på mens koden kører, hvad der står i databasen. Der laves en variabel kaldet this.user i class funktionen og openFile filen tilføjes med indholdet fra filen users.json. Så hver eneste gang der lavet DB objekt, laves en users variabel, som var indholdet af users.json fil.    
      this.varer = this.aabenFil(vareFil); //Her gemmes listen med brugerne og der holdes styr på mens koden kører, hvad der står i databasen. Der laves en variabel kaldet this.user i class funktionen og openFile filen tilføjes med indholdet fra filen users.json. Så hver eneste gang der lavet DB objekt, laves en users variabel, som var indholdet af users.json fil.    

    }

    gemFil(fileName, contentString) { //Denne funktion bruges til at gemme en fil med brugerne. 
      fs.writeFileSync(absolutePath+ fileName, contentString); // Vi gemmer filen ved at bruge fs.modulet igen. I parameteren accepteres to argumenter Det ene er, hvor vi skriver filen til og det andet er, hvad der skal stå i den (this.users objekt). Dette er samme sted som vi læser den fra. API'en vil erstatte indholdet af filen hvis det ikke allerede eksisterer. 
    }

    aabenFil(fileName) { //Denne funktion bruges til at åbne en fil med brugerne.
      const fil = fs.readFileSync(absolutePath + fileName); // Der defineres en variabel kaldet file, og indeholdet af variablet skal være fs.readFile.  Synkron funktion bruges, da den skal køres uanset hvor lang tid det tager. User-file bliver lagt til absolut file. Hvis programmet nu køres, har vi vores fil data. 
      return JSON.parse(fil); //Før var filen en streng, men nu parses den til en json. Indholdet af filen skal læses. 
    }
  
    gemBruger(bruger) { //Her gemmer vi en bruger. Nu hvor vi har funktionaliteten om at åbne og gemme en fil, kan vi gemme en bruger. Vi skriver user objekt med i funktionen. 
      this.brugere.push(bruger); //Vi pusher user elementet til slutningen af arrayet i this.user
      this.gemFil(brugerFil, JSON.stringify(this.brugere)); //Filen skal nu gemmes, og derfor bruges saveFile funktionen. Denne funktion sørger for, at opdateringen på users bliver lagt i filen. 
    }
  
    sletBruger(bruger) {
      this.brugere = this.brugere.filter((x) => x.email != bruger.email);
      this.gemFil(brugerFil, JSON.stringify(this.brugere));
    }
  
    findBruger(bruger) {
      return this.brugere.find((x) => bruger.email == x.email); //Brugeren findes via den indtastede email som er blevet postet. 
    }




    //Databasefunktion til at gemme en vare
    gemVarer(vare) { 
      this.varer.push(vare); 
      this.gemFil(vareFil, JSON.stringify(this.varer));
      
    }

    //Databasefunktion til at slette en vare
   
    sletVare(vare) {
      console.log(this.varer)
      this.varer = this.varer.filter((x) => x.vareId != vare.vareId);
      
      this.gemFil(vareFil, JSON.stringify(this.varer));
    }

  }



module.exports = new database();