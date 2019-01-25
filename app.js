var fs = require('fs')
const ytdl = require('ytdl-core');
const chalk = require('chalk');
const sanitize = require("sanitize-filename");
videos = require('./vids')

const videosDir = "./videos/"

const totalVids = videos.list.length

console.log(chalk.white.bgRed.bold('Multi video downloader'))

if(videos.list.length === 0) {
    chalk.Red.bold('Video list empty')
    process.exit()
}

var videoCounter = 0

// videos.list.forEach(vid => {
//     console.log(vid)
// });

downloadVideo = function(vid) {
    let currentVid = ytdl(vid, { filter: (format) => format.container === 'mp4' })

    ytdl.getInfo(vid).then((vidInfo)=> {

        console.log("Video "+(eval(videoCounter)+eval(1))+"/"+totalVids)
        console.log('\x1b[33m%s\x1b[0m',vidInfo.title)

        let filename = sanitize(vidInfo.title)+".mp4";
        currentVid.pipe(fs.createWriteStream(videosDir+filename))

        currentVid.on("progress",function(chunkSize,chunksDownloaded, totalChunks){
            let percentage =  (chunksDownloaded/totalChunks)*100
            percentage = Math.floor(percentage)
            process.stdout.write('Downloading ' + percentage + '% complete... \r');

            //download completed
            if(percentage>=100 && videoCounter+1<=totalVids){
                videoCounter++
                downloadVideo(videos.list[videoCounter])
            }
        })

    })
}

downloadVideo(videos.list[videoCounter])

  
  
