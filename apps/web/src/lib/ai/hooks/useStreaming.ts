import { useState, useCallback } from 'react';

export function useStreaming() {
  const [streamContent, setStreamContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const startStream = useCallback(() => {
    setIsStreaming(true);
    setStreamContent('');
  }, []);

  const updateStream = useCallback((content: string) => {
    setStreamContent(content);
  }, []);

  const stopStream = useCallback(() => {
    setIsStreaming(false);
  }, []);

  return {
    streamContent,
    isStreaming,
    startStream,
    updateStream,
    stopStream,
  };
}
