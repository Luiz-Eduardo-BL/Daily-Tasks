import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLZ9isrkt1W08mKueCPekmDkrwv95TYFE",
  authDomain: "daily-tasks-f911c.firebaseapp.com",
  projectId: "daily-tasks-f911c",
  storageBucket: "daily-tasks-f911c.appspot.com",
  messagingSenderId: "140837212555",
  appId: "1:140837212555:web:2cbd021287652e74309f8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(app);


// Função assíncrona para carregar as tasks do Firestore
export async function loadTasks() {
  try {
    const tasksCollection = collection(db, "tasks");
    const tasksSnapshot = await getDocs(tasksCollection);
    const tasksList = tasksSnapshot.docs.map((doc) => doc.data());
    return tasksList;
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

// Function to create a task in Firestore
const createTask = async (id: number, nome: string, descricao: string, complete: boolean) => {
  try {
    const tasksCollection = collection(db, "tasks");

    // Add a new task to the "tasks" collection
    await addDoc(tasksCollection, {
      id,
      nome,
      descricao,
      complete,
    });

    console.log("Task created successfully!");
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

// Function to update a task in Firestore
const updateTask = async (taskId: number) => {
  try {
    // Get a reference to the task document with the taskId
    const taskRef = doc(db, "tasks", taskId.toString());

    // Get the task document
    const taskDoc = await getDoc(taskRef);

    if (!taskDoc.exists()) {
      throw new Error(`Task with ID "${taskId}" does not exist.`);
    }
    const taskData = taskDoc.data();

    // Update the "complete" property of the task
    await updateDoc(taskRef, {
      complete: !taskData.complete,
    });

    console.log("Task updated successfully!");
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

export { createTask, updateTask };