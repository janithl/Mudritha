# -*- coding: utf-8 -*-

from sqlite3 import dbapi2 as sqlite3
from flask import Flask, jsonify, g, request, session, Markup
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
        db  = self.get_db()
        cur = db.cursor()
        msg_id = None

        try:
            cur.execute("""INSERT INTO message(msg_text, pub_date, ip_addr) 
            VALUES (?, ?, ?)""", [Markup(message).striptags(), int(time.time() * 1000), ip_addr])
            db.commit()
            msg_id = cur.lastrowid
        except:
            print 'Unexpected Error'

        return msg_id

    def get_messages(self, lastid):
        """
            Get set of messages with message ids greater than param lastid
        """
        db  = self.get_db()
        cur = db.cursor()
        cur.execute("""SELECT msg_id, msg_text, pub_date, ip_addr FROM message 
        WHERE msg_id > ? ORDER BY msg_id DESC""",[lastid])
        return [list(row) for row in cur.fetchall()]

    def init_dictionary(self):
        """
            Import stock sinhala dictionary and add it to db
        """
        import sinhaladict
        db = self.get_db()
        for item in sinhaladict.sinhaladict:
            try:
                db.execute('INSERT INTO term(term, lang) VALUES (?, \'si\')', [item])
            except sqlite3.IntegrityError:
                print 'IntegrityError, the term ' + item + ' already exists.'
            except:
                print 'Unexpected failure.'
        db.commit()

    def get_term_id(self, term):
        """
            Given a term, get its term id
        """
        db  = self.get_db()
        cur = db.cursor()
        cur.execute('SELECT term_id FROM term WHERE term LIKE ?',[term])
        row = cur.fetchone()
        return None if (row == None) else row[0]

    def add_document(self, url):
        """
            Add a doc to the document table
            Calls the utils class and its HTML page getter/parser
        """
        db  = self.get_db()
        cur = db.cursor()
        doc = mudutils.parse_html(url)
        doc_id = None

        try:
            cur.execute("""INSERT INTO document(doc_title, doc_body, doc_image, 
            doc_link, add_date) VALUES (?, ?, ?, ?, ?)""", [doc['title'], 
            doc['body'], doc['image'], url, int(time.time() * 1000)])
            db.commit()
            doc_id = cur.lastrowid
        except sqlite3.IntegrityError:
            print 'IntegrityError, the document already exists'

        return doc_id

    def get_documents(self, lastid):
        """
            Get set of documents with doc ids greater than param lastid
        """
        db  = self.get_db()
        cur = db.cursor()
        cur.execute("""SELECT doc_id, doc_title, doc_image, doc_link, add_date 
        FROM document WHERE doc_id > ? ORDER BY doc_id DESC""",[lastid])
        return [list(row) for row in cur.fetchall()]

    def add_docterm(self, doc_id, term_id, position):
        """
            Add a document/term relationship
        """
        db = self.get_db()
        db.execute("""INSERT INTO docterm(doc_id, term_id, position) 
        VALUES (?, ?, ?)""", [doc_id, term_id, position])

    def get_docterms(self):
        db  = self.get_db()
        cur = db.cursor()
        cur.execute("""SELECT doc_id, term_id, position 
        FROM docterm ORDER BY doc_id DESC""",[])
        return [list(row) for row in cur.fetchall()]

    def tokenize_document(self, doc_id, text):
        """ 
            Given a document id and body text, tokenize it and
            match terms with term dictionary, insert results 
            into docterm table
        """
        tokenset = text.split()

        for i in range(len(tokenset)):
            term_id = self.get_term_id(tokenset[i])
            if(term_id != None):
                self.add_docterm(doc_id, term_id, i)
            else:
                print 'Term not found: ' + tokenset[i]
                if(not tokenset[i].isdigit()):
                    db = self.get_db()
                    db.execute('INSERT INTO term(term, lang) VALUES (?, \'si\')', [tokenset[i]])
                    db.commit()

    def docterm_new_documents(self):
        """
            Tokenizes and docterms documents that haven't been
            already processed
        """
        db  = self.get_db()
        cur = db.cursor()
        cur.execute("""SELECT doc_id, doc_body FROM document 
        WHERE doc_id NOT IN (SELECT doc_id FROM docterm) 
        ORDER BY doc_id DESC""", [])

        documents = [list(row) for row in cur.fetchall()]
        print documents

        for doc in documents:
            self.tokenize_document(doc[0], doc[1])
        
        return len(documents)
