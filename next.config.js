/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removing "output: 'export'" since NextAuth requires dynamic API routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    // Only required with 'output: export', but removed that option
    // Keeping it with a different configuration
    domains: ['localhost', 'placehold.co', 'warmhearted-quail-985.convex.cloud'],
  },
};

module.exports = nextConfig;