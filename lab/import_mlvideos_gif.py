#导入mlvideos的gif

from pymongo import MongoClient
from bson import ObjectId
import datetime,os

host = '0.0.0.0'  
client = MongoClient(host, 27017) 
db = client['ai-mix']
mlvideos = db.mlvideos

path='public/files/mlvideos'
file_names = os.listdir(path)
for file_name in file_names:
    #print(file_name)

    if file_name.count("_148.gif")>0:
        vid=file_name.replace("_148.gif","")
        
        v=mlvideos.find_one({"vid":vid})
        if v:
            v["imgUrl"]={
                    "id":v["_id"],
                    "filename":file_name,
                    "originalFilename":file_name,
                    "mimetype":'image/gif',
                    'encoding': '7bit',
                    '_meta': None
                }
            mlvideos.update({"vid":vid}, v)
        else:
            print("数据库不存在:",file_name) 
print("完成")