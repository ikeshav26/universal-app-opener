export interface DeepLinkResult {
  webUrl: string;
  ios: string | null;
  android: string | null;
  platform: 'youtube' | 'linkedin' | 'unknown';
}

export function generateDeepLink(url: string): DeepLinkResult {
  const webUrl = url.trim();
  
  const youtubeWatchMatch = webUrl.match(/youtube\.com\/watch\?v=([^&]+)/);
  const youtubeShortMatch = webUrl.match(/youtu\.be\/([^?]+)/);
  
  if (youtubeWatchMatch || youtubeShortMatch) {
    const videoId = youtubeWatchMatch ? youtubeWatchMatch[1] : youtubeShortMatch![1];
    return {
      webUrl,
      ios: `vnd.youtube://watch?v=${videoId}`,
      android: `intent://watch?v=${videoId}#Intent;scheme=vnd.youtube;package=com.google.android.youtube;end`,
      platform: 'youtube'
    };
  }
  
  const linkedinMatch = webUrl.match(/linkedin\.com\/in\/([^/?]+)/);
  if (linkedinMatch) {
    const profileId = linkedinMatch[1];
    return {
      webUrl,
      ios: `linkedin://in/${profileId}`,
      android: `intent://in/${profileId}#Intent;scheme=linkedin;package=com.linkedin.android;end`,
      platform: 'linkedin'
    };
  }
  
  return {
    webUrl,
    ios: null,
    android: null,
    platform: 'unknown'
  };
}

export function detectOS(): 'ios' | 'android' | 'desktop' {
  if (typeof window === 'undefined') {
    return 'desktop';
  }
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios';
  }
  
  if (/android/.test(userAgent)) {
    return 'android';
  }
  
  return 'desktop';
}

