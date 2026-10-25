import {View, Text, Pressable, StyleSheet} from "react-native";


export default function TaskItem(props){
    return(<View style = {styles.row}>
        <Pressable onPress={props.onToggle} style = {styles.action}
                testID={`task-toggle-${props.task.id}`}>
            <Text
                style = {[
                    styles.TaskTitle,
                    props.task.done && styles.TaskTitleDone
                ]}
            > {props.task.title} {props.task.done ? '✅     ' : ''}</Text>

        </Pressable>

        <Pressable  testID={`task-edit-${props.task.id}`}
                    onPress={props.onEdit} style = {styles.edit} >
            <Text
                style = {styles.label}
            >Edit</Text>
        </Pressable>
        
        <Pressable onPress={props.onRemove} style = {styles.delete}
                  testID={`task-delete-${props.task.id}`}>
            <Text
                style = {styles.label}
            >Hapus</Text>
        </Pressable>
       
    </View>);
}

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        padding : 5,
        marginBottom: 8,
        backgroundColor: '#FBF7EF',
        borderColor: '#604f3c',
        color: '#393A34',
        borderWidth: 1.5,
        borderRadius: 4.5,
        paddingHorizontal: 12,
        paddingVertical: 12,
        alignItems: 'center'
    },
    action:{
        paddingVertical: 8,
        margin : 5,
        flex: 1,
    },
    TaskTitle:{
        color: '#393A34',

    },
    TaskTitleDone:{
        textDecorationLine:'line-through',
        color: '#928B7D'
    },
    edit:{
        backgroundColor: '#68745D',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    delete:{
        backgroundColor: '#A95650',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    label:{
        color:'#FFFFFF',
        fontSize: 13,
        fontWeight: 500
    }
});