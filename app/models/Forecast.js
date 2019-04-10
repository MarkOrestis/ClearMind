//import React, { Component } from "react";

export default class Forecast {
    constructor(day, type, currTemp, highTemp, lowTemp, pressure, humidity, mold, ragweed, grass, tree, aq, uv) {
       this.day = day ? day.toString().substring(5, 10) : ""; //type ? type.toString() : ""
       this.type = this.typeToIcon(type); 
       this.currTemp = currTemp;
       this.highTemp = highTemp;
       this.lowTemp = lowTemp;
       this.pressure = pressure;
       this.humidity = humidity;
       this.mold = mold;
       this.ragweed = ragweed;
       this.grass = grass;
       this.tree = tree;
       this.aq = aq;
       this.uv = uv;

       this.alertFor = this.alertFor.bind(this);
       this.predictionToString = this.predictionToString.bind(this);

    }

    //Finish adding types
    typeToIcon(myType) {
        if (myType == "Sunny" || myType == "Intermittent Clouds" || myType == "Clear") {
            return "weather-sunny";
        } else if (myType == "Cloudy") {
            return "weather-cloudy";
        } else if (myType == "Mostly sunny" || myType == "Mostly cloudy" || myType == "Partly sunny") {
            return "weather-partlycloudy";
        } else if (myType == "Thunderstorms") {
            return "weather-lightning";
        } else if (myType == "Showers" || myType == "Rain" || myType == "Mostly cloudy w/ Showers") {
            return "weather-rainy";   
        } else {
            return "weather-cloudy";
        }
    }

    alertFor() {
        //Returns whichever weather condition warrants an alert based on algorithm
        //For now, returns pollen over 550 or pressure under 10 hPa
        if (this.pollen > 1) { //prediction.pollen
            return "pollen";
        } else if (this.pressure < 10) {
            return "pressure";
        } else {
            return "";
        }
    }

    toString() {
        if (this.alertFor() == "pollen") {
            return "Hazard day for allergies \nwith pollen counts of " + this.tree + ".";
        } else if (this.alertFor() == "pressure") {
            return "Hazard day for migraines \nwith pressure of " + this.pressure + " hPa.";
        } else {
            return "No significant changes in weather conditions! Have a great day!";
        }
    }

    displayIcon(forIcon) {
        if (forIcon) {
            if (this.alertFor() == "") {
                return "emoticon-happy-outline";
            } else {
                return "alert";
            }
        } else {
            if (this.alertFor() == "") {
                return "black";
            } else {
                return "red";
            }
        }
        
    }

    predictionToString(prediction) {
        var predictionArr = ["", "", "", "", "", ""];
        if (prediction[0] == 3) {
            predictionArr[0] = "Severe hazard day for migraines \nwith pressure of " + this.pressure + " hPa.";
        } else if (prediction[0] == 2) {
            predictionArr[0] = "Moderate hazard day for migraines \nwith pressure of " + this.pressure + " hPa.";
        } 
        if (prediction[1] == 3) {
            predictionArr[1] = "Severe hazard day for migraines \nwith UV index of " + this.uv + ".";
        } else if (prediction[1] == 2) {
            predictionArr[1] = "Moderate hazard day for migraines \nwith UV index of " + this.uv + ".";
        }
        if (prediction[2] == 3) {
            predictionArr[2] = "Severe grass allergy warning \nwith pollen counts of " + this.grass + ".";
        } else if (prediction[2] == 2) {
            predictionArr[2] = "Moderate grass allergy warning \nwith pollen counts of " + this.grass + ".";
        }
        if (prediction[3] == 3) {
            predictionArr[3] = "Severe mold warning \nwith counts of " + this.mold + ".";
        } else if (prediction[3] == 2) {
            predictionArr[3] = "Moderate mold warning \nwith counts of " + this.mold + ".";
        }
        if (prediction[4] == 3) {
            predictionArr[4] = "Severe ragweed allergy warning \nwith pollen counts of " + this.ragweed + ".";
        } else if (prediction[4] == 2) {
            predictionArr[4] = "Moderate ragweed allergy warning \nwith pollen counts of " + this.ragweed + ".";
        }
        if (prediction[5] == 3) {
            predictionArr[5] = "Severe tree allergy warning \nwith pollen counts of " + this.tree + ".";
        } else if (prediction[5] == 2) {
            predictionArr[5] = "Moderate tree allergy warning \nwith pollen counts of " + this.tree + ".";
        }

        return predictionArr;
    }

    predictionDisplayIcon(prediction) {
        console.log(prediction);
        if (prediction[0] == 5 || prediction[1] == 3 || prediction[3] == 3 || prediction[4] == 3 || prediction[5] == 3 || prediction[6] == 3) {
            return "alert";
        } else if (prediction[0] == 3 || prediction[1] == 2 || prediction[3] == 2 || prediction[4] == 2 || prediction[5] == 2 || prediction[6] == 2) {
            return "emoticon-neutral-outline";
        } else {
            return "emoticon-happy-outline";
        }
    }
}