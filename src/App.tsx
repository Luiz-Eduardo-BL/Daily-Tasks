import { useState, useEffect } from 'react';
import { Button } from "./components/ui/button";
import { Checkbox } from "./components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { Search, PlusCircle } from 'lucide-react';

interface Task {
  id: number;
  name: string;
  description: string;
  completed: boolean;
}

export function App() {
  // Estado para armazenar as tarefas
  const [tasks, setTasks] = useState<Task[]>([]);

  // Função para adicionar uma nova tarefa
  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  // Efeito para carregar as tarefas do localStorage ao carregar a página
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks);
  }, []);

  // Efeito para salvar as tarefas no localStorage sempre que houver uma alteração
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-center">
        Daily Tasks
      </h1>
      <h2 className="text-lg font-medium text-gray-500 text-center">
        <p>Adicione aqui as suas tarefas diárias.</p>
        Pode procurar as existentes ou adicionar uma nova tarefa com o botão abaixo.
      </h2>

      <div className="flex items-center justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="w-5 h-5 mr-3" />
              Nova Tarefa
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogTitle>Nova Tarefa</DialogTitle>
            <DialogDescription>Adicionar uma nova tarefa no sistema</DialogDescription>
            
            <form className="space-y-6">
              <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-900">
                  Nome
                </label>
                <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" id="name"/>

                <label htmlFor="desciption" className="text-sm font-medium text-gray-900">
                  Descrição
                </label>
                <textarea className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" id="desciption"/>
              </div>

              <DialogFooter>
                <DialogClose>
                  <Button type="button" variant={"outline"}>Cancelar</Button>
                </DialogClose>
                <Button type="button" onClick={() => addTask({
                  id: new Date().getTime(),
                  name: '',
                  description: '',
                  completed: false,
                })}>Salvar</Button>
                
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <form className="flex items-center gap-2">
          <input name="name" placeholder="Nome da Tarefa" className="border rounded-lg p-2"/>
          <Button type="submit" variant="secondary">
            <Search className="w-5 h-5 mr-3" />
            Filtrar resultados
          </Button>
        </form>
      </div>

      <div className="border rounded-lg p-2">
        <Table>
          <TableHeader>
            <TableHead>ID</TableHead>
            <TableHead>NOME</TableHead>
            <TableHead>DESCRIÇÃO</TableHead>
            <TableHead>CHECBOX</TableHead>
          </TableHeader>
          <TableBody>
            {/* Mapear as tarefas do estado */}
            {tasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{index}</TableCell>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell><Checkbox /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

