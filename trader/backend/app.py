import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

BASE_URL = "https://api.cert.tastyworks.com"  # Use the certification endpoint

# Temporary storage for session and remember tokens (use a database or secure vault for production)
tokens = {
    "session_token": None,
    "remember_token": None
}

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    remember_me = data.get('remember_me', False)

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    # Call Tastytrade's session creation API
    try:
        response = requests.post(f"{BASE_URL}/sessions", json={
            "login": username,
            "password": password,
            "remember-me": remember_me
        })
        response.raise_for_status()
        session_data = response.json()['data']

        # Store session and remember tokens in memory (secure in production)
        tokens['session_token'] = session_data['session-token']
        tokens['remember_token'] = session_data.get('remember-token')

        return jsonify({
            'token': session_data['session-token'],
            'remember_token': session_data.get('remember-token'),
            'session_expiration': session_data['session-expiration']
        })
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 400

@app.route('/logout', methods=['DELETE'])
def logout():
    session_token = tokens.get('session_token')
    if not session_token:
        return jsonify({'error': 'No active session found'}), 400

    try:
        response = requests.delete(f"{BASE_URL}/sessions", headers={
            "Authorization": session_token
        })
        if response.status_code == 204:
            # Clear tokens after logout
            tokens['session_token'] = None
            tokens['remember_token'] = None
            return jsonify({'message': 'Session successfully destroyed'})
        else:
            return jsonify({'error': 'Failed to destroy session'}), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 400

@app.route('/accounts', methods=['GET'])
def get_accounts():
    session_token = tokens.get('session_token')
    if not session_token:
        return jsonify({'error': 'No active session found'}), 400
    
    try:
        response = requests.get(f"{BASE_URL}/customers/me/accounts", headers={
            "Authorization": session_token
        })
        positions_data = response.json()['data']['items']
        return jsonify(positions_data)
    
    
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 400



if __name__ == '__main__':
    app.run(debug=True)
