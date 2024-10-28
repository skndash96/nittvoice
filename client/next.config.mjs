/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "splzphgsehoenfaaudid.supabase.co",
                pathname: "**"
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
                port: '',
            }
        ]
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:5000/api/v1/:path*'
            }
        ];
    }
};

export default nextConfig;
