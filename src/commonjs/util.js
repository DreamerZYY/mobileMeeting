var  loginInfo="";
var reg = new RegExp( '-' , "g" );
if(localStorage.getItem("MaxTicket")!=null&&localStorage.getItem("MaxTicket")!=""&&localStorage.getItem("MaxTicket").indexOf(".")>=0){
	var ticketStr1=localStorage.getItem("MaxTicket").split(".")[1];
	var newTicketStr1 = ticketStr1.replace( reg , '+' );
	loginInfo=eval("("+window.atob(newTicketStr1)+")");
}
export function addCookie(objName, objValue, objHours){
    var str = objName + "=" + escape(objValue); //编码
    if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    document.cookie = str;
}
export function getCookie(objName) {//获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) return unescape(temp[1]);  //解码
    }
    return "";
}
export function getNowDate(){
    var str="";
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    var hours=date.getHours();
    var minutes=date.getMinutes();
    str='{"beginYear":'+year+',"beginMonth":'+month+',"beginDay":'+day+',"beginHours":'+hours+',"beginMinutes":'+minutes+'}';
    return str;
}
export function addZero(str, len, ch) { //补全的变量、补全后的长度、用什么来补
	str = String(str);
	var i = -1;
	if (!ch && ch !== 0) ch = ' ';
	len = len - str.length;
	while (++i < len) {
		str = ch + str;
	}
	return str > 0 ? str : "00";
}
//获取时间差,并返回秒数
export function getTimeSec(str1,str2){
	//var date=new Date();
	var str=new Date(str2).getTime()-new Date(str1).getTime();
	return str;
}
export default{
    loginInfo
}