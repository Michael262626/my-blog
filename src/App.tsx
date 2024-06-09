import {Routes, Route} from 'react-router'

import "./global.css"
import SigninForm from "./_auth/forms/SigninForm.tsx";
import {Home} from "./_root/pages";
import SignupFrom from "./_auth/forms/SignupFrom.tsx";
import AuthLayout from "./_auth/AuthLayout.tsx";
import RootLayout from "./_root/RootLayout.tsx";
const App = () => {
    return(
        <main className="flex h-screen">
            <Routes>
                {/* public routes */}
                <Route element={<AuthLayout/>}>
                    <Route path="/sign-in" element={<SigninForm />} />
                    <Route path="/sign-up" element={<SignupFrom />} />
                </Route>

                {/* private routes */}
                <Route element={<RootLayout/>}>
                    <Route index element={<Home/>}/>
                </Route>
            </Routes>

        </main>
    )
}
export default App;