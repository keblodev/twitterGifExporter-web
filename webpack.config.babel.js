import webpack                      from 'webpack';
import ExtractTextPlugin            from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin            from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin   from 'script-ext-html-webpack-plugin';
import autoprefixer                 from 'autoprefixer';
import CopyWebpackPlugin            from 'copy-webpack-plugin';
import OfflinePlugin                from 'offline-plugin';
import path                         from 'path';
import CleanPlugin                  from 'clean-webpack-plugin';
import ProgressBarPlugin            from 'progress-bar-webpack-plugin';
import { BundleAnalyzerPlugin }     from 'webpack-bundle-analyzer';
import Dotenv                       from 'dotenv-webpack';
import MiniCssExtractPlugin         from 'mini-css-extract-plugin';
import UglifyJsPlugin               from 'uglifyjs-webpack-plugin';
import RobotstxtPlugin              from 'robotstxt-webpack-plugin';

const ENV = process.env.NODE_ENV || "development";

const GEN_ANALITICS = process.env.GEN_ANALITICS;

const CSS_MAPS = ENV!=='production';

// TODO:
// 1. preload/prefetch is not working with webpack
// 2. preload js
// 3. preload css

// the path(s) that should be cleaned
const pathsToClean = [
    'build'
];

// the clean options to use
const cleanOptions = {
    root:     __dirname,
    verbose:  true,
    dry:      false
};


module.exports = {
    context: path.resolve(__dirname, "src"),

    entry: 	{
        app: path.resolve(__dirname, './src/index.js'),
        // app: [],
        vendors: [
            'react',
            'react-redux',
            // 'babel-polyfill',
        ]
    },

    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: '/',
        filename: '[name].' + (ENV === 'production' ? '[chunkhash]' : '[hash]') + '.js',
        chunkFilename: '[name]-[chunkhash].js',
    },

    performance: {
        hints: (ENV === 'production' ? false : "warning")
    },

    resolve: {
        extensions: ['.jsx', '.js', '.json', '.less'],
        modules: [
            path.resolve(__dirname, "src/style/vendor"),
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "node_modules"),
            'node_modules'
        ],
        alias: {
            components: path.resolve(__dirname, "src/components"),    // used for tests
            src: path.resolve(__dirname, "src"),
            style: path.resolve(__dirname, "src/style"),
            common: path.resolve(__dirname, "src/common"),
        }
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor_rest: {
                    test: (module, count) => {
                        var context = module.context;
                        return context && context.indexOf('node_modules') >= 0;
                    },
                    name: 'vendor_rest',
                    chunks: "all",
                    enforce: true
                }
            }
        },
        minimizer: ENV==='production' ? [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new UglifyJsPlugin({
              cache: true,
              parallel: true,
              uglifyOptions: {
                compress: {
                    unsafe_comps: true,
                    properties: true,
                    keep_fargs: false,
                    pure_getters: true,
                    collapse_vars: true,
                    warnings: false,
                    sequences: true,
                    dead_code: true,
                    drop_debugger: true,
                    comparisons: true,
                    conditionals: true,
                    evaluate: true,
                    booleans: true,
                    loops: true,
                    unused: true,
                    hoist_funs: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true
                },
                output: {
                    comments: false
                },
              },
            }),
            new RobotstxtPlugin({
              policy: [
                {
                  userAgent: "Googlebot",
                  allow: "/",
                  // disallow: "/search",
                  crawlDelay: 2
                },
                {
                  userAgent: "OtherBot",
                  allow: "/", //["/allow-for-all-bots", "/allow-only-for-other-bot"],
                  // disallow: ["/admin", "/login"],
                  crawlDelay: 2
                },
                {
                  userAgent: "*",
                  allow: "/",
                  // disallow: "/search",
                  crawlDelay: 10,
                  cleanParam: "ref /articles/"
                }
              ],
              // TODO: sitemap: "http://example.com/sitemap.xml",
              host: process.env.BASE_URL
            })
        ]: []
    },

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: path.resolve(__dirname, 'src'),
				enforce: 'pre',
				use: 'source-map-loader'
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				// Transform our own .(less|css) files with PostCSS and CSS-modules
				test: /\.(less|css)$/,
				include: [path.resolve(__dirname, 'src/components')],
                use: [
                    ENV==='production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: CSS_MAPS,
                            modules: true,
                            importLoaders: 1,
                            // minimize: {
                            //   reduceInitial: false
                            // }
                        }
                    },
                    {
                        loader: `postcss-loader`,
                        options: {
                            sourceMap: CSS_MAPS,
                            config: {
                              path: 'postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: { javascriptEnabled: true, sourceMap: CSS_MAPS }
                    }
                ]
			},
			{
				test: /\.(less|css)$/,
        exclude: [path.resolve(__dirname, 'src/components')],
        use: [
            ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    sourceMap: CSS_MAPS,
                    importLoaders: 1,
                  }
            },
            {
                loader: `postcss-loader`,
                options: {
                    sourceMap: CSS_MAPS,
                    config: {
                      path: 'postcss.config.js'
                    }
                }
            },
            {
                loader: 'less-loader',
                options: { javascriptEnabled: true, sourceMap: CSS_MAPS }
            }
        ]
      },
			{
                type: 'javascript/auto',
				test: /\.json$/,
				use: 'json-loader'
			},
			{
				test: /\.(xml|html|txt|md)$/,
				use: 'raw-loader'
			},
			{
				test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
				use: ENV==='production' ? 'file-loader' : 'url-loader'
			}
		]
	},
	plugins: ([
        new Dotenv({
            path: './.env',
        }),
        new ProgressBarPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NormalModuleReplacementPlugin(/(.*)-ENV_TARGET(\.*)/, function(resource) {
            resource.request = resource.request.replace(/-ENV_TARGET/, `-${ENV}`);
        }),

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
          }),

        new webpack.DefinePlugin({
            'process.env' : {
                NODE_ENV:                   JSON.stringify(ENV),
                GOOGLE_ANALYTICS_ID:        JSON.stringify(process.env.GOOGLE_ANALYTICS_ID),
                APP_ENV:                    JSON.stringify(process.env.APP_ENV),
                LOCAL_STORAGE_KEY:          JSON.stringify(process.env.LOCAL_STORAGE_KEY),
                APP_VERSION:                JSON.stringify(process.env.APP_VERSION),
                BASE_URL:                   JSON.stringify(process.env.BASE_URL),
            }
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/index.ejs',
            minify: {
                collapseWhitespace: true,
                removeComments:     true
            },
            favicon: './favicon.ico',
        }),
        new CopyWebpackPlugin([
            { from: './manifest.json', to: './' },
            { from: './favicon.ico', to: './' },
            { from: './assets/icons', to: './' },
        ]),

    ]).concat(ENV==='production' ? [
        new CleanPlugin(pathsToClean, cleanOptions),

        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'async'
        }),

        // This plugin looks for similar chunks and files
        // and merges them for better caching by the user
		new webpack.optimize.OccurrenceOrderPlugin(),

        // new webpack.optimize.MinChunkSizePlugin({
        //     //uncomment once we'll have to many requests on start
        //     // minChunkSize: 51200, // ~50kb
        // }),

    new OfflinePlugin({
      relativePaths: false,
      AppCache: false,
      excludes: ['_redirects'],
      ServiceWorker: {
          events: true,
          minify: false,
      },
      cacheMaps: [
        {
          match: /.*/,
          to: '/',
          requestTypes: ['navigate']
        }
      ],
      publicPath: '/'
        })
    ] : []
    ).concat(GEN_ANALITICS ? [
		new BundleAnalyzerPlugin({
            // Can be `server`, `static` or `disabled`.
            // In `server` mode analyzer will start HTTP server to show bundle report.
            // In `static` mode single HTML file with bundle report will be generated.
            // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
            analyzerMode: 'static',
            // Host that will be used in `server` mode to start HTTP server.
            analyzerHost: 'localhost',
            // Port that will be used in `server` mode to start HTTP server.
            analyzerPort: 8888,
            // Path to bundle report file that will be generated in `static` mode.
            // Relative to bundles output directory.
            reportFilename: 'report.html',
            // Module sizes to show in report by default.
            // Should be one of `stat`, `parsed` or `gzip`.
            // See "Definitions" section for more information.
            defaultSizes: 'start',
            // Automatically open report in default browser
            openAnalyzer: true,
            // If `true`, Webpack Stats JSON file will be generated in bundles output directory
            generateStatsFile: false,
            // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
            // Relative to bundles output directory.
            statsFilename: 'stats.json',
            // Options for `stats.toJson()` method.
            // For example you can exclude sources of your modules from stats file with `source: false` option.
            // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
            statsOptions: null,
            // Log level. Can be 'info', 'warn', 'error' or 'silent'.
            logLevel: 'info'
        })
    ]:[]),

    stats: { colors: true },

    node: {
        global: true,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: true,
        setImmediate: false
    },

    devtool: ENV==='production' ? 'source-map' : 'cheap-module-eval-source-map',

    devServer: {
        port: process.env.PORT || 3000,
        host: 'localhost',
        publicPath: '/',
        contentBase: './src',
        historyApiFallback: true,
        open: true,
        openPage: '',
        disableHostCheck: true,
        proxy: {
            // OPTIONAL: proxy configuration:
            // '/optional-prefix/**': { // path pattern to rewrite
            //   target: 'http://target-host.com',
            //   pathRewrite: path => path.replace(/^\/[^\/]+\//, '')   // strip first path segment
            // }
        }
    }
};
