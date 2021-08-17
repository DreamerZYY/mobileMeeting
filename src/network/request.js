import axios from 'axios'
export function request(config){
    const instance=axios.create({
        baseURL:'http://192.168.1.145:3344/',
        timeout:5000
    })
    //2、axios的拦截器
    //如果有拦截器必须将数据进行返回
    instance.interceptors.request.use(config=>{
       if(localStorage.getItem("Ticket")==null){

        console.log(config)
        //拦截器作用
        //1、比如config中的一些信息不符合服务器的要求
        //2、比如每次发送网络请求时，都希望在界面中显示一个请求的图标
        //3、某些网络请求（比如登陆(token)，鼻血携带一些特殊的信息）
        //console.log(config)
        return config;   
       }else{
        axios.defaults.headers['token'] = localStorage.getItem('token')
        return config
       }
       
    },err=>{
        console.log(err)
    });
    //响应拦截
    instance.interceptors.response.use(res=>{
        if(res.data.code==0){
            return res.data;
        }else if(res.data.code=="20004"){
            alert("登录失败，请检查单位号、账户或者密码是否有误!");
            this.$router.push('/login');
        }else if(res.data.code=="30003"){
            alert("缺少必填项!");
           
        }else{
            this.$router.push('/login');
        }   
    },err=>{
    })
    //3、发送真正的网络请求，实质上返回的就是一个promise
    return instance(config)
}
