import React, { useState, useEffect } from "react";
import styles from './styles.module.scss';
import { STATUS_CODE } from "../../utils/common";
import { apiListVideos } from "../../services/video";
import YoutubeEmbed from "../youtubeEmbed";

function ListVideo() {
    const [videos, setVideos] = useState([])
    useEffect(() => {
        getVideos()
    }, [])

    const getVideos = async () => {
        const result = await apiListVideos()
        if (result.status_code === STATUS_CODE.OK)
            setVideos(result.videos)
    }

    const getEmbedId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11,11}).*/;
        const match = url?.match(regExp);
        if (match) if (match.length >= 2) return match[2];
    }

    const renderItem = (video) => {
        return (
            <div key={video.id} className={styles.video__wrapper}>
                {getEmbedId(video.url) &&
                    <YoutubeEmbed embedId={getEmbedId(video.url)} />
                }
                <div className={styles.video__metadata}>
                    <p>{video.title}</p>
                    <p>Shared by: {video.shareby}</p>
                    <p>Description: {video.description}</p>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.header__wrapper}>
            <div className={styles.flex}>
                {videos.map((video) => renderItem(video))}
            </div>
        </div >
    );
}

export default ListVideo;
