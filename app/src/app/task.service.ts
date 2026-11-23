import { Injectable, OnDestroy, signal } from '@angular/core';

export type TaskStatus = 'pendente' | 'em_andamento' | 'concluida';
export interface Task { id: string; title: string; description: string; status: TaskStatus; }
type Message = { type: 'tasks'; tasks: Task[] } | { type: 'task_created' | 'task_updated'; task: Task } | { type: 'task_deleted'; id: string } | { type: 'error'; message: string };

@Injectable({ providedIn: 'root' })
export class TaskService implements OnDestroy {
  readonly tasks = signal<Task[]>([]);
  readonly connection = signal<'connecting' | 'connected' | 'disconnected'>('connecting');
  readonly error = signal('');
  private socket?: WebSocket;
  private retry?: ReturnType<typeof setTimeout>;
  private closed = false;

  constructor() { this.connect(); }

  private connect(): void {
    if (this.closed) return;
    this.connection.set('connecting');
    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const socket = new WebSocket(`${protocol}//${location.hostname}:3000`);
    this.socket = socket;
    socket.onopen = () => { this.connection.set('connected'); this.error.set(''); this.send({ type: 'get_tasks' }); };
    socket.onmessage = event => {
      try { this.receive(JSON.parse(event.data) as Message); }
      catch { this.error.set('Mensagem inválida recebida do servidor.'); }
    };
    socket.onerror = () => this.error.set('Não foi possível comunicar com o servidor.');
    socket.onclose = () => {
      if (this.closed) return;
      this.connection.set('disconnected');
      this.retry = setTimeout(() => this.connect(), 3000);
    };
  }

  private receive(message: Message): void {
    switch (message.type) {
      case 'tasks': if (Array.isArray(message.tasks)) this.tasks.set(message.tasks); break;
      case 'task_created': case 'task_updated':
        if (message.task?.id) this.tasks.update(tasks => [...tasks.filter(task => task.id !== message.task.id), message.task]);
        break;
      case 'task_deleted': this.tasks.update(tasks => tasks.filter(task => task.id !== message.id)); break;
      case 'error': this.error.set(message.message || 'O servidor retornou um erro.');
    }
  }

  private send(message: object): boolean {
    if (this.socket?.readyState !== WebSocket.OPEN) {
      this.error.set('Sem conexão com o servidor. Tente novamente quando reconectar.');
      return false;
    }
    this.socket.send(JSON.stringify(message));
    this.error.set('');
    return true;
  }

  create(task: Omit<Task, 'id'>): boolean { return this.send({ type: 'create_task', task }); }
  update(task: Task): boolean { return this.send({ type: 'update_task', task }); }
  delete(id: string): boolean { return this.send({ type: 'delete_task', id }); }
  ngOnDestroy(): void { this.closed = true; clearTimeout(this.retry); this.socket?.close(); }
}
