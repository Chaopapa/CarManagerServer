import moment from "moment"

export default class TimerHandler{
    public static getTimefromId(_id:string):string{
        let date:Date = new Date(Number(parseInt(_id.substr(10, 8), 16).toString() + '000'));
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }
    
   



}