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
            <div key={video.id} className={styles.video__wrapper} data-test="videos__item" data-testid="videos__item">
                <div className={styles.video__player}>
                    {getEmbedId(video.url) &&
                        <YoutubeEmbed embedId={getEmbedId(video.url)} />
                    }
                </div>
                <div className={styles.video__metadata} data-test="video__metadata" data-testid="video__metadata">
                    <p className={styles.video__title} data-test="video__title" data-testid="video__title">{video.title}</p>
                    <p data-test="video__shareby" data-testid="video__shareby">Shared by: {video.shareby}</p>
                    <p data-test="video__description" data-testid="video__description">Description: {video.description}</p>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.header__wrapper}>
            <div className={styles.flex} data-test="videos__list" data-testid="videos__list">
                {videos.map((video) => renderItem(video))}
            </div>
        </div >
    );
}

export default ListVideo;
