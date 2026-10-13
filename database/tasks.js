export async function deleteTask(database, taskId){

    await database.runAsync(
        'DELETE FROM tasks WHERE id = ?', (taskId)
    )
   
}



export async function insertTask(database, task){
    await database.runAsync(
        'INSERT INTO tasks(id, title, done) VALUES (?,?,?)',
        task.id, task.title, task.done ? 1: 0
    )
}

export async function updateTaskDone( database, updatedState, taskId){
    await database.runAsync(
        'UPDATE tasks SET done = ? WHERE id = ?',
        updatedState, taskId
    )
}

export async function getTasks(database){
    return await database.getAllAsync(
        'SELECT id, title, done from tasks'
    )
}

export async function createTable(database){
    return await database.execAsync(`
            CREATE TABLE IF NOT EXISTS tasks(
            id TEXT PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            done INTEGER NOT NULL DEFAULT 0);
        `)
}