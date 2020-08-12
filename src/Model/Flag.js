class Flag {
    constructor(value = false) {
        this.value = value;
    }

    isTrue() {
        return this.value;
    }

    createUpdated(event) {
        return new Flag(event.target.checked);
    }
}

export default Flag