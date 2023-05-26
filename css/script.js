function limpa_formulário_endereco() {
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('uf').value = "";
}

function preenche_formulário_endereco(conteudo) {
    document.getElementById('rua').value = conteudo.logradouro;
    document.getElementById('bairro').value = conteudo.bairro;
    document.getElementById('cidade').value = conteudo.localidade;
    document.getElementById('uf').value = conteudo.uf;
}

function pesquisar_endereco() {
    var cep = document.getElementById('cep').value.replace(/\D/g, '');

    if (cep !== "") {
        var validacep = /^[0-9]{8}$/;

        if (validacep.test(cep)) {
            limpa_formulário_endereco();

            fetch('https://viacep.com.br/ws/' + cep + '/json/')
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    if (data.erro) {
                        alert("CEP não encontrado.");
                    } else {
                        preenche_formulário_endereco(data);
                        exibirResultado();
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alert("Ocorreu um erro ao consultar o CEP. Por favor, tente novamente mais tarde.");
                });
        } else {
            limpa_formulário_endereco();
            alert("Formato de CEP inválido. Digite apenas números.");
        }
    } else {
        limpa_formulário_endereco();
        alert("Por favor, digite um CEP válido.");
    }
}

function exibirResultado() {
    var resultadoDiv = document.getElementById('resultado');
    resultadoDiv.style.display = 'block';
}

function voltarInicio() {
    limpa_formulário_endereco();
    var resultadoDiv = document.getElementById('resultado');
    resultadoDiv.style.display = 'none';
    var buscarBtn = document.getElementById('buscar');
    buscarBtn.style.display = 'block';
}
