import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";


export default function TaskFrom(props){
    return(
        <View>
            <TextInput
                    value={props.value}
                    onChangeText={props.onChangeText}
                    placeholder={
                        props.isEditing ? "Ubah Nama Tugas" : "Masukkan Tugas Baru disini"

                    }
                    style = {styles.input}
                    testID="text-title-input"
            ></TextInput>
            <Pressable onPress={props.onSubmit} style = 
                                    {({pressed}) => [
                                                    styles.submitButton,
                                                    pressed && styles.ButtonPressed]}
                                                    testID="task-submit-button">
                <Text style = {styles.buttonLabel} >{props.buttonLabel}</Text>
            </Pressable>

            {props.isEditing && (
                <Pressable onPress={props.onCancel} style = {({pressed}) => [styles.cancelButton, pressed && styles.ButtonPressed]}
                testID="task-cancel-button"
                >
                    <Text style = {styles.cancelLabel}>Batal</Text>

                </Pressable>
            )

            }

        </View>
    )

}
const styles = StyleSheet.create({
        input:{
            backgroundColor: '#EFE9DD',
            borderColor: '#B8A084', 
            borderWidth: 1,
            borderRadius: 12,
            paddingHorizontal: 14,
            paddingVertical: 12,
            fontSize: 16,
            marginBottom : 10,

            
        },
        submitButton:{
            backgroundColor: '#4d463b',
            paddingVertical: 5,
            paddingHorizontal: 4,
            borderRadius: 12,
            alignItems: 'center',
            width: '100%',
            marginBottom : 5
        },
        ButtonPressed:{
            opacity: 0.9,
            transform : [{scale: 0.97}],
            marginBottom: 6
        },
        buttonLabel:{
           textAlign: 'center',
            color: '#FFFFFF',
            
        },
        cancelButton:{
            backgroundColor: '#68745D',
            paddingVertical: 6,
            paddingHorizontal: 6,
            borderRadius:  12,
            alignItems: 'center',
            marginVertical: 8,
            
        }, 
        cancelLabel:{
            color: '#393A34',
            textAlign: 'center',
            fontSize: 14
        }

    })