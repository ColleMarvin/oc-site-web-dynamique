import { ajoutListenerAvis, ajoutListenerEnvoyerAvis, afficherGraphiqueAvis, afficherGraphiqueNbCommentPiecesDispo } from "./avis.js";

// Récupération des articles et affichages dans le DOM
let pieces = window.localStorage.getItem("pieces");
if (pieces === null) {
    pieces = await fetch("http://localhost:8081/pieces").then(pieces => pieces.json());
    const valeurPieces = JSON.stringify(pieces);
    window.localStorage.setItem("pieces", valeurPieces);
} else {
    pieces = JSON.parse(pieces);
}
let piecesCopy = Array.from(pieces);

afficherArticles();
ajoutListenerEnvoyerAvis();
afficherGraphiqueAvis();
afficherGraphiqueNbCommentPiecesDispo();

// // Garde que les noms des pièces
// const nomPieces = pieces.map(element => element.nom);
// for (let i = pieces.length - 1; i >= 0; i--) {
//     if (pieces[i].prix > 35) {
//         nomPieces.splice(i,1);
//     }
// }

// console.log(nomPieces);


// Gérer l'input de type range
const inputPrixMax = document.querySelector("#prixMax");
const outputPrixMax = document.querySelector("#prixMaxOutput");

inputPrixMax.addEventListener("input", (event) => {
    outputPrixMax.textContent = event.target.value;
});


// Fonction de tri

// Tri prix croissant
const boutonTrierCroissant = document.querySelector('.btn-trier-croissant');
boutonTrierCroissant.addEventListener('click', () => {
    piecesCopy.sort((a, b) => {
        return a.prix - b.prix;
    });
    afficherArticles();
});

// Tri prix décroissant
const boutonTrierDecroissant = document.querySelector('.btn-trier-decroissant');
boutonTrierDecroissant.addEventListener('click', () => {
    piecesCopy.sort((a, b) => {
        return b.prix - a.prix;
    });
    afficherArticles();
});


// Fonction de filtre

// Filtrer par prix max
const boutonFiltrerPrixMax = document.querySelector('.btn-filtrer-prix-max');
boutonFiltrerPrixMax.addEventListener('click', () => {
    piecesCopy = piecesCopy.filter(piece => {
        const valueMax = document.querySelector("#prixMax").value;
        return piece.prix <= valueMax;
    });
    afficherArticles();
});

// Filtrer pièces disponibles
const boutonFiltrerDisponible = document.querySelector('.btn-filtrer-disponible');
boutonFiltrerDisponible.addEventListener('click', () => {
    piecesCopy = piecesCopy.filter(piece => piece.disponibilite);
    afficherArticles();
});

// Fonction de remise à zéro des filtres
const boutonResetFiltres = document.querySelector('.btn-reset-filtres');
boutonResetFiltres.addEventListener('click', () => {
    piecesCopy = pieces;
    afficherArticles();
});


// Fonction de maj de pièces
const boutonMettreAJour = document.querySelector('.btn-maj');
boutonMettreAJour.addEventListener('click', () => {
    window.localStorage.removeItem('pieces');
});


// Vider l'espace fiches et le remplir par les articles
function afficherArticles(arr = piecesCopy) {

    const fiches = document.querySelector('.fiches');
    // start with a clean slate
    fiches.innerHTML = '';

    arr.forEach(element => {
        const imageElement = document.createElement('img');
        imageElement.src = element.image;
        const nomElement = document.createElement('h2');
        nomElement.innerText = element.nom;
        const prixElement = document.createElement('p');
        prixElement.innerText = `Prix : ${element.prix} € (${element.prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement('p');
        categorieElement.innerText = element.categorie ?? "(aucune catégorie)";
        const descriptionElement = document.createElement('p');
        descriptionElement.innerText = element.description ?? "Pas de description pour le moment.";
        const stockElement = document.createElement('p');
        stockElement.innerText = element.disponibilite ? "En stock" : "Rupture de stock";
        const avisBouton = document.createElement('button');
        avisBouton.dataset.id = element.id;
        avisBouton.textContent = "Afficher les avis";

        const article = document.createElement('article');
        article.appendChild(imageElement);
        article.appendChild(nomElement);
        article.appendChild(prixElement);
        article.appendChild(categorieElement);
        article.appendChild(descriptionElement);
        article.appendChild(stockElement);
        article.appendChild(avisBouton);
        
        fiches.appendChild(article);
    });

    ajoutListenerAvis();
}