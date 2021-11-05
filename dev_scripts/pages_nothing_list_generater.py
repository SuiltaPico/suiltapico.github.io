import os
import functools
import json
os.chdir("pages/nothing")

print("pages\\nothing\\list.json 生成工具")

resultList = list(
    filter(lambda x: (x != "index.html" and x != "list.json" and os.path.isfile(x)), os.listdir("./")))

print("检测到", len(resultList), "个目标文件.")

with open("list.json", "w") as f:
    json.dump(resultList, f)

print("文件生成完成。生成结果路径：",os.getcwd()+"\\list.json")