function afficherAvis(avis, parent) {
    let avisDiv = document.createElement('div');
    avisDiv.classList.add('avis' + avis[0].pieceId);
    avis.forEach(element => {
        const p = document.createElement('p');
        p.innerText = `${element.utilisateur}: ${element.commentaire}`;
        avisDiv.appendChild(p);
    });

    parent.appendChild(avisDiv);
}

export function ajoutListenerAvis() {
    const piecesElements = document.querySelectorAll('.fiches article button');

    piecesElements.forEach(piece => {
        let avis = window.localStorage.getItem("avis-" + piece.dataset.id);

        if (avis) {
            avis = JSON.parse(avis);
            afficherAvis(avis, piece.parentElement);
        }

        piece.addEventListener('click', async function () {
            // Récupération avis pour la pièce
            if (!avis) {
                const id = this.dataset.id;
                const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`);
                avis = await reponse.json();

                // Stockage avis dans le localStorage
                const valeurAvis = JSON.stringify(avis);
                window.localStorage.setItem("avis-" + id, valeurAvis);
            }

            // Si la div avis n'existe pas, on la créée et l'affiche
            // Sinon, on la supprime
            let avisDiv = document.querySelector('.avis' + piece.dataset.id);
            if (!avisDiv)
                afficherAvis(avis, piece.parentElement);
            else
                avisDiv.remove();
        });
    });
}

export function ajoutListenerEnvoyerAvis() {
    const formAvis = document.querySelector('.formulaire-avis');
    formAvis.addEventListener('submit', event => {
        event.preventDefault();

        const target = event.target;
        const avis = {
            pieceId: parseInt(target.querySelector('[name=piece-id]').value),
            utilisateur: target.querySelector('[name=utilisateur]').value,
            commentaire: target.querySelector('[name=commentaire]').value,
        };
        const chargeUtile = JSON.stringify(avis);

        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        });
    });
}


// Calcul du nombre d'étoiles global
const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json());
const nb_commentaires = [0, 0, 0, 0, 0];
avis.forEach(element => nb_commentaires[element.nbEtoiles - 1]++);

// Affiche le graphique pour le nombre d'étoiles global
export function afficherGraphiqueAvis() {
    const labels = ['5', '4', '3', '2', '1'];

    const data = {
        labels: labels,
        datasets: [{
            label: "Etoiles attibuées",
            data: nb_commentaires.reverse(),
            backgroundColor: "rgba(255, 230, 0, 1)",
        }],
    };

    const config = {
        type: "bar",
        data: data,
        options: {
            indexAxis: "y",
        },
    };

    const graphiqueAvis = new Chart(
        document.getElementById('graphique-avis'),
        config
    );
}

// Récupère les données de pièces
let pieces = window.localStorage.getItem("pieces");
if (pieces) {
    pieces = JSON.parse(pieces);
} else {
    pieces = await fetch('http://localhost:8081/pieces').then(pieces => pieces.json());
    window.localStorage.setItem('pieces', JSON.stringify(pieces));
}

// Calcul le nombre de commentaire sur les pièces disponibles et non disponibles
const nbCommentPieceDispo = [0, 0];
avis.forEach(element => {
    if (element.commentaire) {
        (pieces[element.pieceId - 1].disponibilite) ?
            nbCommentPieceDispo[1]++ :
            nbCommentPieceDispo[0]++;
    }
});

// Affiche le graphique pour les pièces disponibles vs les pièces non disponibles
export function afficherGraphiqueNbCommentPiecesDispo() {
    const labels = ['Pièces disponibles', 'Pièces non disponibles'];

    const data = {
        labels: labels,
        datasets: [{
            label: "Nb commentaires",
            data: nbCommentPieceDispo.reverse(),
            backgroundColor: "#666A",
            barPercentage: 0.5,
        }],
    };

    const config = {
        type: "bar",
        data: data,
    };

    const graphiqueNbCommentPiecesDispo = new Chart(
        document.getElementById('graphique-nbCommentDispo'),
        config
    );
}