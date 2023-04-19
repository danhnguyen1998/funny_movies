import React, { useState, useMemo } from "react";
import { Input, Button, notification } from 'antd';
import styles from './styles.module.scss';
import { LOCAL_STORAGE, STATUS_CODE } from "../../utils/common";
import { apiCreateVideo } from "../../services/video";

function ShareVideo() {
    const Context = React.createContext({
        name: 'Default',
    });
    const [state, setState] = useState({
        url: '',
    });
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement) => {
        api.info({
            message: `Notification`,
            description: <Context.Consumer>{() => `Share video successfully!`}</Context.Consumer>,
            placement,
        });
    };

    const contextValue = useMemo(
        () => ({
            name: 'Funny Movies',
        }),
        [],
    );

    const onChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

    const onSubmit = async () => {
        const username = localStorage.getItem(LOCAL_STORAGE.USERNAME)
        const result = await apiCreateVideo({
            url: state.url,
            title: 'Test',
            shareby: username,
        })
        if (result.status_code === STATUS_CODE.OK) openNotification('topRight')
    }

    return (
        <>
            <Context.Provider value={contextValue}>
                {contextHolder}
            </Context.Provider>
            <div className={styles.flex}>
                <div className={styles.header__wrapper}>
                    <p className={styles.header__title}>Share a Youtube movie</p>
                    <Input
                        value={state.username}
                        onChange={onChange}
                        name="url"
                        placeholder="Youtube URL"
                        className={styles.input__common}
                    />
                    <Button type="primary" onClick={onSubmit}>Share</Button>
                </div >
            </div>
        </ >
    );
}

export default ShareVideo;