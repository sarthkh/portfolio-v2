/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://sarthkh.vercel.app',
    generateRobotsTxt: true,
    exclude: ['/icon.svg', '/apple-touch-icon.png', '/site.webmanifest', '/404'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            }
        ]
    },
    changefreq: 'monthly',
    priority: 0.7,
};
