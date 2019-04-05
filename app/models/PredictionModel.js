export default class PredictionModel {
    static forecast(user, currentWeather, tomWeather) {
        let pressureDiff = Math.abs(currentWeather.pressure - tomWeather.pressure);
        let pressureSensitvity = pressureDiff * user.pressure;

        let UVIndex = currentWeather.uv;
        let UVSensitivity = UVIndex * user.light;


        //let pollens = tomWeather.AirAndPollen;
        let grass = tomWeather.grass;
        let mold = tomWeather.mold;
        let ragweed = tomWeather.ragweed;
        let tree = tomWeather.tree;
        let nextDayUVIndex = tomWeather.uv;

        let grassSensitivity = grass * user.grass;
        let moldSensitivity = mold * user.mold;
        let ragweedSensitivity = ragweed * user.ragweed;
        let treeSensitivity = tree * user.tree;
        let lightNextDay = nextDayUVIndex * user.light;

        var light = 0;
        var pressure = 0;     
        var pollen = 0;

        console.log(UVSensitivity);
        
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

        return [pressure, light, pollen];

    }
}