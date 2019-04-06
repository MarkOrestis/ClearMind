export default class PredictionModel {

    // Function to get the sensitivity for any pollen since they all use the same ranges
    static getPollenSensitivity = function(sensitivity) {
        if (sensitivity >= 6) {
            return 3;
        } else if (sensitivity >= 3) {
            return 2;
        } else if (sensitivity >= 2) {
            return 1;
        } else {
            return 0;
        }
    }

    static forecast(user, currentWeather, tomWeather) {
        let pressureDiff = Math.abs(currentWeather.pressure - tomWeather.pressure);
        let pressureSensitvity = pressureDiff * user.pressure;

        let UVIndex = currentWeather.uv;
        let UVSensitivity = UVIndex * user.light;


        //let pollens = tomWeather.AirAndPollen;
        let grassVal = tomWeather.grass;
        let moldVal = tomWeather.mold;
        let ragweedVal = tomWeather.ragweed;
        let treeVal = tomWeather.tree;
        let nextDayUVIndex = tomWeather.uv;

        let grassSensitivity = grassVal * user.grass;
        let moldSensitivity = moldVal * user.mold;
        let ragweedSensitivity = ragweedVal * user.ragweed;
        let treeSensitivity = treeVal * user.tree;
        let lightNextDay = nextDayUVIndex * user.light;

        var light = 0;
        var pressure = 0;     
        var pollen = 0;
        var grass = this.getPollenSensitivity(grassSensitivity);
        var mold = this.getPollenSensitivity(moldSensitivity);
        var ragweed = this.getPollenSensitivity(ragweedSensitivity);
        var tree = this.getPollenSensitivity(treeSensitivity);
        
        if (pressureSensitvity > 0) {
            if (pressureSensitvity >=18) {
                // if > 3 chance of migraine is high
                pressure = 5;
            } else if (pressureSensitvity >= 14) {
                // if > 1, chance of migraine is moderate
                pressure = 3;
            } else if(pressureSensitvity >= 10) {
                // chance of migraine is low
                pressure = 1;
            }
        }

        if (UVSensitivity > 0) {
            if (UVSensitivity >= 21) {
                // chance of migraine is high
                light = 3;
            } else if(UVSensitivity >= 14) {
                // chance of migraine is moderate
                light = 2
            } else if (UVSensitivity >= 10) {
                // chance of migraine is low
                light = 1;
            }
        }

        return [pressure, light, pollen, grass, mold, ragweed, tree];

    }
}