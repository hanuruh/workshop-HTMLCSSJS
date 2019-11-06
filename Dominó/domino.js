//Inicialização das variáveis globais
//pecas: conjunto de peças do jogo
//pecasUserA,pecasUserB lista de peças dos jogadores
//monte lista de peças do monte
//tabuleiro lista de peças do tabuleiro
var pecas = [[0,0],
			 [0,1],
			 [0,2],
			 [0,3],
			 [0,4],
			 [0,5],
			 [0,6],
			 [1,1],
			 [1,2],
			 [1,3],
			 [1,4],
			 [1,5],
			 [1,6],
			 [2,2],
			 [2,3],
			 [2,4],
			 [2,5],
			 [2,6],
			 [3,3],
			 [3,4],
			 [3,5],
			 [3,6],
			 [4,4],
			 [4,5],
			 [4,6],
			 [5,5],
			 [5,6],
			 [6,6],
			];

var pecasUserA=[];
var pecasUserB=[];
var monte=[];
var tabuleiro=[];

//ver qual jogador tem a peça maior
function verMaior(arr1, arr2) {
    var max = arr1[0][0] + arr1[0][1];
    for (var i = 1; i < arr1.length; i++) {
        if (arr1[i][0] + arr1[i][1] > max)
            max = arr1[i][0] + arr1[i][1];
    }

    for (var i = 0; i < arr2.length; i++) {
        if (arr2[i][0] + arr2[i][1] > max)
            return 2;
    }

    return 1;
}

//distribuir os elementos da lista pecas para a lista de peças de cada jogador
function darPecas(){
	let pecaAleatoria;
	for(let i=0;i<7;i++){
		pecaAleatoria=pecas[Math.floor(Math.random()*pecas.length)];
		pecasUserA.push(pecaAleatoria);
		//remover elemento usando splice
		for(let j=0;j<pecas.length;j++){
			if(pecas[j]===pecaAleatoria){
				pecas.splice(j,1);
			}
		}
	}
	
	for(let i=0;i<7;i++){
		pecaAleatoria=pecas[Math.floor(Math.random()*pecas.length)];
		pecasUserB.push(pecaAleatoria);
		//remover elemento usando splice
		for(let j=0;j<pecas.length;j++){
			if(pecas[j]===pecaAleatoria){
				pecas.splice(j,1);
			}
		}
	}
	
	monte=pecas;
}

//display das peças no ecrã
function imprimirPecas(){
	$(document).ready(function(){
		let i = 1;
		pecasUserA.forEach(function(peca){
			let number = 127075 + peca[0]*7 + peca[1];
			let id = "#peca-" + i.toString() + "A";
			$(id).text(String.fromCodePoint(number));
			$(id).show();
			i++;		
		});
		
		i = 1;
		pecasUserB.forEach(function(peca){
			let number = 127075 + peca[0]*7 + peca[1];
			let id = "#peca-" + i.toString() + "B";
			$(id).text(String.fromCodePoint(number));
			$(id).show();
			i++;		
		});
	});
}

//diz se a peça é valida
function valida(peca){
	if(tabuleiro.length==0)
		return 1;
	else if(peca[1]==tabuleiro[0][0] || peca[0]==tabuleiro[0][0] || peca[0]==tabuleiro[tabuleiro.length-1][1] || peca[1]==tabuleiro[tabuleiro.length-1][1])
		return 1;
	return 0;
}

//esconder peça que o jogador jogou
function removeElement(pecaString){
	$(pecaString).hide();
}

//display das peças do tabuleiro
function imprimirTabuleiro(){
	let tabuleiroString='';
	let number;
	for(var peca of tabuleiro){
		if(peca[0]!=peca[1]){
			number = 127025 + peca[0]*7 + peca[1];
			tabuleiroString += String.fromCodePoint(number);
		}else{
			number = 127075 + peca[0]*7 + peca[1];
			tabuleiroString += String.fromCodePoint(number);
		}
	}
	$('#linha-jogo').text(tabuleiroString);
	$('#linha-jogo').show();
}

//adicionar peça que o jogador escolheu ao tabuleiro
//o elemento da lista de peças do jogador que foi jogado vai ser [9,9]
function porPeca(user,numPeca){
	if(user==='A'){
		let peca=pecasUserA[numPeca];
		if(valida(peca)==1){
			let pecaString = "#peca-" + (numPeca+1).toString() + 'A';
			if(tabuleiro.length==0){
				tabuleiro.push(peca);
			}else{
				if(peca[1]==tabuleiro[0][0])
					tabuleiro.unshift(peca);
				else if(peca[0]==tabuleiro[0][0])
					tabuleiro.unshift(peca.reverse());
				else if(peca[0]==tabuleiro[tabuleiro.length-1][1])
					tabuleiro.push(peca);
				else if(peca[1]==tabuleiro[tabuleiro.length-1][1])
					tabuleiro.push(peca.reverse());
			}
			
			removeElement(pecaString);
			pecasUserA[numPeca]=[9,9];
			imprimirTabuleiro();
			if(checkSeGanhou(pecasUserA)==1){
				$('#mensagem').text('Jogador A ganhou! Recomeçar?');
				$('#mensagem').click(function(){ recomecar(); });
				
			}else{
				$(document).ready(function(){
					$('#mensagem').text('Vez do Jogador B');
				});
			}
		}else{
			$(document).ready(function(){
				$('#mensagem').text('Peça Inválida!');
			});
		}
	}else if(user==='B'){
		let peca=pecasUserB[numPeca];
		if(valida(peca)==1){
			let pecaString = "#peca-" + (numPeca+1).toString() + 'B';
			if(tabuleiro.length==0){
				tabuleiro.push(peca);
			}else{
				if(peca[1]==tabuleiro[0][0])
					tabuleiro.unshift(peca);
				else if(peca[0]==tabuleiro[0][0])
					tabuleiro.unshift(peca.reverse());
				else if(peca[0]==tabuleiro[tabuleiro.length-1][1])
					tabuleiro.push(peca);
				else if(peca[1]==tabuleiro[tabuleiro.length-1][1])
					tabuleiro.push(peca.reverse());
			}
			
			removeElement(pecaString);
			pecasUserB[numPeca]=[9,9];
			imprimirTabuleiro();
			if(checkSeGanhou(pecasUserB)==1){
				$('#mensagem').text('Jogador B ganhou! Recomeçar?');
				$('#mensagem').click(function(){ recomecar(); });				
			}else{
				$(document).ready(function(){
					$('#mensagem').text('Vez do Jogador A');
				});
			}
		}else{
			$(document).ready(function(){
				$('#mensagem').text('Peça Inválida!');
			});
		}
	}
}

//indicar quem tem a peça maior
function verPrimeiro(){
	let maior = verMaior(pecasUserA,pecasUserB);
	if(maior == 1 ){
		$(document).ready(function(){
			$('#mensagem').text('Vez do Jogador A');
		});
	}else{
		$(document).ready(function(){
			$('#mensagem').text('Vez do Jogador B');
		});
	}
}

//ver se o jogador pode jogar
function algumaValida(pecasUserX) {
    for (let i = 0; i < 7; i++) {
        if (valida(pecasUserX[i]))
            return 1;
    }
    return 0;
}

//ver se o jogador tem 7 peças
function estaCheio(pecasUserX) {
    var counter = 0;
    for (var i = 0; i < 7; i++) {
        if (pecasUserX[i][0] != 9)
            counter++;
    }
    if (counter == 7)
        return 1;
    else
        return 0;
}

//display das peças do monte no ecrã
function printMonte(){
	var stringMonte = '';
	for(let i = 0; i<monte.length; i++){
		stringMonte += String.fromCodePoint(127075);
	}
	$(document).ready(function(){
		$('#monte').text(stringMonte);
	});
	
}

//adicionar peças do monte às peças do jogador
function irAoMonte(user){
	var pecaAleatoria = monte[Math.floor(Math.random()*monte.length)];
	if(user=='A'){
		if(estaCheio(pecasUserA) == 1 || algumaValida(pecasUserA) == 1 ){
			$('#mensagem').text('Não podes tirar mais peças');
		}else if(monte.length != 0){
			for(let i = 0; i<7 ; i++){
				if(pecasUserA[i][0] == 9){
					pecasUserA[i] = pecaAleatoria;

					//remover peça do monte
					for (var j = 0; j < monte.length; j++) {
						if (monte[j] === pecaAleatoria) {
							monte.splice(j, 1);
						}
					}
				
					printMonte();
					let novaPecaString = "#peca-" + (i+1).toString() + user;
					
					$(novaPecaString).text(String.fromCodePoint(127075 + pecaAleatoria[0]*7 + pecaAleatoria[1]));
					$(novaPecaString).show();
					break;
				}
			}
		}
	}else if(user=='B'){
		if(estaCheio(pecasUserB) == 1 || algumaValida(pecasUserB) == 1 ){
			$('#mensagem').text('Não podes tirar mais peças');
		}else if(monte.length != 0){
			for(let i = 0; i<7 ; i++){
				if(pecasUserB[i][0] == 9){
					pecasUserB[i] = pecaAleatoria;

					//remover peça do monte
					for (var j = 0; j < monte.length; j++) {
						if (monte[j] === pecaAleatoria) {
							monte.splice(j, 1);
						}
					}
				
					printMonte();
					let novaPecaString = "#peca-" + (i+1).toString() + user;
					
					$(novaPecaString).text(String.fromCodePoint(127075 + pecaAleatoria[0]*7 + pecaAleatoria[1]));
					$(novaPecaString).show();
					break;
				}
			}
		}
	}
	
}

//verificar se o jogador ganhou
function checkSeGanhou(pecasUserX){
	let contador = 0;
	for(let i = 0; i<7; i++){
		if(pecasUserX[i][0] == 9)
			contador++;
	}
	
	if(contador==7)
		return 1;
	
	return 0;	
}

//recomeçar o jogo
function recomecar(){
	pecas = [[0,0],
			 [0,1],
			 [0,2],
			 [0,3],
			 [0,4],
			 [0,5],
			 [0,6],
			 [1,1],
			 [1,2],
			 [1,3],
			 [1,4],
			 [1,5],
			 [1,6],
			 [2,2],
			 [2,3],
			 [2,4],
			 [2,5],
			 [2,6],
			 [3,3],
			 [3,4],
			 [3,5],
			 [3,6],
			 [4,4],
			 [4,5],
			 [4,6],
			 [5,5],
			 [5,6],
			 [6,6],
			];
	pecasUserA=[];
	pecasUserB=[];
	monte=[];
	tabuleiro=[];
	
	darPecas();
	imprimirPecas();
	verPrimeiro();
	printMonte();
	$('#linha-jogo').hide();
	
}

darPecas();
imprimirPecas();
verPrimeiro();
printMonte();








