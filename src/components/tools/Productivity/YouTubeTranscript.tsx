import React, { useState } from 'react';

const YouTubeTranscript: React.FC = () => {
  const [url, setUrl] = useState('');
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const fetchTranscript = async () => {
    setError('');
    setTranscript('');
    setLoading(true);

    try {
      const videoId = extractVideoId(url);
      if (!videoId) {
        throw new Error('Invalid YouTube URL');
      }

      const response = await fetch(
        `https://corsproxy.io/?${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}`
      );

      if (!response.ok) throw new Error('Failed to fetch video');

      const html = await response.text();
      const captionsMatch = html.match(/"captions":\s*({[^}]+captionTracks[^}]+})/);
      
      if (!captionsMatch) throw new Error('No captions available');

      const captionsData = JSON.parse(captionsMatch[1]);
      const captionUrl = captionsData.playerCaptionsTracklistRenderer?.captionTracks?.[0]?.baseUrl;
      
      if (!captionUrl) throw new Error('No caption URL found');

      const transcriptResponse = await fetch(`https://corsproxy.io/?${encodeURIComponent(captionUrl)}`);
      const transcriptXml = await transcriptResponse.text();
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(transcriptXml, 'text/xml');
      const textElements = xmlDoc.getElementsByTagName('text');

      let fullTranscript = '';
      for (let i = 0; i < textElements.length; i++) {
        const text = textElements[i].textContent || '';
        fullTranscript += text.replace(/&amp;/g, '&').replace(/&#39;/g, "'") + '\n';
      }

      setTranscript(fullTranscript.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcript);
  };

  const downloadTranscript = () => {
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'youtube-transcript.txt';
    a.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">YouTube URL</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button
            onClick={fetchTranscript}
            disabled={loading || !url}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Loading...' : 'Get Transcript'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {transcript && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold">Transcript</label>
            <div className="flex gap-2">
              <button onClick={copyToClipboard} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Copy
              </button>
              <button onClick={downloadTranscript} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Download
              </button>
            </div>
          </div>
          <textarea
            value={transcript}
            readOnly
            className="w-full px-4 py-3 border rounded-lg bg-gray-50 font-mono text-sm"
            rows={15}
          />
        </div>
      )}
    </div>
  );
};

export default YouTubeTranscript;
