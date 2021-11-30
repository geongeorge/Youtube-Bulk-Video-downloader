var fs = require('fs')
const ytdl = require('ytdl-core');
const chalk = require('chalk');
const sanitize = require("sanitize-filename");
var MultiProgress = require('multi-progress');

videos = require('./vids')

const videosDir = "./videos/"

var multiBar = new MultiProgress()

console.log(chalk.white.bgRed.bold('Multi video downloader'))

if(videos.list.length === 0) {
    chalk.Red.bold('Video list empty')
    process.exit()
}

let downloadProgress = multiBar.newBar(
    ":total Videos [:bar] :percent",{
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: videos.list.length,
    }
)
 
function downloadVideo(url, resolve = () => {}) {
    // DOCS: https://www.npmjs.com/package/ytdl-core#ytdlchooseformatformats-options
    const name_max_length = 20;
    let currentVid = ytdl(url, {
        quality: "highest",
        filter: (format) => format.container === 'mp4'
    })

    ytdl.getInfo(url).then((vidInfo)=> {
        let vidProgressBar = undefined;
        let chunkLength = 0;
        let filename = sanitize(vidInfo.videoDetails.title)
                        .replace(/\s\s+/g, " ")
                        .replace(/\s/g, "-")
                        +".mp4";
        currentVid.pipe(fs.createWriteStream(videosDir+filename))

        currentVid.on("progress",function(_chunkLength,chunksDownloaded, totalChunks){
            if(vidProgressBar== undefined) {
                vidProgressBar = multiBar.newBar(
                    `${filename.slice(0,name_max_length)} [:bar] :rate/bps :percent :etas`, 
                    { 
                        complete: '=',
                        incomplete: ' ',
                        width: 20,
                        total: totalChunks,
                    }
                );
            }
            
            vidProgressBar.tick(chunksDownloaded - chunkLength)
            chunkLength = chunksDownloaded;
            if(chunkLength == totalChunks){
                downloadProgress.tick();
                resolve();
            }
        })
    })
}

downloadProgress.tick(0);
videos.list.forEach(async (url) => {
    await new Promise(
        (resolve, _reject) => {
            downloadVideo(url, resolve)
        }
    )
});