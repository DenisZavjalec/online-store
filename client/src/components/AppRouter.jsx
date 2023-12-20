import React, {useContext} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {ADMIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import Admin from "../pages/Admin";

const AppRouter = () => {
    const {user} = useContext(Context)
    console.log(user)
    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path, Component}) =>
            <Route key={path} path={path} component={Component} exact/>
            )}
            { publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Route path={ADMIN_ROUTE} component={Admin} />
            <Redirect to={SHOP_ROUTE} />
        </Switch>

    );
};

export default AppRouter;