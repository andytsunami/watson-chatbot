var conversationV1 = require('watson-developer-cloud/conversation/v1');
var prompt = require('prompt-sync')();

var conversation = new conversationV1({
    username: '884a116f-4791-4c01-96ec-011296b974ae',
    password: 'R7UGTDZF5IsL',
    path: {workspace_id: '8bfbc57c-4133-41f1-ba79-73f88398f785'},
    version_date: '2018-07-10'
});

//MSG vazia
conversation.message({
    workspace_id: '8bfbc57c-4133-41f1-ba79-73f88398f785',
    //input: {'text':'Qual o prazo de entrega para São Paulo?'}
}, processarResposta);


function processarResposta (erro, response){
    var encerrarConversa = false;

    if(erro){
        console.log(erro);
    } else if(response.output.acao === 'Encerrar'){
        console.log(response.output.text[0]);
        encerrarConversa = true;

    } else if(response.output.text.length != 0) {
        console.log(response.output.text[0]);
    }   

    if(!encerrarConversa){
        var novaMensagemDoUsuario = prompt('>> ');
        conversation.message({
            workspace_id: '8bfbc57c-4133-41f1-ba79-73f88398f785',
            input: {'text':novaMensagemDoUsuario},
            context: response.context
        }, processarResposta);
    }
    
};