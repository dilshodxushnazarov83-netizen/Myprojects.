#!/usr/bin/env python3
"""
Kingsman Suits & Tailoring - HTTP Web Server and API
Serves static frontend files and mock API for orders and consultations.
"""

import json
import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler
import random
import time

PORT = int(os.environ.get("PORT", 8000))
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

# In-memory orders and bookings store
ORDERS = []
CONSULTATIONS = []

class KingsmanRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        if self.path == "/api/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "ok", "app": "Kingsman Tashkent Atelier"}).encode("utf-8"))
            return

        # Serve static assets or default to SimpleHTTPRequestHandler
        super().do_GET()

    def do_POST(self):
        content_length = int(self.headers.get("Content-Length", 0))
        post_data = self.rfile.read(content_length)

        try:
            payload = json.loads(post_data.decode("utf-8")) if post_data else {}
        except Exception:
            payload = {}

        if self.path == "/api/order":
            order_id = random.randint(10000, 99999)
            order_record = {
                "orderId": order_id,
                "timestamp": time.time(),
                "data": payload
            }
            ORDERS.append(order_record)

            response = {
                "success": True,
                "orderId": order_id,
                "message": "Buyurtmangiz muvaffaqiyatli qabul qilindi!"
            }
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(json.dumps(response, ensure_ascii=False).encode("utf-8"))
            return

        elif self.path == "/api/consultation":
            booking_id = random.randint(1000, 9999)
            record = {
                "bookingId": booking_id,
                "timestamp": time.time(),
                "data": payload
            }
            CONSULTATIONS.append(record)

            response = {
                "success": True,
                "bookingId": booking_id,
                "message": "Konsultatsiya arizasi qabul qilindi!"
            }
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(json.dumps(response, ensure_ascii=False).encode("utf-8"))
            return

        self.send_response(404)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode("utf-8"))

def run():
    server_address = ("", PORT)
    httpd = HTTPServer(server_address, KingsmanRequestHandler)
    print(f"👔 KINGSMAN Erkaklar Kostyum Magazini ishga tushdi: http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer to'xtatildi.")
        httpd.server_close()

if __name__ == "__main__":
    run()
