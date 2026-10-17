  import { StatusBar } from 'expo-status-bar';
  import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
  import { useState, useEffect, } from 'react';
  import * as SQLite from 'expo-sqlite'
  import { deleteTask, insertTask , updateTaskDone, getTasks, createTable, updateEditTask} from './database/tasks';
  import TaskItem from './components/TaskItem';
  import TaskFrom  from './components/TaskFrom';
 

  const initialTasks = [
    {id: '1', title: 'Create', done: false},
    {id: '2', title: 'Read', done: false},
    {id: '3', title: 'Update', done:false},
    {id: '4', title: 'Delete', done: false},

  ]
  export default function App() {
    const [tasks, setTasks] = useState([]);
    const [database, setDatabase] = useState(null);
    useEffect(() =>{
      async function setupDatabase(){
        try{
          const db = await SQLite.openDatabaseAsync('yourha.db')
          setDatabase(db)
          await createTable(db)
           
            const rows = await getTasks(db)
            setTasks(rows.map(row => ({id: row.id, title: row.title, done: row.done === 1})))
            
            console.log('Table tasks siap ', rows );
        } catch(error){
          console.error('Gagal menyiapkan database: ', error)
        }
      } 
      setupDatabase();
    }, [])

    async function toggleTask(taskId){
      const taskTarget = tasks.find((task) => task.id === taskId)

      
      if(!taskTarget){
        return
      }
      
      let  booleanTask = !taskTarget.done

      if(database == null){
        return
      }else{
       await updateTaskDone(database, booleanTask, taskTarget.id)
      }
      
      setTasks((currentTasks) =>
        currentTasks.map((task) => {
          if(task.id === taskId){
            return { ...task, done: booleanTask};
          }
          return task;
        } 
      ),
    );
    }

    const completedCount = tasks.filter((task) => task.done).length;
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [editingTask,  setEditingTask]  = useState(null);
    function startEditingTask(task){
      setEditingTask(task.id)
      setNewTaskTitle(task.title)
      setErrorMessage('')
    }

    function cancelEditing(){
      setEditingTask(null)
      setNewTaskTitle('')
      setErrorMessage('')
    }


    async function handleTaskSubmit(){
      const title = newTaskTitle.trim();
      let finaleTitle = title;
      let number = 1;

      if (database == null){
        return
      }
      if (title === ""){
        setErrorMessage("Pesan gabisa kosong rak ")
        return;
      }

      while(tasks.some((task) => task.title.trim().toLowerCase()  === finaleTitle.trim().toLowerCase() && task.id !== editingTask) ){
        finaleTitle = `${title} ( ${number} )`
        number += 1;
      }
      try {
        if(editingTask !== null){
          await updateEditTask(database, finaleTitle, editingTask);
          setTasks(currentTasks => currentTasks.map(task => task.id === editingTask ? {...task, title : finaleTitle} : task))
  
          setEditingTask(null)
          setNewTaskTitle('')
          setErrorMessage('')
          return;
        }
  
        const newTask ={
          id : String(Date.now()),
          title: finaleTitle,
          done: false
        };
        
        await insertTask(database, newTask)
  
        setErrorMessage('');
        setTasks((currentTasks) => [...currentTasks,newTask])
        setNewTaskTitle('');
          
      } catch (error) {
        setErrorMessage('Tugas gagal disimpan')
      }
      
      
    }
    async function removeTask(taskId){
      if(database == null){
        return
      }
      await deleteTask(database, taskId)
      setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId))
      
    }

    const taskIsEditing = tasks.find((task) => task.id === editingTask)
    return (
      <View style={styles.container}>
        <Text>YourHa, For the glory of Myself</Text>
        <Text>{completedCount} dari {tasks.length} tugas sudah selesai</Text>



{/* 
        <TextInput
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
          placeholder='Masukkan nama Task disini'></TextInput>

        <Pressable onPress={addTask}>
          <Text>Tambah Tugas</Text>
        </Pressable> */
        }

        {editingTask !== null && taskIsEditing && (
          <Text>Sedang mengedit {taskIsEditing.title}</Text>
         )
        }
        <TaskFrom value ={newTaskTitle} onChangeText = {setNewTaskTitle} onSubmit = {handleTaskSubmit} 
        buttonLabel = {editingTask !== null ? 'Simpan Perubahan' : 'Tambah Tugas'} isEditing = {editingTask !== null} onCancel = {cancelEditing}></TaskFrom>
        {
          errorMessage !== '' && (
            <Text>{errorMessage}</Text>
          )
        }
        {
          tasks.length === 0 && (
            <Text> Kamu belum ngelist tugas nih. . . </Text>
          )
        }
        {tasks.map((task) => (
          <View key={task.id}> 
          <TaskItem task = {task} onToggle = {() => toggleTask(task.id)} onRemove = {() => removeTask(task.id)} onEdit = {() => startEditingTask(task)} ></TaskItem>
          <Text></Text>
          </View>
        ),
          
        )}
        <StatusBar style="auto" />

      </View>

      
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFEFA',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  