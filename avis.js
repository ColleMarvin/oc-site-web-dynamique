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