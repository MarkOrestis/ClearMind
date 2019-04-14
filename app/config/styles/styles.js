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
	userFeedbackText: {
		textAlign:"center",
		marginTop: 10,
		marginBottom: 8,
		fontSize:18
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
	feedbackView: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingLeft: 110,
		paddingRight: 110
	},
	feedbackEmoji: {
		flexDirection:'column'
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
});