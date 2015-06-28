# -*- coding: utf-8 -*-
"""
    Mudritha
    ~~~~~~
    A vehicle to relearn Python, Flask and sqlite3.
    Planning to turn it into a Sri Lankan newsreader, eventually.
    :copyright: (c) 2015 by Janith Leanage.
    :license: MIT, see LICENSE for more details.
"""

from flask import Flask, jsonify, g, request, session, render_template
from data import MudrithaData

app = Flask(__name__)
app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))

mud = MudrithaData()

@app.teardown_appcontext
def close_db(error):
    mud.close_db(error)

@app.route('/api/admin/initdb/')
def initdb_command():
    mud.init_db(app)
    return jsonify({ 'status': 'Initialized the database.' })

@app.route('/api/admin/initdict/')
def initdict_command():
    mud.init_dictionary()
    return jsonify({ 'status': 'Initialized the dictionary.' })

@app.route('/api/public/getmessages/<lastid>/')
def get_messages(lastid):
    return jsonify({ 'messages': mud.get_messages(lastid) })

@app.route('/api/public/addmessage/', methods=['POST'])
def add_message():
    mud.add_message(request.form['text'], request.remote_addr)
    return jsonify({ 'status': 'Added message.' })

if __name__ == '__main__':
    app.run(debug=True)
