# Protocolo WebSocket do cliente

O cliente conecta em `ws://<host-da-página>:3000` (ou `wss://` se a página usar HTTPS). Todas as mensagens são JSON.

Cliente → servidor:
- `{"type":"get_tasks"}`
- `{"type":"create_task","task":{"title":"...","description":"...","status":"pendente"}}`
- `{"type":"update_task","task":{"id":"...","title":"...","description":"...","status":"em_andamento"}}`
- `{"type":"delete_task","id":"..."}`

Servidor → todos os clientes:
- `{"type":"tasks","tasks":[{"id":"...","title":"...","description":"...","status":"pendente"}]}`
- `{"type":"task_created","task":{...}}`
- `{"type":"task_updated","task":{...}}`
- `{"type":"task_deleted","id":"..."}`
- `{"type":"error","message":"..."}`

Status aceitos: `pendente`, `em_andamento`, `concluida`. O servidor deve atribuir IDs, guardar o estado, responder a `get_tasks` com a lista completa e transmitir cada mudança a todos os clientes, inclusive ao remetente. Após reconexão, o cliente solicita a lista novamente.
