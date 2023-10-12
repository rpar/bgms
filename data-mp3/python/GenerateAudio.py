from os import listdir
from os.path import isfile, join
import json

mypath = "/Users/ravi/Downloads/youtube_videos/Hariharan_audio"

onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
#print(onlyfiles)

json_data = []

for f in listdir(mypath):
    if f.endswith(".mp3"):
        #print(f)
        videoURL = "/data-mp3/hariharan1/" + f
        newdict = {"name": f, "videoURL":videoURL, "sTime":105, "eTime":115}
        #print(newdict)
        json_data.append(newdict)

print(json.dumps(json_data) )
