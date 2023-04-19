import React, { useState, useEffect } from "react";
import styles from './styles.module.scss';
import { STATUS_CODE } from "../../utils/common";
import { apiListVideos } from "../../services/video";
import YoutubeEmbed from "../youtubeEmbed";
import { getEmbedId } from "../../helpers/common";

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

    const renderItem = (video) => {
        return (
            <div key={video.id} className={styles.video__wrapper}>
                <div className={styles.video__player}>
                    {getEmbedId(video.url) &&
                        <YoutubeEmbed embedId={getEmbedId(video.url)} />
                    }
                </div>
                <div className={styles.video__metadata}>
                    <p className={styles.video__title}>{video.title}</p>
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
