export default class User {
    constructor(obj) {
        if (obj == null) {
            this.id = "";
            this.firstName="";
            this.lastName="";
            this.pressure = "";
            this.pollen = "";
            this.tree = "";
            this.mold = "";
            this.weed = "";
            this.grass = "";
        } else {
            obj && Object.assign(this, obj);
        }
    }
}