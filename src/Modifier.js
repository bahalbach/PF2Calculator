// Store:
//     item bonuses
//     if using other bonuses/penalties
//     item penalties
//     status bonuses
//     status penalties
//     circumstance bonuses
//     circumstance penalties
//     untyped penalties (other than MAP)

class Modifier {
    constructor(values = null) {
        if (values === null) {
            this.values = new Array(20).fill(0);
        } else
            this.values = values;
    }

    get(level) {
        return this.values[level - 1]
    }

    getDescription(level) {
        let desc = " ";
        if (level) {
            desc += "(" + this.get(level) + ") ";
        }

        desc += this.values[0] + " to " + this.values[19];

        return desc;
    }

    createUpdated(key, event) {
        let newValues;
        switch (key) {
            case "0":
                newValues = new Array(20).fill(0);
                break;
            case "+1":
            case "-1":
                newValues = new Array(20).fill(1);
                break;
            case "+2":
            case "-2":
                newValues = new Array(20).fill(2);
                break;
            case "+3":
            case "-3":
                newValues = new Array(20).fill(3);
                break;
            case "+4":
            case "-4":
                newValues = new Array(20).fill(4);
                break;
            
            default:
                newValues = this.values.slice();
                newValues[key-1] = parseInt(event.target.value);
        }
        return new Modifier(newValues);
    }
}

export default Modifier