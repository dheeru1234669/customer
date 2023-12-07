module.exports = {
  reactStrictMode: false,
    images: {
      domains: ['rms.softreader.in'],
    },
    publicRuntimeConfig: {
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://rms.softreader.in:5000/api',
    },
}
