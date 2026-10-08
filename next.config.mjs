import { withPayload } from '@payloadcms/next/withPayload'
export default withPayload({
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/:path*.html', destination: '/:path*', permanent: true },
    ]
  },
})
