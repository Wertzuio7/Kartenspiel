// Spielernamen abfragen
const spieler1Name = prompt("Name von Spieler 1:");
const spieler2Name = prompt("Name von Spieler 2:");

// Kartendeck erstellen
const farben = ["Herz", "Karo", "Pik", "Kreuz"];
const werte = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "bube", "dame", "koenig", "ass"];
const deck = [];
for (const farbe of farben) {
    for (const wert of werte) {
        deck.push({ wert, farbe });
    }
}

// Karten mischen
deck.sort(() => Math.random() - 0.5);

// Stapel erstellen
const stapel1 = deck.slice(0, 17);
const stapel2 = deck.slice(17, 34);
const stapel3 = deck.slice(34, 51);
const stapel4 = deck.slice(51);

// Spieler
const spieler1 = [];
const spieler2 = [];
let aktuellerSpieler = 1;

// Ablage-Stapel
const ablageStapel = [];

// Punktestand
let punktestandSpieler1 = 0;
let punktestandSpieler2 = 0;

// Karten anzeigen
function kartenAnzeigen() {
    document.getElementById("stapel1").innerHTML = "Vorspiel-Phase: " + stapel1.length + " Karten";
    document.getElementById("stapel2").innerHTML = "hot!: " + stapel2.length + " Karten";
    document.getElementById("stapel3").innerHTML = "hotter!: " + stapel3.length + " Karten";
    document.getElementById("stapel4").innerHTML = "hottest!: " + stapel4.length + " Karten";
    document.getElementById("ablageStapel").innerHTML = "Ablage-Stapel: " + ablageStapel.length + " Karten";
    document.getElementById("punktestand").textContent = spieler1Name + ": " + punktestandSpieler1 + " Punkte | " + spieler2Name + ": " + punktestandSpieler2 + " Punkte";
}

kartenAnzeigen();

function karteZiehen(stapelNummer) {
    let gezogeneKarte;
    let stapel;
    if (stapelNummer === 1) {
        stapel = stapel1;
    } else if (stapelNummer === 2) {
        stapel = stapel2;
    } else if (stapelNummer === 3) {
        stapel = stapel3;
    } else {
        stapel = stapel4;
    }
    if (stapel.length > 0) {
        gezogeneKarte = stapel.pop();
        if (aktuellerSpieler === 1) {
            spieler1.push(gezogeneKarte);
            aktuellerSpieler = 2;
        } else {
            spieler2.push(gezogeneKarte);
            aktuellerSpieler = 1;
        }
        document.getElementById("gezogeneKarte").innerHTML = "Gezogene Karte: " + `<span class="karte"><img src="cards/${gezogeneKarte.wert}_${gezogeneKarte.farbe.toLowerCase()}.png" alt="${gezogeneKarte.wert} ${gezogeneKarte.farbe}"></span>`;
        ablageStapel.push(gezogeneKarte);

        if (stapelNummer === 1 && stapel1.length === 0) {
            document.getElementById("stapel1").style.display = "none";
            document.getElementById("stapel2").style.display = "inline-block";
            document.getElementById("stapel3").style.display = "inline-block";
            document.getElementById("stapel4").style.display = "inline-block";
        }
    } else {
        document.getElementById("gezogeneKarte").textContent = "Stapel leer.";
    }
    kartenAnzeigen();
}

// Buttons zum Ziehen von Karten
document.getElementById("stapel1").addEventListener("click", () => karteZiehen(1));
document.getElementById("stapel2").addEventListener("click", () => karteZiehen(2));
document.getElementById("stapel3").addEventListener("click", () => karteZiehen(3));
document.getElementById("stapel4").addEventListener("click", () => karteZiehen(4));

// Würfel-Funktionalität
function wuerfeln(wuerfelId) {
    const wuerfelWert = Math.floor(Math.random() * 6) + 1;
    const wuerfel = document.getElementById(wuerfelId);
    wuerfel.style.transition = "transform 0.5s ease-in-out";

    let rotateX = 0;
    let rotateY = 0;
    switch (wuerfelWert) {
        case 1:
            break;
        case 2:
            rotateX = -90;
            break;
        case 3:
            rotateY = 90;
            break;
        case 4:
            rotateY = -90;
            break;
        case 5:
            rotateX = 90;
            break;
        case 6:
            rotateY = 180;
            break;
    }

    wuerfel.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Würfelbilder für alle Seiten aktualisieren
    for (let i = 1; i <= 6; i++) {
        const wuerfelSeite = wuerfel.querySelector(`.wuerfel-seite-${i}`);
        wuerfelSeite.style.backgroundImage = `url('dice/Wuerfel${i}.png')`;
    }

    // Sound abspielen
    const wuerfelSound = document.getElementById("wuerfelSound");
    wuerfelSound.currentTime = 0;
    wuerfelSound.play();
}

document.getElementById("wuerfel1").addEventListener("click", () => wuerfeln("wuerfel1"));
document.getElementById("wuerfel2").addEventListener("click", () => wuerfeln("wuerfel2"));

// Würfel beim Laden der Seite würfeln
wuerfeln("wuerfel1");
wuerfeln("wuerfel2");