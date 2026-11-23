import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskService, TaskStatus } from './task.service';

@Component({ selector: 'app-root', imports: [FormsModule], templateUrl: './app.html', styleUrl: './app.css' })
export class App {
  readonly service = inject(TaskService);
  readonly editingId = signal<string | null>(null);
  title = '';
  description = '';
  status: TaskStatus = 'pendente';

  save(): void {
    const title = this.title.trim();
    if (!title) return;
    const task = { title, description: this.description.trim(), status: this.status };
    const id = this.editingId();
    const sent = id ? this.service.update({ id, ...task }) : this.service.create(task);
    if (sent) this.cancel();
  }

  edit(task: Task): void {
    this.editingId.set(task.id);
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
  }

  cancel(): void { this.editingId.set(null); this.title = ''; this.description = ''; this.status = 'pendente'; }

  remove(task: Task): void {
    if (confirm(`Excluir a tarefa "${task.title}"?`)) {
      if (this.service.delete(task.id) && this.editingId() === task.id) this.cancel();
    }
  }

  statusLabel(status: TaskStatus): string {
    return { pendente: 'Pendente', em_andamento: 'Em andamento', concluida: 'Concluída' }[status];
  }
}
