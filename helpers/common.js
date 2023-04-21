import React from "react";

export const getEmbedId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11,11}).*/;
    const match = url?.match(regExp);
    if (match) if (match.length >= 2) return match[2];
}

export const Context = React.createContext({
    name: 'Default',
});