from pymongo import MongoClient
from pathlib import Path

client = MongoClient()
db = client.app

db.posts.drop()

for f in Path('posts').iterdir():
    if f.is_dir():
        continue
    _id = int(f.stem)
    content = f.open().read()
    db.posts.insert_one({
        "_id": _id,
        "format": f.suffix,
        "content": content
    })
    print(db.posts.find_one({"_id": _id}))
