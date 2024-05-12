const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

pieces.forEach(piece => {
        const imageElement = document.createElement('img');
        imageElement.src = piece.image;
        const nomElement = document.createElement('h2');
        nomElement.innerText = piece.nom;
        const prixElement = document.createElement('p');
        prixElement.innerText = `Prix : ${piece.prix} € (${piece.prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement('p');
        categorieElement.innerText = piece.categorie ?? "(aucune catégorie)";
        const descriptionElement = document.createElement('p');
        descriptionElement.innerText = piece.description ?? "Pas de description pour le moment.";
        const stockElement = document.createElement('p');
        stockElement.innerText = piece.disponibilite ? "En stock" : "Rupture de stock";

        const article = document.createElement('article');
        article.appendChild(imageElement);
        article.appendChild(nomElement);
        article.appendChild(prixElement);
        article.appendChild(categorieElement);
        article.appendChild(descriptionElement);
        article.appendChild(stockElement);

        const fiches = document.querySelector('.fiches');
        fiches.appendChild(article);
});