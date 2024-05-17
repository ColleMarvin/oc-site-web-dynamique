// Récupération des articles et affichages dans le DOM
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();
let piecesCopy = Array.from(pieces);

afficherArticles();

// Fonction de tri
const boutonTrier = document.querySelector('.btn-trier');
boutonTrier.addEventListener('click', () => {
    piecesCopy.sort((a, b) => {
        return a.prix - b.prix;
    });
    afficherArticles();
});

// Fonction de filtre
const boutonFiltrer = document.querySelector('.btn-filtrer');
boutonFiltrer.addEventListener('click', () => {
    piecesCopy = piecesCopy.filter(piece => {
        return piece.prix <= 35;
    });
    afficherArticles();
});


// Vide l'espace fiches et le rempli par les articles
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

        const article = document.createElement('article');
        article.appendChild(imageElement);
        article.appendChild(nomElement);
        article.appendChild(prixElement);
        article.appendChild(categorieElement);
        article.appendChild(descriptionElement);
        article.appendChild(stockElement);
        
        fiches.appendChild(article);
    });
}