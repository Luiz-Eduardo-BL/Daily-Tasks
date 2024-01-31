import { useState, useEffect } from 'react';
import { Button } from "./components/ui/button";
import { Checkbox } from "./components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { PlusCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { createTask, updateTask, loadTasks } from './functions/Task';

interface Task {
  id: number;
  name: string;
  description: string;
  completed: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationError, setValidationError] = useState('');

  const addTask = async () => {
    if (!newTaskName || !newTaskDescription) {
      setValidationError('Nome e descrição são obrigatórios');
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      name: newTaskName,
      description: newTaskDescription,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setShowModal(false);
    setNewTaskName('');
    setNewTaskDescription('');
    setSuccessMessage('Tarefa adicionada com sucesso!');
    setValidationError('');
    await createTask(newTask.id, newTask.name, newTask.description, newTask.completed);
  };

  const handleCheckboxChange = async (taskId: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.completed = !task.completed;
        updateTask(task.id);
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  useEffect(() => {
    loadTasks().then((tasks) => {
    });
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <Button onClick={() => setShowModal(true)}>
              <PlusCircle className="w-5 h-5 mr-3" />
              Nova Tarefa
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogTitle>Nova Tarefa</DialogTitle>
            <DialogDescription>Adicionar uma nova tarefa no sistema</DialogDescription>
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); addTask(); }}>
              <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-900">
                  Nome
                </label>
                <input
                  type="text"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  id="name"
                />

                <label htmlFor="description" className="text-sm font-medium text-gray-900">
                  Descrição
                </label>
                <textarea
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  id="description"
                />
              </div>

              {validationError && (
                <p className="text-red-500">{validationError}</p>
              )}

              <DialogFooter>
                <DialogClose>
                  <Button type="button" variant={"outline"} onClick={() => setShowModal(false)}>
                    Cancelar
                  </Button>
                </DialogClose>
                <DialogClose>
                  <Button type="submit" disabled={!!validationError}>Salvar</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <form className="flex items-center gap-2" onSubmit={(e) => { e.preventDefault(); }}>
          <input
            name="name"
            placeholder="Nome da Tarefa"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg p-2"
          />
        </form>
      </div>

      {successMessage && (
        <div className="flex items-center bg-green-200 p-4 rounded-md">
          <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
          <span className="text-green-800">{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center bg-red-200 p-4 rounded-md">
          <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
          <span className="text-red-800">{errorMessage}</span>
        </div>
      )}

      <div className="border rounded-lg p-2">
        <Table>
          <TableHeader>
            <TableHead>ID</TableHead>
            <TableHead>NOME</TableHead>
            <TableHead>DESCRIÇÃO</TableHead>
            <TableHead>CHECKBOX</TableHead>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleCheckboxChange(task.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
