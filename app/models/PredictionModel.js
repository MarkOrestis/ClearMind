export class PredictionModel {
    static forecast(user, currentWeather, tomWeather) {
        let pressureDiff = currentWeather.Pressure - tomWeather.Pressure;
        let pressureSensitvity = pressureDiff * user.pressure;

        let UVIndex = currentWeather.UVIndex;
        let UVSensitivity = UVIndex * user.light;


        let pollens = tomWeather.AirAndPollen;
        let grass = pollens[0].Value
        let mold = pollens[1].Value
        let ragweed = pollens[2].Value
        let tree = pollens[3].Value
        let nextDayUVIndex = pollens[4].value;

        let grassSensitivity = grass * user.grass;
        let moldSensitivity = mold * user.mold;
        let ragweedSensitivity = ragweed * user.ragweed;
        let treeSensitivity = tree * user.tree;
        let lightNextDay = nextDayUVIndex * user.light;

        let light = 0;
        let pressure = 0;     
        let pollen = 0;
        
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

        

        
        

    }
}