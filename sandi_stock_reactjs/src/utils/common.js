class Common {
    static isEmptyObject(obj) {
        if (obj) {
            return Object.keys(obj).length === 0;
        } else {
            return true;
        }
    }
    static ConvertToString(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }
}

export default Common;