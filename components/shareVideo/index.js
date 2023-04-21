import React, { useState } from "react";
import { Input, Button, notification } from 'antd';
import styles from './styles.module.scss';
import { LOCAL_STORAGE, STATUS_CODE } from "../../utils/common";
import { apiCreateVideo } from "../../services/video";
import { useVideoInfo } from "../../hooks/useVideoInfo";
import { Context, getEmbedId } from "../../helpers/common";

function ShareVideo() {
    const [state, setState] = useState({
        url: '',
    });
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement, message) => {
        api.info({
            message: `Notification`,
            description: <Context.Consumer>{() => `${message}`}</Context.Consumer>,
            placement,
        });
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

    const onSubmit = async () => {
        const username = localStorage.getItem(LOCAL_STORAGE.USERNAME)
        const embedId = getEmbedId(state.url)
        const videoInfo = await useVideoInfo(embedId)
        if (videoInfo.data.items.length > 0) {
            const content = videoInfo.data.items[0]
            const result = await apiCreateVideo({
                url: state.url,
                title: content.snippet?.title,
                shareby: username,
                description: content.snippet?.description.substring(0, 200).concat("...")
            })
            if (result.status_code === STATUS_CODE.OK) {
                openNotification('topRight', 'Successfully sharing')
            } else {
                openNotification('topRight', 'Something wrong. Please check your url!')
            }
        } else {
            openNotification('topRight', 'Something wrong. Please check your url!')
        }
    }

    return (
        <>
            <Context.Provider value="Funny Movies">
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
                        data-test="input__url-sharing"
                        data-testid="input__url-sharing"
                    />
                    <Button data-testid="btn-sharing" data-test="btn-sharing" type="primary" onClick={onSubmit}>Share</Button>
                </div >
            </div>
        </ >
    );
}

export default ShareVideo;
