import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    productionBrowserSourceMaps: true // 开发环境默认启用，生产环境可手动开启
};

export default nextConfig;
