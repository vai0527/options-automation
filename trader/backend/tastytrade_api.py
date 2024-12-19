import requests

class TastytradeAPI:
    BASE_URL = 'https://api.cert.tastyworks.com'

    def authenticate(self, username, password):
        response = requests.post(f'{self.BASE_URL}/auth/login', json={
            'username': username,
            'password': password
        })
        response.raise_for_status()
        return response.json()['token']

    def place_trade(self, trade_config):
        # Example API call to place a trade
        response = requests.post(f'{self.BASE_URL}/orders', json=trade_config)
        return response.status_code == 201
