const path = require('path')                                        // core nodejs 모듈 중 하나, 파일 경로 설정할 때 사용
const HtmlWebpackPlugin = require('html-webpack-plugin')            // index.html 파일을 dist 폴더에 index_bundle.js 파일과 함께 자동으로 생성

module.exports = {
    mode: 'development',                                      
    entry: './src/index.js',                            // 웹 자원을 변환하기 위해 필요한 최초 진입점 이자 .js 경로
    output: {                                           // bundled compiled 파일, 하나로 묶은 결과물을 반환할 위치 및 파일 이름
        path: path.join(__dirname, '/dist'),            //__dirname : 현재 디렉토리, dist 폴더에 모든 컴파일된 하나의 번들파일을 넣을 예정
        filename: 'index_bundle.js'
    },
    module: {                                           // javascript 모듈을 생성할 규칙을 지정 (node_module을 제외한.js 파일을 babel-loader로 불러와 모듈을 생성
        rules: [
            {
                test: /\.(js|jsx)$/,                    // .js, .jsx로 끝나는 babel이 컴파일하게 할 모든 파일
                exclude: /node_module/,                 // node module 폴더는 babel 컴파일에서 제외
                use:{
                    loader: 'babel-loader'				// babel loader가 파이프를 통해 js 코드를 불러옴
                }
            },  {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',          // webpack이 html을 읽을 수 있게 해줌
                        options: {
                            minimize: true
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {                                        // 개발 서버 설정하기
        historyApiFallback: true,
        inline: true,
        port: 3130,
        hot: true,
        publicPath: '/',
        contentBase: '/dist',
        host: 'localhost',
        open: true,
        proxy: {
            '/api': {
                target: "http://localhost:3131/api",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                }
            }
        }
    },

    plugins: [                                          // webpack의 기본적인 동작 외 추가적인 기능을 제공하는 속성
        new HtmlWebpackPlugin({
            template: './src/index.html'                // 생성한 템플릿 파일
        })
    ]

    // loader : webpack은 기본적으로 자바스크립트와 JSON만 빌드 할 수 있다. 다른 자원(html, css, img)를 빌드할 수 있도록 도와주는 속성
}

// refernce : https://velog.io/@pop8682/%EB%B2%88%EC%97%AD-React-webpack-%EC%84%A4%EC%A0%95-%EC%B2%98%EC%9D%8C%EB%B6%80%ED%84%B0-%ED%95%B4%EB%B3%B4%EA%B8%B0,
//            https://berkbach.com/%EC%9B%B9%ED%8C%A9-webpack-%EA%B3%BC-%EB%B0%94%EB%B2%A8-babel-%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-react-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0-fb87d0027766