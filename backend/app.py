from flask import Flask, jsonify, request
import requests
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from bson import ObjectId
from datetime import datetime

# Load environment variables
load_dotenv()

# Flask app
app = Flask(__name__)

# Allow frontend requests
CORS(app)

# MongoDB connection
client = MongoClient(os.getenv("MONGO_URI"))

SHOPPING_API_KEY = os.getenv("SHOPPING_API_KEY")
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

# Database
db = client["monitorhubDB"]

# Collection
monitors_collection = db["monitors"]
users_collection = db["users"]
reviews_collection = db["reviews"]


# GET all monitors
@app.route("/monitors", methods=["GET"])
def get_monitors():

    monitors = []

    for monitor in monitors_collection.find():

        monitors.append({

            "id": str(monitor.get("_id")),

            "name": monitor.get("name"),
            "brand": monitor.get("brand"),

            "screenSize": monitor.get("screenSize"),
            "resolution": monitor.get("resolution"),
            "panelType": monitor.get("panelType"),
            "contrastRatio": monitor.get("contrastRatio"),
            "colorDepth": monitor.get("colorDepth"),

            "refreshRate": monitor.get("refreshRate"),
            "responseTime": monitor.get("responseTime"),

            "adaptiveSync": monitor.get("adaptiveSync"),

            "weight": monitor.get("weight"),
            "dimensions": monitor.get("dimensions"),

            "vesaMount": monitor.get("vesaMount"),

            "image": monitor.get("image"),

            "price": monitor.get("price"),

            "rating": monitor.get("rating"),

            "category": monitor.get("category")
        })

    return jsonify(monitors)

# SEARCH monitors by name or brand
@app.route("/monitors/search", methods=["GET"])
def search_monitors():
    query = request.args.get("q", "").strip()

    if not query:
        return jsonify([])

    monitors = []
    search_filter = {
        "$or": [
            {"name": {"$regex": query, "$options": "i"}},
            {"brand": {"$regex": query, "$options": "i"}}
        ]
    }

    for monitor in monitors_collection.find(search_filter):
        monitors.append({
            "id": str(monitor.get("_id")),
            "name": monitor.get("name"),
            "brand": monitor.get("brand"),
            "screenSize": monitor.get("screenSize"),
            "resolution": monitor.get("resolution"),
            "panelType": monitor.get("panelType"),
            "contrastRatio": monitor.get("contrastRatio"),
            "colorDepth": monitor.get("colorDepth"),
            "refreshRate": monitor.get("refreshRate"),
            "responseTime": monitor.get("responseTime"),
            "adaptiveSync": monitor.get("adaptiveSync"),
            "weight": monitor.get("weight"),
            "dimensions": monitor.get("dimensions"),
            "vesaMount": monitor.get("vesaMount"),
            "image": monitor.get("image"),
            "price": monitor.get("price"),
            "rating": monitor.get("rating"),
            "category": monitor.get("category")
        })

    return jsonify(monitors)

# FILTER monitors by category
@app.route("/monitors/category/<category>", methods=["GET"])
def get_monitors_by_category(category):
    monitors = []
    query_filter = {} if category.lower() == "all" else {"category": category.lower()}

    for monitor in monitors_collection.find(query_filter):
        monitors.append({
            "id": str(monitor.get("_id")),
            "name": monitor.get("name"),
            "brand": monitor.get("brand"),
            "screenSize": monitor.get("screenSize"),
            "resolution": monitor.get("resolution"),
            "panelType": monitor.get("panelType"),
            "contrastRatio": monitor.get("contrastRatio"),
            "colorDepth": monitor.get("colorDepth"),
            "refreshRate": monitor.get("refreshRate"),
            "responseTime": monitor.get("responseTime"),
            "adaptiveSync": monitor.get("adaptiveSync"),
            "weight": monitor.get("weight"),
            "dimensions": monitor.get("dimensions"),
            "vesaMount": monitor.get("vesaMount"),
            "image": monitor.get("image"),
            "price": monitor.get("price"),
            "rating": monitor.get("rating"),
            "category": monitor.get("category")
        })

    return jsonify(monitors)

# GET SINGLE MONITOR
@app.route("/monitors/<id>", methods=["GET"])
def get_monitor(id):

    monitor = monitors_collection.find_one({
        "_id": ObjectId(id)
    })

    if not monitor:
        return jsonify({"error": "Monitor not found"}), 404

    result = {

        "id": str(monitor.get("_id")),

        "name": monitor.get("name"),
        "brand": monitor.get("brand"),

        "screenSize": monitor.get("screenSize"),
        "resolution": monitor.get("resolution"),
        "panelType": monitor.get("panelType"),
        "contrastRatio": monitor.get("contrastRatio"),
        "colorDepth": monitor.get("colorDepth"),

        "refreshRate": monitor.get("refreshRate"),
        "responseTime": monitor.get("responseTime"),

        "adaptiveSync": monitor.get("adaptiveSync"),

        "weight": monitor.get("weight"),
        "dimensions": monitor.get("dimensions"),

        "vesaMount": monitor.get("vesaMount"),

        "image": monitor.get("image"),

        "price": monitor.get("price"),

        "rating": monitor.get("rating"),
        "category": monitor.get("category")
    }

    return jsonify(result)

# CREATE USER
@app.route("/users/create", methods=["POST"])
def create_user():

    data = request.json

    firebase_uid = data.get("firebase_uid")
    email = data.get("email")
    firstName = data.get("firstName")
    lastName = data.get("lastName")

    if not firebase_uid or not email:

        return jsonify({
            "error": "Missing fields"
        }), 400

    existing_user = users_collection.find_one({
        "firebase_uid": firebase_uid
    })

    if existing_user:

        return jsonify({
            "message": "User already exists"
        }), 200

    users_collection.insert_one({

        "firebase_uid": firebase_uid,
        "email": email,
        "firstName": firstName,
        "lastName": lastName,
        "profilePicture": None,
        "favorites": [],
        "created_at": datetime.now().isoformat()

    })

    return jsonify({
        "message": "User created successfully",
    }), 201

# CREATE REVIEW
@app.route("/reviews/create", methods=["POST"])
def create_review():

    data = request.json
    print(data)

    user_id = data.get("userId")
    monitor_id = data.get("monitorId")

    rating = data.get("rating")
    comment = data.get("comment")
    image = data.get("image")

    if not user_id or not monitor_id:

        return jsonify({
            "error": "Missing userId or monitorId"
        }), 400

    review = {

        "userId": ObjectId(user_id),
        "monitorId": ObjectId(monitor_id),
        "rating": rating,
        "comment": comment,
        "image": image,
        "created_at": datetime.now().isoformat()
    }

    result = reviews_collection.insert_one(review)

    return jsonify({

        "message": "Review created successfully",
        "reviewId": str(result.inserted_id)

    }), 201

@app.route("/reviews/monitor/<monitor_id>", methods=["GET"])
def get_monitor_reviews(monitor_id):

    reviews = []

    monitor_reviews = reviews_collection.find({
        "monitorId": ObjectId(monitor_id)
    })

    for review in monitor_reviews:

        user = users_collection.find_one({
            "_id": ObjectId(review["userId"])
        })

        if user:

            user_data = {
                "id": str(user["_id"]),
                "firstName": user.get("firstName"),
                "lastName": user.get("lastName"),
                "profilePicture": user.get("profilePicture"),
            }

        else:

            user_data = {
                "id": None,
                "firstName": "Deleted User",
                "lastName": "",
                "profilePicture": None,
            }

        reviews.append({

            "id": str(review["_id"]),
            "rating": review.get("rating"),
            "comment": review.get("comment"),
            "image": review.get("image"),
            "created_at": review.get("created_at"),

            "user": user_data
        })

    return jsonify(reviews)

# GET USER BY FIREBASE UID
@app.route("/users/firebase/<firebase_uid>", methods=["GET"])
def get_user_by_firebase_uid(firebase_uid):

    user = users_collection.find_one({
        "firebase_uid": firebase_uid
    })

    if not user:
        return jsonify({"error": "User not found"}), 404

    result = {

        "id": str(user["_id"]),
        "firebase_uid": user.get("firebase_uid"),
        "email": user.get("email"),
        "firstName": user.get("firstName"),
        "lastName": user.get("lastName"),
        "profilePicture": user.get("profilePicture"),
        "favorites": user.get("favorites")
    }

    return jsonify(result)

# Update PFP
@app.route("/users/profile-picture", methods=["PUT"])
def update_profile_picture():

    data = request.json

    user_id = data.get("userId")

    profile_picture = data.get("profilePicture")

    if not user_id or not profile_picture:

        return jsonify({
            "error": "Missing fields"
        }), 400

    users_collection.update_one(

        {
            "_id": ObjectId(user_id)
        },

        {
            "$set": {
                "profilePicture": profile_picture
            }
        }
    )

    return jsonify({
        "message": "Profile picture updated"
    })

@app.route("/users/<user_id>/favorites/<monitor_id>", methods=["POST"])
def add_favorite(user_id, monitor_id):

    users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$addToSet": {"favorites": monitor_id}}
    )

    return jsonify({"message": "Added to favorites"})

@app.route("/users/<user_id>/favorites/<monitor_id>", methods=["DELETE"])
def remove_favorite(user_id, monitor_id):

    users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$pull": {"favorites": monitor_id}}
    )

    return jsonify({"message": "Removed from favorites"})

@app.route("/users/<user_id>/favorites", methods=["GET"])
def get_favorites(user_id):

    user = users_collection.find_one(
        {"_id": ObjectId(user_id)}
    )

    return jsonify(user.get("favorites", []))

@app.route("/monitors/by-ids", methods=["POST"])
def get_monitors_by_ids():

    data = request.json
    ids = data.get("ids", [])

    object_ids = [ObjectId(i) for i in ids]

    monitors = monitors_collection.find({
        "_id": {"$in": object_ids}
    })

    result = []

    for m in monitors:
        result.append({
            "id": str(m["_id"]),
            "name": m.get("name"),
            "image": m.get("image"),
            "price": m.get("price")
        })

    return jsonify(result)

# GET REVIEW BY USER ID
@app.route("/reviews/user/<user_id>", methods=["GET"])
def get_reviews_by_user(user_id):

    reviews = reviews_collection.find({
        "userId": ObjectId(user_id)
    })

    result = []

    for r in reviews:
        result.append({
            "id": str(r["_id"]),
            "userId": str(r["userId"]),
            "monitorId": str(r["monitorId"]),
            "rating": r.get("rating"),
            "comment": r.get("comment"),
            "image": r.get("image"),
            "createdAt": r.get("createdAt")
        })

    print("USER REVIEWS:", result)

    return jsonify(result)

@app.route("/shopping/<query>", methods=["GET"])
def get_shopping_results(query):

    url = "https://serpapi.com/search.json"

    params = {

        "engine": "google_shopping",

        "q": f"{query} monitor",

        "api_key": SHOPPING_API_KEY,

        # Thailand localization
        "gl": "th",
        "hl": "en",
        "location": "Bangkok,Thailand"
    }

    response = requests.get(url, params=params)

    data = response.json()

    shopping_results = []

    for item in data.get("shopping_results", []):

        shopping_results.append({

            "title": item.get("title"),

            "price": item.get("price"),

            "store": item.get("source"),

            "link": item.get("product_link"),

            "thumbnail": item.get("thumbnail"),

            "rating": item.get("rating"),

            "reviews": item.get("reviews")
        })

    return jsonify(shopping_results)

@app.route("/youtube/search/<query>")
def youtube_search(query):

    url = (
        "https://www.googleapis.com/youtube/v3/search"
    )

    params = {
        "part": "snippet",
        "q": query,
        "key": YOUTUBE_API_KEY,
        "maxResults": 10,
        "type": "video"
    }

    response = requests.get(url, params=params)

    data = response.json()

    videos = []

    for item in data.get("items", []):

        videos.append({
            "videoId": item["id"]["videoId"],
            "title": item["snippet"]["title"],
            "thumbnail": item["snippet"]["thumbnails"]["high"]["url"],
            "channel": item["snippet"]["channelTitle"]
        })

    return jsonify(videos)

@app.route("/reviews/<review_id>", methods=["PUT"])
def update_review(review_id):

    data = request.json

    updated_data = {
        "rating": data.get("rating"),
        "comment": data.get("comment"),
        "image": data.get("image"),
    }

    reviews_collection.update_one(
        {"_id": ObjectId(review_id)},
        {"$set": updated_data}
    )

    return jsonify({
        "message": "Review updated successfully"
    }), 200

@app.route("/reviews/<review_id>", methods=["DELETE"])
def delete_review(review_id):

    reviews_collection.delete_one({
        "_id": ObjectId(review_id)
    })

    return jsonify({
        "message": "Review deleted successfully"
    }), 200

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)