class Common {
    static isEmptyObject(obj) {
        if(obj){
            return Object.keys(obj).length === 0;
        } else{
            return true;
        }
    }
}

export default Common;