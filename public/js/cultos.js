let dia;
let inicial = true;

function addCard(id, nome, dia, hora, salao, resp, tel, aovivo, status, diaRender) {
    $(document).ready(function() {
        
        if(dia == diaRender || inicial && status == "on"){
            if (dia == "terca") {
                dia = "Terça-feira"
            }
            else if (dia == "quarta") {
                dia = "Quarta-feira"
            }
            else if (dia == "quinta") {
                dia = "Quinta-feira"
            }
            else if (dia == "sexta") {
                dia = "Sexta-feira"
            }
            else if (dia == "sabado") {
                dia = "Sábado"
            }
            else if (dia == "domingo") {
                dia = "Domingo"
            }
            else if (dia == "segunda") {
                dia = "Segunda-feira"
            }
            if(aovivo == "sim"){
        var cardHTML = `
        <div class="hoverable card-cultos">
        <div class="div-logo"><img class="logo-cultos" src="imgs/G.png" alt="">
        </div>
        <div class="div-logo nome">
            <h5><a class="mt-20 text-black" href="#">${nome}</a> </h5>
            <p>com ${resp}</p>
            <div class="mt-10">
                <i class="fa fa-phone theme-color pr-2"></i> <span>${tel}</span>
            </div>

        </div>
        <div class="div-logo">
            <h5>${hora} (${dia})</h5>
            <i class="fa fa-video-camera theme-color"></i>
        </div>
        <div class="div-logo">
            <p>${salao}</p>
        </div>
        <div class="div-logo">
    <i style="font-size: 30px;" class="bi bi-camera-video-fill" data-toggle="popover" data-placement="top" title="Culto transmitido pelo YouTube" data-content="Culto transmitido pelo YouTube" data-html="true" data-delay='{"show":"100", "hide":"100"}'><small>Ao Vivo</small></i>
</div>

    </div>
        `;
}
else{
    var cardHTML = `
    <div class="hoverable card-cultos">
    <div class="div-logo"><img class="logo-cultos" src="imgs/G.png" alt="">
    </div>
    <div class="div-logo nome">
        <h5><a class="mt-20 text-black" href="#">${nome}</a> </h5>
        <p>com ${resp}</p>
        <div class="mt-10">
            <i class="fa fa-phone theme-color pr-2"></i> <span>${tel}</span>
        </div>

    </div>
    <div class="div-logo">
        <h5>${hora} (${dia})</h5>
        <i class="fa fa-video-camera theme-color"></i>
    </div>
    <div class="div-logo">
        <p>${salao}</p>
    </div>
    <div class="div-logo">
    <i style="font-size: 30px;" class="bi bi-camera-video-off"></i>
</div>
 `;


}
        $(".add-element").append(cardHTML);
        }$(".add-element .hoverable:last-child [data-toggle='popover']").popover({ trigger: 'hover' });
    });

}

function alteraDia(diaCulto){
    var selectedDay = document.querySelector('.li[onclick="alteraDia(\'' + diaCulto + '\')"]');
    
    // Remove 'selected-day' class from all items
    document.querySelectorAll('.li.selected-day').forEach(item => {
        item.classList.remove('selected-day');
    });

    if( dia == diaCulto){
        console.log("mesmo dia")
        inicial=true;
        
        $(".add-element").empty();
        dia = diaCulto+"1";

        // Add 'selected-day' class to all items
        document.querySelectorAll('.li').forEach(item => {
            item.classList.add('selected-day');
        });
    }
    else{
        dia = diaCulto;
        console.log(dia)
        inicial = false;
        $(".add-element").empty();

        // Add 'selected-day' class to clicked item
        if (selectedDay) {
            selectedDay.classList.add('selected-day');
        }
        $(".add-element").empty();
    }
    var cardsArray = []; // Inicializa um array vazio

    $(document).ready(function() {
        $.getJSON("siteget_cultos.json", function(cards) {
            for (var i = 0; i < cards.length; i++) {
                if(cards[i].type === "table"){
                    var data = cards[i].data;
                    for (var j = 0; j < data.length; j++) {
                        var card = data[j];
                        // Cria um objeto de cartão
                        var cardObj = {
                            culto_id: card.culto_id, 
                            culto_nome: card.culto_nome, 
                            culto_dia: card.culto_dia, 
                            culto_hora: card.culto_hora.slice(0,-3),
                            culto_salao: card.culto_salao, 
                            culto_resp: card.culto_resp, 
                            culto_tel: card.culto_tel, 
                            culto_aovivo: card.culto_aovivo, 
                            culto_status: card.culto_status,
                            dia: dia
                        };
                        // Adiciona o objeto de cartão ao array
                        cardsArray.push(cardObj);
                    }
                }
            }
            // Classifica o array com base na hora
            cardsArray.sort(function(a, b) {
                return new Date('1970/01/01 ' + a.culto_hora) - new Date('1970/01/01 ' + b.culto_hora);
            });

            // Agora você tem um array de cartões que você pode usar como quiser
            cardsArray.forEach(element => {
                addCard(
                    element.culto_id, 
                    element.culto_nome, 
                    element.culto_dia, 
                    element.culto_hora,
                    element.culto_salao, 
                    element.culto_resp, 
                    element.culto_tel, 
                    element.culto_aovivo, 
                    element.culto_status,
                    dia
                );
            });
        });
    });


}

$(document).ready(function() {
   alteraDia(dia);
});

document.querySelectorAll('.li').forEach(item => {
    item.addEventListener('click', event => {
        // Remove active class from all items
        document.querySelectorAll('.li').forEach(item => {
            item.classList.remove('active');
        });
        // Add active class to clicked item
        event.currentTarget.classList.add('active');
    });
});
