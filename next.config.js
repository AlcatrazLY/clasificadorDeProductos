/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        dbConfig: {
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            password:process.env.DB_PASSWORD, // @@@
            database: 'clasificadorBD'
        }
    },
    
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
        ? `http://${process.env.API_DEV}/api` // development api
        : `https://${process.env.API_PROD}/api` // production api
    },
    env:{
        API_URL: process.env.API_URL
    }
}

module.exports = nextConfig