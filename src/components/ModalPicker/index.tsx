
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CatgoryProps } from "../../pages/Order";


interface ModalPickerProps {
    options: CatgoryProps[];
    handleCloseModal: () => void;
    selectedItem: (item: CatgoryProps) => void;
}

const { width: WIDTH, height: HEIGTH } = Dimensions.get('window')

export function ModalPicker(
    { options, handleCloseModal, selectedItem }: ModalPickerProps){
    
    function onPressItem(item: CatgoryProps){
        selectedItem(item)
        handleCloseModal();
    }

    const option = options.map((item, index) => (

        <TouchableOpacity key={index} style={styles.option} onPress={() => onPressItem(item)}>
            <Text style={styles.item}>
                {item?.name}
            </Text>
        </TouchableOpacity>
    
    ))
    
    return (
        <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {option}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    content: {
        width: WIDTH - 20,
        height: HEIGTH / 2,
        backgroundColor: "#fff",
        borderWidth: 1,
        color: "#8a8a8a",
        borderRadius: 4
    },

    option: {
        alignItems: 'flex-start',
        borderTopWidth: 0.8,
        borderTopColor: "#8a8a8a"
    },
    item: {
        margin: 18,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#101026'
    }
})