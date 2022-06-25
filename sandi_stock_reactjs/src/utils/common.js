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

    static prettyDate(date) {
        const formated = new Date(date)

        return formated.getUTCDate() + '/' + formated.getUTCMonth()
            + '/' + formated.getUTCFullYear()
    }

    static prettyDateTime(date) {
        const formated = new Date(date)

        return formated.getUTCDate() + '/' + formated.getUTCMonth()
            + '/' + formated.getUTCFullYear() + ' ' + formated.getHours() + ':' + formated.getMinutes()
    }

    static convertTransType(type) {
        const types = [
            { value: 1, label: "Thành phẩm sản xuất" },
            { value: 2, label: "Mua hàng" },
            { value: 3, label: "Hàng bị trả lại" },
            { value: 4, label: "Hàng nhận gia công" },
            { value: 5, label: "Khác" }
        ]

        let found = types.find((element) => {
            return element.value === type;
        });

        return found ? found.label : ''
    }

    static convertStatus(status) {
        const statusList = [
            { value: 2, label: "Đã nhập" },
            { value: 1, label: "Chờ nhập" },
            { value: -1, label: "Hủy bỏ" }
        ]

        let found = statusList.find((element) => {
            return element.value === status;
        });

        return found ? found.label : ''
    }

    static addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    static removeNonNumeric = num => num.toString().replace(/[^0-9.]/g, "");
}

export default Common;