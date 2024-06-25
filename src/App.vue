<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Task Manager</h1>
    <form @submit.prevent="addTask" class="task-form">
      <input v-model="newTask.title" placeholder="Task title" required>
      <textarea v-model="newTask.description" placeholder="Task description" required></textarea>
      <button type="submit">Add Task</button>
    </form>
    <ul class="task-list">
      <li v-for="task in tasks" :key="task._id" :class="{ completed: task.completed }">
        <input type="checkbox" v-model="task.completed" @change="updateTask(task)">
        <span>
          <strong>{{ task.title }}</strong> - {{ task.description }}
        </span>
        <button @click="deleteTask(task._id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const tasks = ref([]);
const newTask = ref({ title: '', description: '', completed: false });

const fetchTasks = async () => {
  const response = await axios.get('/api/tasks');
  tasks.value = response.data;
};

const addTask = async () => {
  const response = await axios.post('/api/tasks', newTask.value);
  tasks.value.push(response.data);
  newTask.value = { title: '', description: '', completed: false };
};

const updateTask = async (task) => {
  await axios.put(`/api/tasks/${task._id}`, task);
};

const deleteTask = async (id) => {
  await axios.delete(`/api/tasks/${id}`);
  tasks.value = tasks.value.filter(task => task._id !== id);
};

onMounted(fetchTasks);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.task-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.task-form input,
.task-form textarea {
  width: 80%;
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
}

.task-form button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.task-list {
  list-style-type: none;
  padding: 0;
}

.task-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.task-list li.completed span {
  text-decoration: line-through;
  color: #999;
}

.task-list li button {
  padding: 5px 10px;
  cursor: pointer;
}
</style>
