import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    linkText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue'
	},
	
	contentContainerStyle: {
		flex:1, 
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems:"center",
		paddingLeft: 10,
		paddingRight: 10
	},
	loginTitle: {
		fontSize: 45,
		fontWeight: "bold",
		textAlign: "center",
		margin:20,
		paddingBottom: 120
	},
	headerTitleStyles: {
		color: '#000000',
		alignSelf: 'center',
		textAlign: 'center',
		flexGrow: 1,
	},
	weatherDetails: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	weatherViewStyle: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 25,
		marginBottom: 0,
	},
    // loginForeground: {
	// 	flex: 1,
	// 	flexDirection: "column",
	// 	alignItems: "center",
	// 	justifyContent: "center",
	// 	paddingLeft: 10,
	// 	paddingRight: 10,
	// },
	// TitleContainer: {
	// 	flex: 1,
	// 	flexDirection: 'column',
	// 	alignItems: 'center',
	// 	justifyContent: 'center',
	// 	paddingTop: 0,
	// },
	// TitleHeader: {

	// },
	// TitleName: {
	// 	color: '#FFFFFF',
	// 	fontWeight: '600',
	// 	fontSize: 20,
	// 	paddingTop: 8
	// },
});