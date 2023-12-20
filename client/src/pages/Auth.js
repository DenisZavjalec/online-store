import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, FormControl, Row} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {click} from "@testing-library/user-event/dist/click";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }
    return (
        <Container className="d-flex justify-content-center align-items-center"
                    style={{height: window.innerHeight - 54}}
        >
        <Card style={{width: 600, color: "dark"}} className="p-5">
            <h2 className="m-auto">{isLogin ? "Авторизація" : "Реєстрація"}</h2>
            <Form className="d-flex flex-column">
                <FormControl
                    className="mt-3"
                    placeholder="Введіть ваш email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <FormControl
                    className="mt-3"
                    placeholder="Введіть ваш пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type='password'
                />
                <Row className="d-flex justify-content-between mt-3 ">
                    {isLogin ?
                        <div>
                        Немає аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зареєструватись</NavLink>
                        </div>
                        :
                        <div>
                            Є аккаунт? <NavLink to={LOGIN_ROUTE}>Увійдіть</NavLink>
                        </div>}

                    <Button
                        className="mt-2"
                        variant="outline-success"
                        onClick={click}
                    >
                        {isLogin ? 'Увійти' : 'Зареєструватись'}
                    </Button>
                </Row>
            </Form>
        </Card>
        </Container>
    );
});

export default Auth;