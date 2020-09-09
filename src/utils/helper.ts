// // jwt 安装 yarn add @nestjs/jwt passport-jwt @types/passport-jwt
// import { JwtService } from '@nestjs/jwt';
import { constantList  } from '../config/constants'

//从1970年开始的毫秒数然后截取10位变成 从1970年开始的秒数
export function timestamp(): number {
    // return (new Date()).getTime().substr(0,10);
    const time = parseInt((new Date()).getTime().toString().substr(0,10));
    return time;
}

// // 生成jwt  token
// // export function generateJwt(value: any, expires = '7 days'): string { // value 为传入值， expires为过期时间，这两者都会在token字符串中题先
// export function generateJwt(value: any, expires = '4800'): string { // value 为传入值， expires为过期时间，这两者都会在token字符串中题先

//     try {
//         const user = { name };
//         const expiration = 60 * 60;
//         // 将使用者资讯加密
//         // JwtService.
//         const accessToken = JwtService.sign(user, {
//             // 关于建立token时相关参数
//             // 过期时间
//             expiresIn: expiration,
//             // issuer:'http://iron-nest.org',
//             // algorithm:'RS256', // default是HMAC SHA256，也可以指定別的
//         });

//         return accessToken
//         // return {
//         //     accessToken,
//         // };
//     } catch (e) {
//         console.error('jwt sign error --->', e);
//         return '';
//     }
// }

//   // 验证jwt  token
// export function verifyJwt(token: string) {
//     try {
//         return jsonwebtoken.verify(
//             token, 
//             constantList.jwtSecret,
//             {
//                 issuer: "ksdhy",
//                 algorithms: ["HS256"],
//             }
//         ); // 如果过期将返回false
//     } catch (e) {
//         console.error('jwt verify error --->', e);
//         return {
//             code: 10000,
//             message: e.message,
//         };
//     }
// }