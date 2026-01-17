from flask import Flask, jsonify, request
from flask_cors import CORS
import psutil
import time
import random
from datetime import datetime, timedelta

app = Flask(__name__)
# CORS enabled so the React frontend (running on a different port) can access this API
CORS(app)

@app.route('/api/stats')
def get_stats():
    # psutil.cpu_percent(interval=None) is non-blocking
    cpu = psutil.cpu_percent(interval=None)
    ram = psutil.virtual_memory().percent
    disk = psutil.disk_usage('/').percent
    
    return jsonify({
        'cpu': cpu,
        'ram': ram,
        'disk': disk,
        'timestamp': time.time()
    })

@app.route('/api/history')
def get_history():
    period = request.args.get('period', '24h')
    data = []
    now = datetime.now()
    
    if period == '24h':
        # Generate 24 hourly data points
        for i in range(24):
            # Time minus (23-i) hours
            t = now - timedelta(hours=23-i)
            
            # Generate realistic-looking data for all metrics
            # CPU
            base_cpu = 30
            if 9 <= t.hour <= 17: base_cpu = 50
            cpu_val = max(0, min(100, base_cpu + random.randint(-20, 30)))
            
            # RAM (usually more stable)
            ram_val = max(0, min(100, 45 + random.randint(-5, 10)))
            
            # Disk (very stable, slow growth)
            disk_val = 55 + (i * 0.1) # Slight increase over time
            
            data.append({
                'time': t.strftime('%H:00'),
                'cpu': cpu_val,
                'ram': ram_val,
                'disk': disk_val
            })
    elif period == '7d':
        # Generate 7 daily data points
        for i in range(7):
            t = now - timedelta(days=6-i)
            
            data.append({
                'time': t.strftime('%a'), # Day name (Mon, Tue...)
                'cpu': random.randint(20, 60),
                'ram': random.randint(40, 60),
                'disk': 55 + random.randint(0, 5)
            })
            
    return jsonify(data)

if __name__ == '__main__':
    print("Starting Flask Server on port 5000...")
    # Run on port 5000
    app.run(debug=True, port=5000)