import { DeepLinkHandler } from '../types';

export const githubHandler: DeepLinkHandler = {
  match: (url) =>
    url.match(/github\.com\/([^\/\?#]+)(?:\/([^\/\?#]+)(?:\/([^\/\?#]+)\/([^\?#]+))?)?/),

  build: (webUrl, match) => {
    const [owner, repo, type, remainder] = match;

    const subRoutes: Record<string, { ios: string; android: string }> = {
      pull: { ios: 'pull', android: 'pull' },
      blob: { ios: 'blob', android: 'blob' },
      issues: { ios: 'issue', android: 'issues' },
    };

    if (repo && type && remainder && subRoutes[type]) {
      const route = subRoutes[type];
      return {
        webUrl,
        ios: `github://repo/${owner}/${repo}/${route.ios}/${remainder}`,
        android: `intent://github.com/${owner}/${repo}/${route.android}/${remainder}#Intent;scheme=https;package=com.github.android;end`,
        platform: 'github',
      };
    }

    if (repo) {
      return {
        webUrl,
        ios: `github://repo/${owner}/${repo}`,
        android: `intent://github.com/${owner}/${repo}#Intent;scheme=https;package=com.github.android;end`,
        platform: 'github',
      };
    }

    return {
      webUrl,
      ios: `github://user/${owner}`,
      android: `intent://github.com/${owner}#Intent;scheme=https;package=com.github.android;end`,
      platform: 'github',
    };
  },
};
