// app/api/thumbnail/route.ts
import { NextResponse } from 'next/server';

interface YouTubeApiResponse {
  items: Array<{
    snippet: {
      thumbnails: {
        default: { url: string };
        medium: { url: string };
        high: { url: string };
      };
    };
  }>;
}

export async function POST(request: Request) {
  try {
    const { videoUrl } = await request.json();

    if (!videoUrl) {
      return NextResponse.json({ error: 'videoUrl is required' }, { status: 400 });
    }

    let videoId: string | null = null;
    try {
      const url = new URL(videoUrl);
      videoId = url.searchParams.get('v');
    } catch (error) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    if (!videoId) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    // Retrieve your API key from environment variables
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
    }

    // Construct the YouTube Data API URL
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
    const apiResponse = await fetch(apiUrl);
    const data: YouTubeApiResponse = await apiResponse.json();

    if (data.items && data.items.length > 0) {
      // Choose the 'high' quality thumbnail (or use default/medium as needed)
      const thumbnailUrl = data.items[0].snippet.thumbnails.high.url;
      return NextResponse.json({ thumbnailUrl });
    } else {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching thumbnail:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
