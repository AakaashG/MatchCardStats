"""
Fixed the frontend server so no need for this
"""
# from flask import Flask, jsonify, request;
# import statbotics
# from flask_cors import CORS;

# app = Flask(__name__)
# CORS(app)
# sb = statbotics.Statbotics();

# @app.route('/', methods=['POST'])
# def post_data():
#     eventKey = request.get_json().get("key")
#     print(eventKey)
#     events = sb.get_event(eventKey);
#     print("Hello world!")
#     return jsonify(events)

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=5000)