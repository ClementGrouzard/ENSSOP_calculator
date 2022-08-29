const boutons = document.getElementsByClassName("btn")
const resultat = document.getElementById("result")
let number = "";
let calcul = []

for (let bouton of boutons) {
    bouton.addEventListener("click", handleClick)
}

document.addEventListener("keydown", saisieClavier);

function handleClick(event) {
    const saisie = event.target.innerText
    gererSaisie(saisie);
}

function saisieClavier(event) {
    const saisie = event.key
    gererSaisie(saisie);
}

function gererSaisie(saisie) {

    switch (saisie) {
        case "-":
        case "+":
        case "/":
        case "*":
            ajouteAfficheOperateur(saisie) // operateur (L.40) = saisie
            break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            ajouteAfficheChiffre(saisie)
            break;
        case "c":
        case "Backspace":
            effacerEntrees()
            break;
        case "=":
            calculer()
            break;
    }
}

function ajouteAfficheOperateur(operateur) {
    if (calcul[0] != undefined || number != "") { //On peut aussi écrire calcul[0] seul
        if (number == "") {
            //il faut remplacer le dernier operateur 
            calcul.pop()
            calcul.push(operateur)
        } else {
            //sinon ajt l'operateur
            calcul.push(parseInt(number));
            calcul.push(operateur);
            number = "";
        }
        resultat.innerText = calcul.join("");
    } else {
        console.log("Le calcul est vide");
    }
}

function ajouteAfficheChiffre(chiffre) {
    number += chiffre;
    resultat.innerText = calcul.join("") + number;
}

function effacerEntrees() {
    calcul = [];
    number = "";
    resultat.innerText = "";
}

function calculer() {

    if (number != "") {
        calcul.push(parseInt(number));
        number = "";
        while (calcul.indexOf("/") != -1 || calcul.indexOf("*") >= 0) { // syntaxe équivalente
            let posDiv = calcul.indexOf("/");
            let posMult = calcul.indexOf("*");
            if ((posMult < posDiv && posMult != -1) || posDiv == -1) {
                const resultatOperation = calcul[posMult - 1] * calcul[posMult + 1];
                calcul.splice(posMult - 1, 3, resultatOperation);
            } else {
                const resultatOperation = calcul[posDiv - 1] / calcul[posDiv + 1];
                calcul.splice(posDiv - 1, 3, resultatOperation);
            }
        }
        while (calcul.length >= 3) {
            if (calcul[1] == "+") {
                const resultatOperation = calcul[0] + calcul[2];
                calcul.splice(0, 3, resultatOperation);
            } else {
                const resultatOperation = calcul[0] - calcul[2];
                calcul.splice(0, 3, resultatOperation);
            }
        }
        if (calcul[0] != undefined) {
            //result.innerText = calcul[0];
            //number = calcul[0]; => Solution où on vide le tableau
            //calcul = [];
            calcul.push("");
            result.innerText = calcul.join("");
        };
    } else {
        console.log("le dernier element du tableau n'est pas un nombre");
    }
}