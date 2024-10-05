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
    }
};

export default nextConfig;
