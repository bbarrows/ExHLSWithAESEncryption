Installing ffmpeg:

brew install ffmpeg --with-fdk-aac --with-ffplay --with-freetype --with-libass --with-libquvi --with-libvorbis --with-libvpx --with-opus --with-x265 --with-libx264

ex vid is h264 in mpeg4 AVC - audio is AC3 (aka a52)

Examples for streaming:

https://github.com/NapoleonWils0n/cerberus/blob/9c9a2e2372a883cb657db93a1a2a08c4ac7446ca/ffmpeg/mediastreamsegmenter%201080p.sh
https://raw.githubusercontent.com/AndreaZirn/IP-5_AppleTV/da24eeebd0f0edebd37b13902deb1bef97cc840b/Server/Shell_Scripts/livestream.sh

Encryption
http://stackoverflow.com/questions/8989061/how-do-i-get-mediafilesegmenter-to-generate-encrypt-keys-so-that-i-can-serve-the



Serve static files without lib:


http://stackoverflow.com/questions/24024566/display-a-static-html-file-with-koa-js



For the streamer use:
-key-rotation-period=10 or something

ffmpeg -re -v 0 -i $input -vcodec copy -vbsf:v h264_mp4toannexb -acodec copy -f mpgets - | mediastreamsegmenter -f $output

mediafilesegmenter Your/File/Location.mov -t 17 -f Your/File/Destination.m3u8

mediafilesegmenter -I -t 9 -f secure/ -k secure/protected/ -encrypt-key-url https://localhost:7070/secure/protected secure/640x360_1240.mov




 mediafilesegmenter -I -t 9 -f ./ -k ./ -encrypt-key-url https://localhost:7070/video.mkv
    
mediafilesegmenter -I -t 9 -f ./ -k ./ -encrypt-key-url video.mkv
    
     mediafilesegmenter -I -t 9 -encrypt-key-url http://localhost:3000/video.mkv
     
     ffmpeg -i  video.mkv -vcodec libx264 -vbsf h264_mp4toannexb -acodec libmp3lame  -f mpgets - | mediastreamsegmenter -f ~/repos/aesstreaming/
    
    
WORKING WIHTOUT ENCRYPTION:
    
    ffmpeg -i video.mkv -acodec libmp3lame -ac 2 -ar 48000 -ab 160k -vcodec libx264 -vbsf h264_mp4toannexb -f mpegts - | mediastreamsegmenter -f ~/repos/aesstreaming/parts/ -t 5  -i prog_index.m3u8 
    

    
    
ffmpeg -i video.mkv -acodec libmp3lame -ac 2 -ar 48000 -ab 160k -vcodec libx264 -vbsf h264_mp4toannexb -f mpegts - | mediastreamsegmenter -f ~/repos/aesstreaming/parts/ -t 5  -i prog_index.m3u8 -key-rotation-period=5  -k /Users/bbarrows/repos/aesstreaming/parts/
    
    Audio codec? libvo_aacenc
    http://stackoverflow.com/questions/19782389/playing-m3u8-files-with-html-video-tag
    
    
cmp -l /Users/bbarrows/Downloads/fileSequence0.ts parts/fileSequence0.ts | gawk '{printf "%08X %02X %02X\n", $1, strtonum(0$2), strtonum(0$3)}'    
    
    
    -i  for file name of m3u8


