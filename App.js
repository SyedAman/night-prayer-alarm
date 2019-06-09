import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class App extends Component {
	async componentWillMount() {
		const response = await this.callTheAdhanAPI();
		console.log(response);
	}

	async callTheAdhanAPI(callback) {
		const response = await fetch(
			'http://api.aladhan.com/v1/calendar?latitude=40.7647456&longitude=-73.8724983&method=2&month=6&year=2019',
		);
		const responseAsJSON = await response.json();
		return JSON.stringify(responseAsJSON);
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Yeee buddy!</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default App;
