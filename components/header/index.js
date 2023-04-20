import React, { useState, useEffect } from "react";
import { Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, HomeOutlined } from "@ant-design/icons";
import styles from './styles.module.scss';
import { apiRegister } from "../../services/authentication";
import { LOCAL_STORAGE } from "../../utils/common";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";

function Header() {
    const router = useRouter();
    const { isAuth, username } = useAuth();

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
        localStorage.setItem(LOCAL_STORAGE.TOKEN, result.token)
        localStorage.setItem(LOCAL_STORAGE.USERNAME, result.username)
        location.reload();
    }

    const onLogout = () => {
        localStorage.clear();
        location.reload();
    }

    const shareMovies = () => {
        router.replace({
            query: { ...router.query, content: 'sharing' },
        });
    }

    const onBackHome = () => {
        router.replace({
            query: { ...router.query, content: 'listing' },
        });
    }

    return (
        <div className={styles.header__wrapper}>
            <div className={styles.header__logo} onClick={onBackHome}>
                <HomeOutlined />
                <p className={styles.header__title}>Funny Movies</p>
            </div>
            <div className={styles.flex_row}>
                {isAuth ?
                    <>
                        <p className={styles.mr_05}>Welcome {username}</p>
                        <Button className={styles.mr_05} type="primary" onClick={shareMovies}>Share a movie</Button>
                        <Button className={styles.mr_05} type="primary" onClick={onLogout}>Logout</Button>
                    </>
                    :
                    <>
                        <Input
                            value={state.username}
                            onChange={onChange}
                            name="username"
                            placeholder="Username"
                            className={styles.input__common}
                        />
                        <Input.Password
                            value={state.password}
                            onChange={onChange}
                            className={styles.input__common}
                            placeholder="Password"
                            name="password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                        <Button
                            type="primary"
                            disabled={!state.username || !state.password}
                            onClick={onAuth}
                        >Login/Register</Button>
                    </>
                }
            </div>

        </div >
    );
}

export default Header;
