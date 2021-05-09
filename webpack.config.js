// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = (argv) => {
    const isDev = argv.mode === 'development';
    return {
        // セキュリティ対策として 'electron-renderer' ターゲットは使用しない
        target: 'web',
        // 起点となるファイル
        entry: './src/index.tsx',
        // webpack watch したときに差分ビルドができる
        cache: true,
        // development は、 source map file を作成、再ビルド時間の短縮などの設定となる
        // production は、コードの圧縮やモジュールの最適化が行われる設定となる
        mode: isDev ? 'development' : 'production',
        // ソースマップのタイプ。 inline-source-mapでないとevalErrorがでるらしい
        devtool: isDev ? 'inline-source-map': false,
        // 出力先設定 __dirname は node でのカレントディレクトリのパスが格納される変数
        output: {
            path: path.join(__dirname, 'build'),
            filename: 'bundle.js',
        },
        // ファイルタイプ毎の処理を記述する
        module: {
            rules: [
                {
                    // コンパイルの事前に eslint による
                    // 拡張子 .ts または .tsx の場合
                    test: /\.tsx?$/,
                    // 事前処理であることを示す
                    enforce: 'pre',
                    // TypeScript をコードチェックする
                    loader: 'eslint-loader',
                },
                {
                    // 正規表現で指定する
                    // 拡張子 .ts または .tsx の場合
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    // ローダーの指定
                    // TypeScript をコンパイルする
                    use: 'ts-loader',
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: { sourceMap: isDev },
                        },
                        'sass-loader',
                    ]
                }
            ],
        },
        // 処理対象のファイルを記載する
        resolve: {
            extensions: [
                '.ts',
                '.tsx',
                '.js', // node_modulesのライブラリ読み込みに必要
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './public/index.html',
                minify: !isDev,
                inject: 'body',
                scriptLoading: 'blocking',
            }),
            new MiniCssExtractPlugin(),
        ],
    }
};

// modeによって設定を切り替える 
module.exports = (env, argv) => {

    const conf = config(argv);
    console.log(conf)
    return conf;
} 
