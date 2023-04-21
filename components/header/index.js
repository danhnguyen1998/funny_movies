import React, { useState } from "react";
import { Input, Button, notification } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, HomeOutlined } from "@ant-design/icons";
import styles from './styles.module.scss';
import { apiRegister } from "../../services/authentication";
import { LOCAL_STORAGE, STATUS_CODE } from "../../utils/common";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import { Context } from "../../helpers/common";

function Header() {
    const router = useRouter();
    const { isAuth, username } = useAuth();

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement, message) => {
        api.info({
            message: `Notification`,
            className: `notification__login`,
            description: <Context.Consumer>{() => `${message}`}</Context.Consumer>,
            placement,
        });
    };

    const [state, setState] = useState({
        username: '',
        password: '',
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

    const onAuth = async () => {
        const { username, password } = state;
        const result = await apiRegister({
            username,
            password
        })
        if (result.status_code === STATUS_CODE.OK) {
            localStorage.setItem(LOCAL_STORAGE.TOKEN, result.token)
            localStorage.setItem(LOCAL_STORAGE.USERNAME, result.username)
            location.reload();
        } else {
            openNotification('topRight', result.message)
        }
    }

    const onLogout = () => {
        localStorage.clear();
        location.reload();
    }

    const shareMovies = () => {
        router.push('/share')
    }

    const onBackHome = () => {
        router.push('/home')
    }

    return (
        <>
            <Context.Provider value="Funny Movies">
                {contextHolder}
            </Context.Provider>
            <div className={styles.header__wrapper}>
                <div className={styles.header__logo} onClick={onBackHome}>
                    <HomeOutlined />
                    <p className={styles.header__title}>Funny Movies</p>
                </div>
                <div className={styles.flex_row}>
                    {isAuth ?
                        <>
                            <p className={styles.mr_05} data-test="para__welcome">Welcome {username}</p>
                            <Button className={styles.mr_05} type="primary" onClick={shareMovies}>Share a movie</Button>
                            <Button className={styles.mr_05} type="primary" onClick={onLogout}>Logout</Button>
                        </>
                        :
                        <>
                            <Input
                                data-test="input__username"
                                value={state.username}
                                onChange={onChange}
                                name="username"
                                placeholder="Username"
                                className={styles.input__common}
                            />
                            <Input.Password
                                data-test="input__password"
                                value={state.password}
                                onChange={onChange}
                                className={styles.input__common}
                                placeholder="Password"
                                name="password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                            <Button
                                data-test="button__login"
                                type="primary"
                                disabled={!state.username || !state.password}
                                onClick={onAuth}
                            >Login/Register</Button>
                        </>
                    }
                </div>

            </div >
        </>
    );
}

export default Header;
