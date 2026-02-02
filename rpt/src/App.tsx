import { AppRouter } from "./app-router"
import { AuthProvider } from "./context/AuthContext" 


export function App(){
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    )
}
