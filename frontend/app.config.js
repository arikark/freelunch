module.exports = {
  expo: {
    owner: 'freelunchmedia',
    name: 'FreeLunch',
    slug: 'FreeLunch',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.arielkark.FreeLunch',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/images/favicon.png',
    },
    extra: {
      eas: {
        projectId: '02910202-cc51-4c4c-b72a-7782ad906a7a',
      },
    },
    plugins: ['sentry-expo'],
    hooks: {
      postPublish: [
        {
          file: 'sentry-expo/upload-sourcemaps',
          config: {
            organization: 'freelunchmedia',
            project: 'mobile',
            authToken:
              'bc2db121964c401bacfe31dd88f756252c07349d11d74a86ace9576f3f8850e4',
          },
        },
      ],
    },
  },
}
