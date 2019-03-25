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
    }

    typeToIcon(myType) {
        if (myType == "Sunny") {
            return "weather-sunny";
        } else if (myType == "Cloudy") {
            return "weather-cloudy";
        } else if (myType == "Mostly sunny" || myType == "Mostly cloudy") {
            return "weather-partlycloudy";
        } else if (myType == "Thunderstorms") {
            return "weather-lightning";
        } else {
            return "weather-cloudy";
        }
    }

    alertFor() {
        //Returns whichever weather condition warrants an alert based on algorithm
        //For now, returns pollen over 550 or pressure under 10 hPa
        if (this.tree > 550) {
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
            return "Migraine Warning! \nPressure drop of " + this.pressure + " hPa.";
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
}