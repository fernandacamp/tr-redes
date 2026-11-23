# Gerenciador de tarefas em tempo real com WebSocket

Projeto da disciplina de **Redes de Computadores** que demonstra a comunicação entre um cliente Angular e um servidor WebSocket sobre TCP. Tarefas criadas, editadas ou excluídas em uma janela aparecem nas demais sem recarregar a página.

## Estado atual

O repositório contém o cliente Angular. Para sincronizar tarefas, ele precisa de um servidor WebSocket compatível com o protocolo descrito em [app/PROTOCOL.md](app/PROTOCOL.md). A análise do tráfego com Wireshark faz parte do objetivo do projeto, mas suas capturas e resultados ainda não estão documentados aqui.

## Funcionalidades implementadas

- Criar tarefas com título, descrição e status (`pendente`, `em_andamento` ou `concluida`).
- Listar, editar e excluir tarefas, com confirmação antes da exclusão.
- Sincronizar as alterações entre clientes conectados por WebSocket.
- Exibir o estado da conexão, tentar reconectar automaticamente e solicitar a lista completa após a reconexão.
- Mostrar mensagens de erro recebidas do servidor ou geradas por falhas de comunicação.

## Tecnologias

- Angular 20 e TypeScript no cliente.
- Node.js e npm para instalar e executar o cliente.
- WebSocket sobre TCP para troca de mensagens em JSON.
- Wireshark para a etapa de captura e análise de rede.

## Estrutura do projeto

```text
tr-redes/
├── package.json             # Comandos para executar o projeto pela raiz
├── readme.md
└── app/
    ├── src/app/             # Interface e serviço WebSocket do cliente
    ├── PROTOCOL.md          # Formato das mensagens WebSocket
    └── package.json         # Dependências e comandos do Angular
```

## Instalação e execução

É necessário ter **Node.js e npm** instalados. Na raiz do repositório, execute:

```bash
npm install
```

O comando instala também as dependências de `app/`. Inicie o cliente:

```bash
npm start
```

Acesse `http://localhost:4200`. Para usar as tarefas e verificar a sincronização em duas janelas, mantenha um servidor WebSocket compatível em execução na porta **3000** do mesmo host da página. Para gerar a versão de produção do cliente, execute `npm run build`.

## Comunicação e análise de rede

O cliente e o servidor trocam mensagens JSON por WebSocket. O cliente solicita a lista ao conectar, envia operações de criação, edição e exclusão, e o servidor transmite as alterações a todos os clientes. Os tipos de mensagem e os campos esperados estão em [app/PROTOCOL.md](app/PROTOCOL.md).

Para observar a comunicação no Wireshark, inicie o servidor e o cliente, capture o tráfego da interface de loopback, abra duas janelas da aplicação e crie, edite e exclua tarefas. Analise o estabelecimento da conexão TCP, o handshake HTTP de atualização para WebSocket e as mensagens transmitidas. A captura da interface de loopback é necessária quando cliente e servidor rodam no mesmo computador.

## Integrantes

- Fernanda Alves Campolin dos Santos
- Victor Novoli

**Disciplina:** Redes de Computadores

**Instituição:** Universidade Tecnológica Federal do Paraná (UTFPR)

**Status:** Em desenvolvimento
