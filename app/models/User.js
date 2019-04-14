export default class User {
    constructor(obj) {
        if (obj == null) {
            this.pressure = 0;
            this.light = 0;
            this.pollen = 0;
            this.tree = 0;
            this.mold = 0;
            this.weed = 0;
            this.grass = 0;
            this.prediction = []
        } else {
            obj && Object.assign(this, obj);
        }
    }
}