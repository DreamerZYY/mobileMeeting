import {addZero} from '@/commonjs/util'
export function statusParse(status){
    var eleStatus=""         
    if (status == "0") {
        eleStatus = "启用";
    } else if (status == "1") {
        eleStatus = "审核";
    } else if (status == "2") {
        eleStatus = "禁用";
    } else if (status == "3") {
        eleStatus = "维修";
    } else if (status == "4") {
        eleStatus = "预留";
    }
    return eleStatus
}
//开始时间过滤器

export function startTimeChange(time){
    return time.split(" ")[0];
}

//时分秒过滤器
export function changeHTime(time){
    var time=new Date(Date.parse(time)).getHours();
    return addZero(time,2,0);
}
export function changeMTime(time){
    var time=new Date(Date.parse(time)).getMinutes();
    return addZero(time,2,0);
}