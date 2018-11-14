# -*- coding: utf-8 -*-
import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
APP_ROOT = os.path.dirname(os.path.abspath(__file__))

@app.route("/")
def index():
    return render_template("upload.html")

@app.route("/upload",defaults={'name':None,'fl':None,'ll':None}, methods=['POST'])
@app.route("/upload/<name>", methods=['POST'])
@app.route("/upload/<fl>", methods=['POST'])
@app.route("/upload/<ll>", methods=['POST'])
@app.route("/upload/<name>/<fl>/<ll>", methods=['POST'])
def upload(name, fl, ll):
    try:
        target = os.path.join(APP_ROOT, 'images')
        name_ = request.files['file'].filename
        file = [line.decode('utf-8') for line in request.files['file'].readlines()]
        file_ = []

        if(fl is not None and fl != "-1" and ll is not None and ll != "-1"):
            fl = int(fl)-1
            ll = int(ll)
            for i in range(fl,ll):
                file_.append(file[i])
        else:
            file_ = file
        
        response = {"file_read":name_,"number_of_lines_read":len(file_),"lines":file_,"aname":name,"fl":fl,"all":ll}
        return jsonify(response)
    except Exception as e:
        return jsonify({"error":e,"status":500})


if __name__ == "__main__":
    app.run(port=4555, debug=True)