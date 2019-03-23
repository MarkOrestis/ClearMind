import { StyleSheet, Dimensions } from 'react-native';


export const colorPalette = {
    primary: "#15455C", //  Blue
    secondary: "#F5F5DC", // Beige
    fontColor: "#000000", // Black
    otherColor: "#0B4F6C", // Blue-Gray
    primaryText: "#FFFFFF", // White
    switchEnabled: '#C70039',
    switchDisabled:'#efeff3'
};

export const colorStyles = StyleSheet.create({
    primary: {
        backgroundColor: colorPalette.primary
    },
    primary2: {
        backgroundColor: colorPalette.primaryText
    },
    primaryText: {
        color: colorPalette.primaryText
    },
    other: {
        backgroundColor: colorPalette.otherColor
    }
});
