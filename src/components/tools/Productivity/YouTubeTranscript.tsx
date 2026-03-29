import React, { useState } from 'react';

const YouTubeTranscript: React.FC = () => {
  const [url, setUrl] = useState('');
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

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
        throw new Error('Invalid YouTube URL. Please paste a valid YouTube video link.');
      }

      const response = await fetch(
        `https://corsproxy.io/?${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch video data. The video may be private or unavailable.');
      }

      const html = await response.text();
      
      const captionsMatch = html.match(/"captions":\s*({[^}]+captionTracks[^}]+})/);
      if (!captionsMatch) {
        throw new Error('No captions available for this video. The video may not have subtitles.');
      }

      const captionsData = JSON.parse(captionsMatch[1]);
      const captionTracks = captionsData.playerCaptionsTracklistRenderer?.captionTracks;
      
      if (!captionTracks || captionTracks.length === 0) {
        throw new Error('No caption tracks found for this video.');
      }

      const captionUrl = captionTracks[0].baseUrl;
      
      const transcriptResponse = await fetch(
        `https://corsproxy.io/?${encodeURIComponent(captionUrl)}`
      );

      if (!transcriptResponse.ok) {
        throw new Error('Failed to fetch transcript data.');
      }

      const transcriptXml = await transcriptResponse.text();
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(transcriptXml, 'text/xml');
      const textElements = xmlDoc.getElementsByTagName('text');

      let fullTranscript = '';
      for (let i = 0; i < textElements.length; i++) {
        const element = textElements[i];
        const text = element.textContent || '';
        
        const decodedText = text
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/\n/g, ' ')
          .trim();

        if (decodedText) {
          fullTranscript += decodedText + ' ';
        }
      }

      if (!fullTranscript) {
        throw new Error('Transcript is empty or could not be parsed.');
      }

      setTranscript(fullTranscript.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      fetchTranscript();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(transcript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadTranscript = () => {
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'youtube-transcript.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
        <h2 className="font-display font-semibold text-xl text-dark-900 mb-2">
          🎬 YouTube Transcript Generator
        </h2>
        <p className="text-dark-600">
          Extract transcripts from YouTube videos instantly. Works with videos that have captions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-dark-700">
            YouTube URL
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {loading ? 'Loading...' : 'Get Transcript'}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-semibold">❌ Error</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      )}

      {transcript && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold text-dark-700">
              Transcript
            </label>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm flex items-center gap-2"
              >
                <span>{copied ? '✓' : '📋'}</span>
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={downloadTranscript}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold text-sm flex items-center gap-2"
              >
                <span>⬇️</span>
                Download
              </button>
            </div>
          </div>
          <textarea
            value={transcript}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
            rows={20}
            style={{ resize: 'vertical' }}
          />
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm">
              ✅ Successfully extracted transcript ({transcript.split(' ').filter(w => w.length > 0).length} words)
            </p>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="font-display font-semibold text-lg text-dark-900 mb-3">
          💡 How to Use
        </h3>
        <ul className="space-y-2 text-dark-700 text-sm">
          <li className="flex items-start">
            <span className="mr-2">1.</span>
            <span>Paste a YouTube video URL (e.g., https://youtube.com/watch?v=abc123)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">2.</span>
            <span>Click "Get Transcript" to extract captions</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">3.</span>
            <span>Copy the transcript or download it as a .txt file</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">4.</span>
            <span>Note: Only works with videos that have captions/subtitles enabled</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default YouTubeTranscript;
