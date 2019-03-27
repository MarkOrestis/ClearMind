export class PredictionModel {
    static forecast(user, currentWeather, tomWeather) {
        let pressureDiff = currentWeather.Pressure - tomWeather.Pressure;
        let pressureSensitvity = pressureDiff * user.pressure;

        let UVIndex = currentWeather.UVIndex;
        let UVSensitivity = UVIndex * user.light;


        let pollens = tomWeather.AirAndPollen;
        let grassVal = pollens[0].CategoryValue;
        let moldVal = pollens[1].CategoryValue;
        let ragweedVal = pollens[2].CategoryValue;
        let treeVal = pollens[3].CategoryValue;
        let nextDayUVIndex = pollens[4].Value;

        let grassSensitivity = grassVal * user.grass;
        let moldSensitivity = moldVal * user.mold;
        let ragweedSensitivity = ragweedVal * user.ragweed;
        let treeSensitivity = treeVal * user.tree;
        let lightNextDay = nextDayUVIndex * user.light;

        let light = 0;
        let pressure = 0;     
        let pollen = 0;
        let grass = getPollenSensitivity(grassSensitivity);
        let mold = getPollenSensitivity(moldSensitivity);
        let ragweed = getPollenSensitivity(ragweedSensitivity);
        let tree = getPollenSensitivity(treeSensitivity);
        
        if (pressureSensitvity > 0) {
            if (pressureSensitvity >= 18) {
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



        // Function to get the sensitivity for any pollen since they all use the same ranges
        getPollenSensitivity(sensitivity) = function() {
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
  

    }
}