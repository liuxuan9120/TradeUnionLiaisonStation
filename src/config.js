// 定义一些公共的属性和方法
/*test=true测试，false正式环境*/
const test = false;//
if(process.env.NODE_ENV === 'development'){
    // eslint-disable-next-line no-console
    console.log('开发环境')
}else{
    // eslint-disable-next-line no-console
    console.log('生产环境')
}
const httpUrl = test?'http://58.54.251.155:8088':'http://www.wzgh.org';
const api = test? '/wzzgh-fwdt/committeeImp': '/committeeImp';
const loginUrl = httpUrl + '/regUser/login?prepage=jbwy/#/memberList';
// /*http://www.wzgh.org/wzzgh-upload*/
//http://58.54.251.155:8088/wzzgh-upload/upload/committeeMemberCover/2019/8/88301936-cb4d-41aa-952f-7308b52973ca.jpg
const upload ='/wzzgh-upload';
let imgUrl = httpUrl + upload;
let fileUrl = httpUrl + upload;

// const api ='/api';
// function commonFun() {
//     // console.log("公共方法")
// }
// 暴露出这些属性和方法
export default {
    test,
    httpUrl,
    api,
    imgUrl,
    loginUrl,
    fileUrl
}