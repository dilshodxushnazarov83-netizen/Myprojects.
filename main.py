#!/usr/bin/env python3
"""Kingsman Suits & Tailoring - HTTP Web Server and API"""
import json, os, random
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = int(os.environ.get("PORT", 8000))
DIR = os.path.dirname(os.path.abspath(__file__))
ORDERS, CONSULTATIONS = [], []

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)

    def send_json(self, data, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode("utf-8"))

    def do_GET(self):
        if self.path == "/api/health":
            return self.send_json({"status": "ok", "app": "Kingsman"})
        super().do_GET()

    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        body = json.loads(self.rfile.read(length).decode("utf-8")) if length else {}

        if self.path == "/api/order":
            oid = random.randint(10000, 99999)
            ORDERS.append({"id": oid, "data": body})
            return self.send_json({"success": True, "orderId": oid, "message": "Buyurtma qabul qilindi!"})
        if self.path == "/api/consultation":
            cid = random.randint(1000, 9999)
            CONSULTATIONS.append({"id": cid, "data": body})
            return self.send_json({"success": True, "bookingId": cid, "message": "Ariza qabul qilindi!"})

        self.send_json({"error": "Not found"}, 404)

if __name__ == "__main__":
    server = HTTPServer(("", PORT), Handler)
    print(f"👔 KINGSMAN server ishga tushdi: http://localhost:{PORT}")
    server.serve_forever()
