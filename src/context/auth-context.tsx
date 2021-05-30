import React,{useState,ReactNode} from 'react'
import * as auth from './../auth-provider'
import {User} from './../types/user'

interface AuthForm {
    username:string,
    password:string
}

// context上下文 方便祖先组件与后代组件（中间隔了好多层组件）传值
const AuthContext = React.createContext<{
    user : User | null,
    login : (form : AuthForm)=> Promise<void>,
    register : (form : AuthForm) => Promise<void>,
    logout : () => Promise<void>
} | undefined>(undefined)
AuthContext.displayName = "AuthContext"

export const AuthProvider = ({children}:{children:ReactNode}) => {
    const [user,setUser] = useState<User|null>(null);
    const login = (form:AuthForm) => auth.login(form).then(setUser)//登录
    const register = (form: AuthForm) => auth.register(form).then(setUser)//注册
    const logout = () => auth.logout().then(() => setUser(null))//退出
    return <AuthContext.Provider children={children} value={{ user, login, register, logout}} />

}

export const useAuth = () =>{
    const context = React.useContext(AuthContext)
    if(!context){
        throw new Error("useAuth必须在AuthProvider中使用");
        
    }
    return context;
}