module.exports = {
  expo: {
    owner: 'freelunchmedia',
    name: 'FreeLunch',
    slug: 'FreeLunch',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/logo_mono_white_graphic.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/logo_mono_white_graphic.png',
      resizeMode: 'contain',
      backgroundColor: '#312e81',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.arielkark.FreeLunch',
      infoPlist: {
        UIBackgroundModes: ['audio'],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#312e81',
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
            authToken: process.env.SENTRY_AUTH_TOKEN,
          },
        },
      ],
    },
  },
}
