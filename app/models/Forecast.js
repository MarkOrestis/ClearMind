//import React, { Component } from "react";

export default class Forecast {
    constructor(day, type, currTemp, highTemp, lowTemp, pressure, humidity, pollen, rain) {
       this.day = day;
       this.type = type; 
       this.currTemp = currTemp;
       this.highTemp = highTemp;
       this.lowTemp = lowTemp;
       this.pressure = pressure;
       this.humidity = humidity;
       this.pollen = pollen;
       this.rain = rain;
    }

    alertFor() {
        //Returns whichever weather condition warrants an alert based on algorithm
        //For now, returns pollen over 550 or pressure under 10 hPa
        if (this.pollen > 550) {
            return "pollen";
        } else if (this.pressure < 10) {
            return "pressure";
        } else {
            return "";
        }
    }

    toString() {
        if (this.alertFor() == "pollen") {
            return "Hazard day for allergies \nwith pollen counts of " + this.pollen + ".";
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
}