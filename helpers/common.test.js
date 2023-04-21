import { getEmbedId } from './common';

describe("get embedId from youtube URL", () => {
    it("should return the correct youtube id when given a standard youtube url", () => {
        expect(getEmbedId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toEqual("dQw4w9WgXcQ");
    });

    it("should return the correct youtube id when given a shortened youtube url", () => {
        expect(getEmbedId("https://youtu.be/dQw4w9WgXcQ")).toEqual("dQw4w9WgXcQ");
    })
})  