import {ReactNode} from 'react'
import {AuthProvider} from './auth-context'
//React.ReactNode是组件的render函数的返回值
export const AppProviders = ({children}:{children: ReactNode}) =>{
    return <AuthProvider>
        {children}
    </AuthProvider>
}