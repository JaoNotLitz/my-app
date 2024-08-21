function addCard(id, title, rua, numero, bairro, cidade, pastor, telefone, link) {
    $(document).ready(function() {
        var cardHTML = `
            <div class="card card2 hoverable card-mini" id="${id}cardId">
                <div class="row no-gutters">

                    <div class="col-md-6">
                        <div class="card-body">
                            <h5 class="card-title"><strong ><img class="logo-missao img-fluid align-self-start" src="/imgs/G.png" alt=""><br>${title}</strong></h5>
                            <a target="_blank" href="https://www.google.com.br/maps/search/${encodeURIComponent(rua.replace(/ /g, '+'))}+${encodeURIComponent(numero)}+${encodeURIComponent(bairro.replace(/ /g, '+'))}+${encodeURIComponent(cidade.replace(/ /g, '+'))}">
                            <i class="fa fa-link bi bi-pin-map-fill"></i> como chegar
                        </a><br>
                            <p>${pastor}<br>${telefone}</p>
                            <strong>${cidade}</strong><br>
                            <p>${rua}, ${numero}<br>${bairro}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $(".add-element").append(cardHTML);
    });
}

$(document).ready(function() {
    $.getJSON("siteget_missoes.json", function(cards) {
        for (var i = 0; i < cards.length; i++) {
            if(cards[i].type === "table"){
                var data = cards[i].data;
                for (var j = 0; j < data.length; j++) {
                    var card = data[j];
                    addCard(
                        card.missao_id, 
                        card.missao_nome, 
                        card.missao_rua, 
                        card.missao_numero,
                        card.missao_bairro, 
                        card.missao_cidade + '-' + card.missao_uf, 
                        card.missao_pastor, 
                        card.missao_tel, 
                        card.missao_maps
                    );
                }
            }
        }
    });
});

function findCardById(id) {
    $(document).ready(function() {
        $.getJSON("siteget_missoes.json", function(cards) {
            var foundCard = cards.find(function(card) {
                return card.missao_id === id;
            });

            if (foundCard) {
                $(".add-element").empty(); // Remove all existing cards
                addCard(
                    foundCard.missao_id, 
                    foundCard.missao_nome, 
                    foundCard.missao_rua, 
                    foundCard.missao_numero,
                    foundCard.missao_bairro, 
                    foundCard.missao_cidade + '-' + foundCard.missao_uf, 
                    foundCard.missao_pastor, 
                    foundCard.missao_tel, 
                    foundCard.missao_maps
                );
            } else {
                console.log('Card not found');
            }
        });
    });
}

