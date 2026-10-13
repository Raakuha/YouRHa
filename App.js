  import { StatusBar } from 'expo-status-bar';
  import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
  import { useState, useEffect, } from 'react';
  import * as SQLite from 'expo-sqlite'
  import { deleteTask, insertTask , updateTaskDone, getTasks, createTable} from './database/tasks';
  const initialTasks = [
    {id: '1', title: 'Create', done: false},
    {id: '2', title: 'Read', done: false},
    {id: '3', title: 'Update', done:false},
    {id: '4', title: 'Delete', done: false},

  ]
  export default function App() {
    const [tasks, setTasks] = useState(initialTasks);
    const [database, setDatabase] = useState(null);
    useEffect(() =>{
      async function setupDatabase(){
        try{
          const db = await SQLite.openDatabaseAsync('yourha.db')
          setDatabase( db)
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
    async function addTask(){
      const title = newTaskTitle.trim();
      if (database == null){
        return
      }
      if (title === ""){
        return;
      }
    
      const newTask ={
        id : String(Date.now()),
        title: title,
        done: false
      };
      
      await insertTask(database, newTask)
      setTasks((currentTasks) => [
        ...currentTasks,
        newTask,
        
      ])
      setNewTaskTitle('');
        
      
    }
    async function removeTask(taskId){
      if(database == null){
        return
      }
      await deleteTask(database, taskId)
      setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId))
      
    }
    return (
      <View style={styles.container}>
        <Text>YourHa, Harmony in your path</Text>
        <Text>{completedCount} dari {tasks.length} tugas sudah selesai</Text>

        <TextInput
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
          placeholder='Masukkan nama Task disini'></TextInput>

        <Pressable onPress={addTask}>
          <Text>Tambah Tugas</Text>
        </Pressable>

        {tasks.map((task) => (
          <View key={task.id}> 
          <Pressable onPress={() => toggleTask(task.id)}>
           <Text>{task.done ? '✓ ' : ''}
                   {task.title}
            </Text> 
         
          </Pressable>
          <Pressable onPress={() => removeTask(task.id)}>
            <Text>Hapus</Text>
          </Pressable>
          <Text></Text>
          </View>
        ))}
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
