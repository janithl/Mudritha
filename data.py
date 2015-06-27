from sqlite3 import dbapi2 as sqlite3
from flask import Flask, jsonify, g, request, session
import time
import mudconfig
import mudutils

class MudrithaData:
    """
        Class for storing all db related functions
    """

    # common functions

    def init_db(self, app):
        """Initializes the database."""
        db = self.get_db()
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()

    def connect_db(self):
        """Connects to the specific database."""
        rv = sqlite3.connect(mudconfig.dbname)
        rv.row_factory = sqlite3.Row
        return rv

    def close_db(self, error):
        """Closes the database again at the end of the request."""
        if hasattr(g, 'sqlite_db'):
            g.sqlite_db.close()

    def get_db(self):
        """
            Opens a new database connection if there is none yet for the
            current application context.
        """

        if not hasattr(g, 'sqlite_db'):
            g.sqlite_db = self.connect_db()
        return g.sqlite_db

    # data functions

    def add_message(self, message, ip_addr):
        """
            Add a message to the message table
        """

        db = self.get_db()
        db.execute('INSERT INTO message (msg_text, pub_date, usr_iden) VALUES (?, ?, ?)', [message, int(time.time() * 1000), mudutils.sha256(ip_addr)])
        db.commit()

    def get_messages(self, lastid):
        db = self.get_db()
        cur = db.cursor()
        cur.execute('SELECT msg_id, msg_text, pub_date, usr_iden FROM message WHERE msg_id > ? ORDER BY msg_id DESC',[lastid])
        return [list(row) for row in cur.fetchall()]