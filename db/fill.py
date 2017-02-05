from pymongo import MongoClient
from pathlib import Path
import json

client = MongoClient()
db = client.app

db.posts.drop()

for f in Path('posts').iterdir():
    if f.is_dir() or f.suffix==".json":
        continue
    metadata = json.loads((f.parent / (f.stem+".json")).open().read())
    _id = int(f.stem)
    content = f.open().read()
    row = {
        "_id": _id,
        "format": f.suffix,
        "content": content
    }
    row.update(metadata)
    db.posts.insert_one(row)
    print(db.posts.find_one({"_id": _id}))
