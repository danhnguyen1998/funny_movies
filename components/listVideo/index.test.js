import React from 'react';
import { render, screen } from '@testing-library/react';
import ListVideo from './index';
import '@testing-library/jest-dom'

jest.mock('../../services/video', () => ({
    apiListVideos: jest.fn(() => Promise.resolve({
        status_code: 200,
        videos: [
            {
                id: 1,
                title: 'Video 1',
                shareby: 'John Doe',
                description: 'Description of video 1',
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            },
            {
                id: 2,
                title: 'Video 2',
                shareby: 'Jane Doe',
                description: 'Description of video 2',
                url: 'https://www.youtube.com/watch?v=oHg5SJYRHA0'
            }
        ]
    }))
}));

describe('ListVideo component', () => {
    beforeEach(() => {
        render(<ListVideo />);
    });

    test('should render video items', async () => {
        const videoItems = await screen.findAllByTestId('videos__item');
        expect(videoItems).toHaveLength(2);
    });

    test('should render video metadata', async () => {
        const videoTitles = await screen.findAllByTestId('video__title');
        const videoShareBys = await screen.findAllByTestId('video__shareby');
        const videoDescriptions = await screen.findAllByTestId('video__description');
        expect(videoTitles[0]).toHaveTextContent('Video 1');
        expect(videoShareBys[0]).toHaveTextContent('Shared by: John Doe');
        expect(videoDescriptions[0]).toHaveTextContent('Description: Description of video 1');
        expect(videoTitles[1]).toHaveTextContent('Video 2');
        expect(videoShareBys[1]).toHaveTextContent('Shared by: Jane Doe');
        expect(videoDescriptions[1]).toHaveTextContent('Description: Description of video 2');
    });
});
