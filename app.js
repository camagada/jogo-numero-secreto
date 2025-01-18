let listaDeNumerosSorteados = [];
let limiteTentativas = 50;
let numeroSecreto = gerarNumeroAleatorio();
let numeroTentativas = 1;


function exibirTextoTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto; 
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
exibirMensagemInicial();

console.log(numeroSecreto);

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function gerarNumeroAleatorio(){
    let numeroEscolhido =  parseInt(Math.random() * limiteTentativas + 1);
    let qtdElementosLista = listaDeNumerosSorteados.length;

    if(qtdElementosLista == 10){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
 }

function exibirMensagemInicial(){
    exibirTextoTela('h1','Jogo do número secreto!');
    exibirTextoTela('p','Escolha um número entre 1 e ' + limiteTentativas);    
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    numeroTentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
        let palabraTentativa = numeroTentativas > 1 ? 'tentativas':'tentativa';

        exibirTextoTela('h1','Você acertou!');
        exibirTextoTela('p',`Você descobriu o número secreto com ${numeroTentativas} ${palabraTentativa}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute > numeroSecreto){
            exibirTextoTela('p','O número secreto é menor');  
        }else{
            exibirTextoTela('p','O número secreto é maior');    
        }
        limparCampo();
        numeroTentativas++;    
    }
}
