import {View, Text, Pressable} from "react-native";
import { StyleSheet } from "react-native";


export default function TaskItem(props){
    return(<View style = {styles.row}>
        <Pressable onPress={props.onToggle} style = {styles.action}>
            <Text> {props.task.title} {props.task.done ? '✅     ' : ''}</Text>

        </Pressable>
     
        <Pressable onPress={props.onRemove} style = {styles.action}>
            <Text>"Hapus"</Text>
        </Pressable>
        <Pressable onPress={props.onEdit} style = {styles.action}>
            <Text>Edit</Text>
        </Pressable>
    </View>);
}

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        padding : 5,
        marginBottom: 4
    },
    action:{
        paddingVertical: 8,
        margin : 5
    }
});