from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class TradeConfig(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(10), nullable=False)
    strategy = db.Column(db.String(50), nullable=False)
    strike_price = db.Column(db.Float, nullable=False)
    delta_target = db.Column(db.Float, nullable=False)
    expiration_date = db.Column(db.Date, nullable=False)
    frequency = db.Column(db.String(20), nullable=False)
    execution_time = db.Column(db.String(5), nullable=False)  # Format: HH:MM

    def to_dict(self):
        return {
            'id': self.id,
            'symbol': self.symbol,
            'strategy': self.strategy,
            'strike_price': self.strike_price,
            'delta_target': self.delta_target,
            'expiration_date': self.expiration_date,
            'frequency': self.frequency,
            'execution_time': self.execution_time
        }
