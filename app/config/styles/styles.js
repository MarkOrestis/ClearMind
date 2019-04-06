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
	googleSignin: {
		marginTop: 20,
		textAlign:"center",
		color:"#FBBC05"
	},
	card:{
		backgroundColor:'rgba(56, 172, 236, 1)',
		borderWidth:0,
		borderRadius:20,
		justifyContent: 'center'
	},
	notes: {
		fontSize: 18,
		color:'#fff',
	},
	lowTemp: {
		fontSize: 12,
		color:'#fff',
	},
	viewStyle: {
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	column: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	}
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