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
		endings = mudutils.get_common_endings()
		for item in sinhaladict.sinhaladict:
			if (len(item) > 2):
				if (item.endswith(endings)):
					item = item[:-3]
				
				if (len(item) > 2):
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
		
	def get_terms(self, lang = 'si'):
		"""
			Get a list of terms and term IDs
		"""
		db  = self.get_db()
		cur = db.cursor()
		cur.execute('SELECT term_id, term FROM term WHERE lang LIKE ?',[lang])
		return [list(row) for row in cur.fetchall()]
		
	def get_popular_terms(self, lang = 'si'):
		"""
			Get a list of popular terms and term IDs
		"""
		db  = self.get_db()
		cur = db.cursor()
		cur.execute("""SELECT t.term_id, t.term, COUNT(*) 
		FROM term AS t JOIN docterm AS dt ON (t.term_id = dt.term_id) 
		WHERE t.lang LIKE ? GROUP BY dt.term_id 
		ORDER BY COUNT(*) DESC LIMIT 20""",[lang])
		return [list(row) for row in cur.fetchall()]

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
		"""
			Returns list of document/term relationships
		"""
		db  = self.get_db()
		cur = db.cursor()
		cur.execute("""SELECT doc_id, term_id, position 
		FROM docterm ORDER BY doc_id DESC""",[])
		return [list(row) for row in cur.fetchall()]
		
	def get_docterm_maxdocid(self):
		"""
			Returns the maximum doc id stored in the 
			document/term relationships table
		"""
		db  = self.get_db()
		cur = db.cursor()
		cur.execute("SELECT MAX(doc_id) FROM docterm",[])
		row = cur.fetchone()
		return 0 if (row == None) else row[0]

	def docterm_new_documents(self):
		"""
			Finds dictionary terms inside documents that haven't been
			already processed
		"""
		terms = self.get_terms()
		# very lame way to get rid of errors due to documents already
		# existing in the document/term table
		maxdocid = self.get_docterm_maxdocid() 
		
		db  = self.get_db()
		cur = db.cursor()
		matches = []
		result = 0
		
		for term in terms:
			cur.execute("""SELECT doc_id FROM document WHERE doc_body 
			LIKE ? AND doc_id > ?""", ['%' + term[1] + '%', maxdocid])
			row = cur.fetchone()
			if (row != None):
				matches.append((row[0], term[0]))
				
		try:
			cur.executemany("""INSERT INTO docterm(doc_id, term_id, position) 
			VALUES (?, ?, 0)""", matches)
			db.commit()
			result = len(matches)
		except sqlite3.IntegrityError:
			print 'IntegrityError, the document/term relationship already exists.'
		except:
			print 'Unexpected failure.'
		
		return result
