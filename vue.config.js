module.exports = {
    //axios域代理，解决axios跨域问题
    //http://58.54.251.155:8088/wzzgh-fwdt/committeeImp/getCommitteeList?pageIndex=1&pageSize=20
    devServer: {
        open: true,
        port: 8088,
        proxy: {
            '': {
                target: 'http://58.54.251.155:8088/wzzgh-fwdt/committeeImp',
                changeOrigin: true,
                ws: true,
                // secure: false,
                pathRewrite: {

                }
            }
        }
    }
}
