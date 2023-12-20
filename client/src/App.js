
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userAPI";



const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then( data => {
            user.setUser(true)
            user.setIsAuth(data)
        }).finally(() => setLoading(false))
    }, [user]);



    return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
})

export default App;
