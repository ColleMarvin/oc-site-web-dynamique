export function ajoutListenerAvis() {
    const piecesElements = document.querySelectorAll('.fiches article button');

    piecesElements.forEach(piece => {
        piece.addEventListener('click', async function () {
            // Si les avis n'existe pas, on les récupère et les affiche
            // Sinon, on les supprime
            let avisDiv = document.querySelector('.avis');
            if (!avisDiv) {
                const id = this.dataset.id;
                const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`);
                const avis = await reponse.json();

                avisDiv = document.createElement('div');
                avisDiv.classList.add('avis');
                avis.forEach(element => {
                    const p = document.createElement('p');
                    p.innerText = `${element.utilisateur}: ${element.commentaire}`;
                    avisDiv.appendChild(p);
                });
    
                this.parentElement.appendChild(avisDiv);
            } else {
                avisDiv.remove();
            }
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