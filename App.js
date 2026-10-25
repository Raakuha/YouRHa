  import { StatusBar } from 'expo-status-bar';
  import { StyleSheet, Text, View,  ScrollView } from 'react-native';
  import { useState, useEffect, } from 'react';
  import * as SQLite from 'expo-sqlite'
  import { deleteTask, insertTask , updateTaskDone, getTasks, createTable, updateEditTask} from './database/tasks';
  import TaskItem from './components/TaskItem';
  import TaskFrom  from './components/TaskFrom';
  import Svg, { Text as SvgText } from 'react-native-svg';

  
  export default function App() {
    const [tasks, setTasks] = useState([]);
    const [isloading, setLoading] = useState(true);
    const [database, setDatabase] = useState(null);
    const [databaseError, setDatabaseError] = useState('');
    const [taskError, setTaskError] = useState('');
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
          setDatabaseError('Gagal memuat tugas, reload coba')
        }finally{
          setLoading(false);
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

      try {
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
        setTaskError('');
      } catch (error) {
        setTaskError('Tugas gagal selesai')
      }

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
        setErrorMessage("Isi nama tugasnya dulu")
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
      try {
        await deleteTask(database, taskId)
        setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId))
        setTaskError('');
      } catch (error) {
        setTaskError('Task gagal dihapus')
      }
      
    }

    const taskIsEditing = tasks.find((task) => task.id === editingTask)
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle = {styles.content}>  
                
          <Svg width="100%" height={50}>           
            <SvgText
                x="50%"
                y={36}
                textAnchor="middle"
                fontSize={32}
                fontWeight="700"
                fill="none"
                stroke="#0a0a09"
                strokeWidth={2}
                strokeLinejoin="round"
            >
                YouRHa
            </SvgText>

      
            <SvgText
                x="50%"
                y={36}
                textAnchor="middle"
                fontSize={32}
                fontWeight="700"
                fill="#ffe5cf"
                stroke="none"
            >
                YouRHa
            </SvgText>
        </Svg>
          <Text
            style = {styles.tagline}
          >For Glory Of Myself</Text>
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
          { isloading && (
              <Text>Memuat tugas . . .</Text>
            )
          }
          {!isloading && databaseError !== '' && (
            <Text> {databaseError}</Text>
          )}
          {!isloading && databaseError === '' && tasks.length === 0 && (
              <Text>Kamu belum punya tugas. </Text>
            )


          }
          {taskError !== '' && (
            <Text>{taskError}</Text>
          )
            


          }
          {tasks.map((task) => (
            <View key={task.id}> 
            <TaskItem task = {task} onToggle = {() => toggleTask(task.id)} onRemove = {() => removeTask(task.id)} onEdit = {() => startEditingTask(task)} ></TaskItem>
            <Text></Text>
            </View>
          ),
            
          )}
        </ScrollView>
        <StatusBar style="auto" />

      </View>

      
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFEFA',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      paddingHorizontal: 20,
    },
    content:{
      paddingVertical: 20,

    },
    tagline:{
      textAlign:'center'
    }
    
  });
  