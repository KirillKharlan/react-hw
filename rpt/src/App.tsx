import { AppRouter } from "./app-router"
import { AuthProvider } from "./shared/context/AuthContext" 


export function App(){
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    )
}
