#!/bin/bash
mkdir -p parts
ffmpeg -i video.mkv -acodec libmp3lame -ac 2 -ar 48000 -ab 160k -vcodec libx264 -vbsf h264_mp4toannexb -f mpegts - | mediastreamsegmenter -f ~/repos/aesstreaming/parts/ -t 5  -i prog_index.m3u8 -key-rotation-period=5  -k /Users/bbarrows/repos/aesstreaming/parts/
