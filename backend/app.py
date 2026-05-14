from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from bson import ObjectId

# Load environment variables
load_dotenv()

# Flask app
app = Flask(__name__)

# Allow frontend requests
CORS(app)

# MongoDB connection
client = MongoClient(os.getenv("MONGO_URI"))

# Database
db = client["monitorhubDB"]

# Collection
monitors_collection = db["monitors"]


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

            "rating": monitor.get("rating")
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

        "rating": monitor.get("rating")
    }

    return jsonify(result)

@app.route("/monitors/add-property", methods=["PUT"])
def add_property():

    result = monitors_collection.update_many(
        # Empty filter = every document
        {},

        {
            "$set": {
                "reviews": []
            }
        }
    )

    return jsonify({

        "message": "Property added successfully",

        "modifiedCount": result.modified_count
    })


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)