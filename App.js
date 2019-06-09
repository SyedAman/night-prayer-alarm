import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import config from './app/config';

class App extends Component {
	state = {
		nightPrayerTime: null,
	};

	async componentWillMount() {
		this.calculateNightPrayerAlarmTime();
	}

	async callTheAdhanAPI(
		latitude = 40.7647456,
		longitude = -73.8724983,
		month = 6,
		year = 2019,
	) {
		const requestURL = `${
			config.adhanApi
		}?latitude=${latitude}&longitude=${longitude}&method=2&month=${month}&year=${year}`;
		const response = await fetch(requestURL);
		const responseAsJSON = await response.json();
		return responseAsJSON;
	}

	async calculateNightPrayerAlarmTime() {
		// TODO: Consider when it's the first of the month and the day before is
		// from another month.
		const latitude = 40.7647456,
			longitude = -73.8724983,
			presentMonth = 6,
			presentYear = 2019;

		const response = await this.callTheAdhanAPI(
			latitude,
			longitude,
			presentMonth,
			presentYear,
		);
		const adhanTimesForThisMonth = response.data;

		const today = moment().format('DD-MM-YYYY');
		const tomorrow = moment()
			.add(1, 'days')
			.format('DD-MM-YYYY');
		const adhanTimesForToday = adhanTimesForThisMonth.find(
			adhanTimesForDay => adhanTimesForDay.date.gregorian.date === today,
		);
		const adhanTimesForTomorrow = adhanTimesForThisMonth.find(
			adhanTimesForDay => adhanTimesForDay.date.gregorian.date === tomorrow,
		);
		const { timings: { Isha } } = adhanTimesForToday;
		const { timings: { Fajr } } = adhanTimesForTomorrow;
		// const fajrInMomentFormat = `${today} ${Fajr.match(/^\d{2}/gm)[0]}:${
		// 	Fajr.match(/(?<=:)\d{2}/gm)[0]
		// }`;
		console.log('Fajr', Fajr);
		console.log('Isha', Isha);
		this.setState({ nightPrayerTime: Fajr });
		// const regex = /(?<=:)\d{2}/gm;
		// console.log(
		// 	'moment',
		// 	moment('2019-08-26'),
		// 	Fajr.match(/^\d{2}/gm)[0],
		// Fajr.match()[0],
		// );
	}

	render() {
		const { nightPrayerTime } = this.state;

		return (
			(nightPrayerTime && (
				<View style={styles.container}>
					<Text>{nightPrayerTime.match(/\d{2}:\d{2}/gm)[0]} AM</Text>
					<Text>Enable Night Prayer Alarm</Text>
				</View>
			)) || <Text>Ay</Text>
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
