const express = require('express'); //Importa a biblioteca Express

const app = express(); //Cria o objeto principal para configurar o servidor 

app.use(express.json()); //Puxa os dados dos jsons

//Criação do Array
let alunos = [ 
    {id: 1, nome: 'Jarilene', curso: 'Computação'},
    {id: 2, nome: 'Merosfildo', curso: 'Sistema de Informação'}
];

let proximoId = 3; //Mostrar que o proximo id é o 3

//Retorna a lista completa de alunos cadastrados.
app.get('/alunos', (req, res) => {
    res.status(200).json(alunos)
});

//Retorna os dados de um aluno específico, identificado pelo ID informado na URL.
app.get('/alunos/:id', (req, res) => {
    let aluno = alunos.find(a => a.id == req.params.id); //Procurar o elemento na lista


    //Se o aluno não existir retorna o status 404 e aparece a mensagem de que não existe
    if (!aluno) {
        return res.status(404).json({
            mensagem: 'ID não existente'
        })
    }
    
    res.status(200).json(aluno) //Se existir, ele mostra o dado do aluno
})

//Cadastrar novo Aluno
app.post('/alunos', (req, res) => {
    const{nome,curso} = req.body; //identificar qual são os dados enviados

    if (!nome || !curso){ //Se faltar alguma informação
        return res.status(400).json({ 
            mensagem: 'Informe nome e curso'
        });
    }

    const aluno = {id: proximoId++, nome, curso}; //O cadastro do novo aluno
    alunos.push(aluno); //Guarda os dados do novo Aluno 
    
    res.status(201).json(aluno); //Retorna o aluno cadastrado com o status de criação.
});


//Atualiza o nome e o curso de um aluno existente, utilizando o ID informado na URL.
app.put('/alunos/:id', (req, res) => {
    const aluno = alunos.find(a => a.id == req.params.id); //Procurar o elemnto na lista

    if (!aluno) { //Se o aluno não for encontrado
        return res.status(404).json({ 
            mensagem: 'Aluno não encontrado'
        });
    }

    const{nome,curso} = req.body; //identificar qual são os dados enviados

    if (!nome || !curso){ //Se faltar alguma informação
        return res.status(400).json({ 
            mensagem: 'Informe nome e curso'
        });
    }

    aluno.nome = nome; //Modifica o nome
    aluno.curso = curso; //Modifica o curso

    res.status(200).json(aluno) //Se existir, ele mostra o dado do aluno
})

//Remove um aluno da lista a partir do seu ID.
app.delete('/alunos/:id', (req, res) => {
    const indice = alunos.findIndex(a => a.id == req.params.id); 

     if (indice === -1) { //Para ver se o aluno existe mesmo, o -1 vai indicar que não existe
        return res.status(404).json({
            mensagem: 'Aluno não encontrado'
        });
    }

    alunos.splice(indice, 1); //Remove o elemento da lista na posição indicada  

    res.status(204).send(); //Após uma exclusão bem-sucedida.

});

//Aplicação para executar na porta 3000.
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});