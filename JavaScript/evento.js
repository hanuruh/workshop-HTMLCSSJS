function aleatorio(){
	min= Math.ceil(document.getElementById('min').value);
	max= Math.floor(document.getElementById('max').value);
	return Math.floor(Math.random()*(max-min))+ min;
}

var lista = [6,7,4,2,1,3,5];
document.getElementById('lista').innerHTML=lista;

function ordena(lista){
	lista.sort();
	document.getElementById('lista').innerHTML=lista;
}

function reversa(lista){
	lista.reverse();
	document.getElementById('lista').innerHTML=lista;
}

function darBoasVindas(){
	let curso = document.getElementById('curso').value;
	if(curso == "CC"){
		document.getElementById('bem-vindo').innerHTML="Bem vindo a CC!";
	}else if( curso == "MIERSI" ){
		document.getElementById('bem-vindo').innerHTML="Bem vindo a MIERSI!";
	}else{
		document.getElementById('bem-vindo').innerHTML="Não seja bem vindo!";
	}
		
}