# Gerenciador de Tarefas em Tempo Real com WebSocket

Projeto desenvolvido para a disciplina de **Redes de Computadores**, com o objetivo de demonstrar a comunicação em tempo real entre clientes e servidor utilizando WebSocket sobre TCP.

## 1. Sobre o projeto

O projeto consiste em um sistema simples de gerenciamento de tarefas, desenvolvido com Angular no front-end e Node.js no back-end.

A aplicação permitirá criar, visualizar, editar e excluir tarefas. As alterações serão sincronizadas automaticamente entre todos os clientes conectados ao servidor, sem a necessidade de atualizar a página.

Além do desenvolvimento da aplicação, será utilizado o **Wireshark** para capturar e analisar os pacotes transmitidos pela rede, permitindo observar o funcionamento da comunicação WebSocket sobre TCP.

## 2. Objetivos

### Objetivo geral

Desenvolver uma aplicação cliente-servidor que utilize WebSocket para comunicação em tempo real, demonstrando o funcionamento desse protocolo e sua relação com o TCP.

### Objetivos específicos

- Desenvolver uma interface de gerenciamento de tarefas utilizando Angular.
- Implementar um servidor WebSocket utilizando Node.js.
- Permitir a criação, edição, exclusão e visualização de tarefas.
- Sincronizar automaticamente as alterações entre diferentes clientes conectados.
- Demonstrar a comunicação bidirecional entre cliente e servidor.
- Capturar e analisar o tráfego de rede utilizando Wireshark.
- Identificar os pacotes TCP e as mensagens WebSocket durante a execução da aplicação.

## 3. Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| Angular | Desenvolvimento da interface |
| TypeScript | Linguagem utilizada no front-end |
| Node.js | Execução do servidor |
| WebSocket (`ws`) | Comunicação em tempo real |
| TCP | Protocolo de transporte |
| Wireshark | Captura e análise dos pacotes |
| Git e GitHub | Versionamento e colaboração |

## 4. Funcionalidades

O sistema terá as seguintes funcionalidades:

- **Criar tarefas:** adicionar uma tarefa com título, descrição e status.
- **Visualizar tarefas:** apresentar as tarefas cadastradas.
- **Editar tarefas:** alterar as informações de uma tarefa existente.
- **Excluir tarefas:** remover tarefas cadastradas.
- **Atualização em tempo real:** sincronizar as alterações entre todos os clientes conectados.
- **Comunicação bidirecional:** permitir o envio e recebimento de mensagens entre clientes e servidor.

## 5. Arquitetura do sistema

A aplicação seguirá uma arquitetura cliente-servidor.

O front-end Angular será responsável pela interface e pela interação com o usuário. O back-end Node.js será responsável por receber, processar e distribuir as alterações das tarefas.

A comunicação será realizada utilizando WebSocket, que mantém uma conexão bidirecional entre o cliente e o servidor.

```text
          Cliente A (Angular)
                  |
                  | WebSocket
                  |
           Servidor Node.js
                  |
                  | WebSocket
                  |
          Cliente B (Angular)
```

### Exemplo de funcionamento

1. O Cliente A acessa a aplicação.
2. O Cliente B acessa a mesma aplicação em outro navegador.
3. Ambos estabelecem uma conexão WebSocket com o servidor.
4. O Cliente A cria uma tarefa.
5. O servidor recebe a mensagem e atualiza os dados.
6. O servidor envia a alteração aos clientes conectados.
7. A nova tarefa aparece automaticamente nos dois navegadores.

O mesmo processo será utilizado para edição e exclusão de tarefas.

## 6. Estrutura do projeto

```text
task-manager-websocket/
│
├── frontend/
│   └── Aplicação Angular
│
├── backend/
│   └── Servidor Node.js e WebSocket
│
├── docs/
│   ├── Relatório do projeto
│   └── Capturas e análises do Wireshark
│
├── .gitignore
└── README.md
```

## 7. Instalação e execução

*Esta seção será atualizada após a implementação inicial do projeto.*

### Pré-requisitos

- Node.js e npm
- Angular CLI
- Git
- Wireshark

### Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd task-manager-websocket
```

### Executar o back-end

```bash
cd backend
npm install
npm start
```

### Executar o front-end

Em outro terminal:

```bash
cd frontend
npm install
ng serve
```

Após iniciar a aplicação, acessar:

```text
http://localhost:4200
```

Os comandos de execução poderão ser ajustados conforme a configuração final do projeto.

## 8. Análise de rede com Wireshark

Uma das principais etapas do projeto será analisar a comunicação entre os clientes e o servidor.

Serão realizados testes para observar:

1. O estabelecimento da conexão TCP.
2. O handshake HTTP utilizado para iniciar a conexão WebSocket.
3. A troca de mensagens WebSocket.
4. A transmissão de alterações realizadas nas tarefas.
5. O encerramento da conexão.

### Procedimento de teste

1. Iniciar o servidor WebSocket.
2. Abrir a aplicação em dois navegadores.
3. Iniciar a captura de pacotes no Wireshark.
4. Criar, editar e excluir tarefas.
5. Observar as mensagens transmitidas entre os clientes e o servidor.
6. Analisar os pacotes capturados e documentar os resultados.

**Observação:** caso a comunicação ocorra apenas em `localhost`, será necessário capturar o tráfego na interface de loopback. Para demonstrar a comunicação entre dispositivos, os clientes também poderão ser executados em máquinas diferentes na mesma rede.

## 9. Resultados esperados

Ao final do desenvolvimento, espera-se obter uma aplicação funcional capaz de sincronizar tarefas em tempo real entre diferentes clientes.

Também se espera demonstrar, por meio das capturas realizadas no Wireshark, como o WebSocket utiliza o TCP para estabelecer uma comunicação persistente e bidirecional.

O projeto permitirá relacionar os conceitos estudados na disciplina de Redes de Computadores com uma aplicação prática.

## 10. Integrantes

- Fernanda ALves Campolin dos Santos
- Victor Novoli

**Disciplina:** Redes de Computadores

**Instituição:** Universidade Tecnológica Federal do Paraná (UTFPR)

**Status:** Em desenvolvimento