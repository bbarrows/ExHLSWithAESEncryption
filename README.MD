TO USE:

Build ffmpeg with everything you need and download Apple's live streaming tools.

Run ./stream.sh to start "live streaming" from whatever you symlink video.mk as. I just used a video as input because I don't have a live stream source to use.

Run: 
node index.js

Goto localhost:3000

to login goto:
localhost:3000/login

to logout goto 
localhost:3000/logout

After logging in or out go back to 
localhost:3000 to see if the stream works.


NETFLIX USES AES TOO?
http://techblog.netflix.com/2013/04/html5-video-at-netflix.html

It sounds like they have their own 

Sounds like AES might be the best option (VS some new standard with PGP or something). You'd have to have a key for each user inserted into the m3u8 or something like that which would be probably not scale. 

There will always be the "analog hole":

The analog hole (also known as the analog loophole) is a fundamental and inevitable vulnerability in copy protection schemes for noninteractive works in digital formats which can be exploited to duplicate copy-protected works that are ultimately reproduced using analog means.

https://en.wikipedia.org/wiki/Analog_hole


Options:
1. Encrypt streams (HLS + AES) Supported by Android/iOS/Desktop
2. One encrypted stream for users, one possibly also encrypted stream with adds
   inserted into stream with ffmpeg before streaming to CDN
3. Minify/Obfuscate JS
4. Different API/results for subscription users
5. Worst case scenario - use some proprietary DRM solution over DASH



RANDOM NOTES:

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


