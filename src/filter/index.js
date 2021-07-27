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