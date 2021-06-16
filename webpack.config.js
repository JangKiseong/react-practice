const path = require('path')                                        // core nodejs 모듈 중 하나, 파일 경로 설정할 때 사용
const HtmlWebpackPlugin = require('html-webpack-plugin')            // index.html 파일을 dist 폴더에 index_bundle.js 파일과 함께 자동으로 생성
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')      // 성공적으로 재빌드 한 후 사용하지 않는 output.path 디렉토리에 있는 모든 파일 및 webpack assets을 제거해주는 Plugin
const dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',                                      
    entry: './src/index.js',                            // 웹 자원을 변환하기 위해 필요한 최초 진입점 이자 .js 경로
    output: {                                           // bundled compiled 파일, 하나로 묶은 결과물을 반환할 위치 및 파일 이름
        path: path.join(__dirname, '/server/public'),            // __dirname : 현재 디렉토리, dist 폴더에 모든 컴파일된 하나의 번들파일을 넣을 예정
        filename: 'index_bundle.js',
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
            },  {
                test: /\.(png|jpe?g|gif|woff|woff2|ttf|svg|ico)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },  {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {                                        // 개발 서버 설정하기
        historyApiFallback: true,                       // '/'경로 이외의 Router에 설정해준 경로를 접근 할 수 있도록 해줌
        inline: true,
        port: 3131,
        hot: true,
        publicPath: '/server/public/',
        contentBase: path.join(__dirname, '/server/public'),
        host: 'localhost',
        open: true,
        proxy: {
            '/api': {                                   // URL 안에 /api가 들어가면 서버로 proxy요청을 보내도록 하는 설정
                target: "https://kshrimp.kro.kr/api",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                }
            }
        }
    },

    plugins: [                                          // webpack의 기본적인 동작 외 추가적인 기능을 제공하는 속성
        new HtmlWebpackPlugin({
            title: 'kshrimp',                           // title tag
            filename: 'index.html',                     // output file name
            template: './src/index.html',               // 생성한 템플릿 파일
            inject: 'head',                             // script 위치 결정
            scriptLoading: 'defer',
            base: 'https://kshrimp.kro.kr',                     
            minify: true,                               // minify 유무
            hash: true,                                 // scripts, css 파일 hash 컴파일링 옵션 (브라우저 캐싱 방지로 사용)
            cache: true,                                // 캐싱을 통해 변경된 파일만 emit
            showErrors: true                            // 에러 발생 시 html 파일에 detail이 표기됨
        }),
        new dotenv()
    ]

    // loader : webpack은 기본적으로 자바스크립트와 JSON만 빌드 할 수 있다. 다른 자원(html, css, img)를 빌드할 수 있도록 도와주는 속성
}

// refernce : https://velog.io/@pop8682/%EB%B2%88%EC%97%AD-React-webpack-%EC%84%A4%EC%A0%95-%EC%B2%98%EC%9D%8C%EB%B6%80%ED%84%B0-%ED%95%B4%EB%B3%B4%EA%B8%B0,
//            https://berkbach.com/%EC%9B%B9%ED%8C%A9-webpack-%EA%B3%BC-%EB%B0%94%EB%B2%A8-babel-%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-react-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0-fb87d0027766
//            https://velog.io/@ckdgus2246/webpack-%EA%B8%B0%EC%B4%88%EA%B0%9C%EB%85%90-%EA%B8%B0%EB%B3%B8-%EC%84%A4%EC%A0%95