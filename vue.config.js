
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    outputDir: 'dist',
    //axios域代理，解决axios跨域问题
    //http://58.54.251.155:8088/wzzgh-fwdt/committeeImp/getCommitteeList?pageIndex=1&pageSize=20
    /*192.168.77.220:8081*/
    devServer: {
        open: true,
        port: 8088,
        proxy: {
            '/api': {
                target: 'http://58.54.251.155:8088',
                changeOrigin: true,
                // ws: true,
                // secure: false,
                pathRewrite: {
                    '^/api': '/wzzgh-fwdt/committeeImp'
                }
            }
        }
    },
}
