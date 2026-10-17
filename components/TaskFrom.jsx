import { View, TextInput, Pressable, Text } from "react-native";


export default function TaskFrom(props){
    return(
        <View>
            <TextInput
                    value={props.value}
                    onChangeText={props.onChangeText}
                    placeholder={
                        props.isEditing ? "Ubah Nama Tugas" : "Masukkan Tugas Baru disini"

                    }
            ></TextInput>
            <Pressable onPress={props.onSubmit}>
                <Text>{props.buttonLabel}</Text>
            </Pressable>

            {props.isEditing && (
                <Pressable onPress={props.onCancel}>
                    <Text>Batal</Text>

                </Pressable>
            )

            }
            
        </View>
    )
}