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
from muddata import MudrithaData
import mudutils

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

@app.route('/api/admin/doctermnew/')
def doctermnew_command():
    count = mud.docterm_new_documents()
    return jsonify({ 'status': 'Docterm\'d ' + str(count) + ' new documents.' })

@app.route('/api/public/getdocterms/')
def get_docterms():
    return jsonify({ 'docterms': mud.get_docterms() })

@app.route('/api/public/getmessages/<lastid>/')
def get_messages(lastid):
    return jsonify({ 'messages': mud.get_messages(lastid) })

@app.route('/api/public/addmessage/', methods=['POST'])
def add_message():
    msg_id = mud.add_message(request.form['text'], request.remote_addr)
    if(msg_id == None):
        return jsonify({ 'status': 'Message adding failed.' })
    else:
        return jsonify({ 'status': 'Added message.', 'msg_id' : msg_id })

@app.route('/api/public/getdocuments/<lastid>/')
def get_documents(lastid):
    return jsonify({ 'documents': mud.get_documents(lastid) })

@app.route('/api/public/addlink/', methods=['POST'])
def add_link():
    doc_id = mud.add_document(request.form['url'])
    if(doc_id == None):
        return jsonify({ 'status': 'Document already exists.' })
    else:
        return jsonify({ 'status': 'Added document.', 'doc_id' : doc_id })

@app.route('/api/public/getterm/<term>/')
def get_term(term):
    return jsonify({ 'term_id': mud.get_term_id(term) })

if __name__ == '__main__':
    app.run(debug=True)
