from apscheduler.schedulers.background import BackgroundScheduler
from tastytrade_api import TastytradeAPI

class Scheduler:
    def __init__(self):
        self.scheduler = BackgroundScheduler()
        self.api = TastytradeAPI()
        self.scheduler.start()

    def add_trade_job(self, trade_config):
        self.scheduler.add_job(
            func=self.execute_trade,
            trigger='cron',
            hour=trade_config.execution_time.split(':')[0],
            minute=trade_config.execution_time.split(':')[1],
            args=[trade_config],
            id=str(trade_config.id)
        )

    def execute_trade(self, trade_config):
        # Fetch market data, validate parameters, and execute trade
        success = self.api.place_trade(trade_config.to_dict())
        if success:
            print(f"Trade executed for {trade_config.symbol}")
        else:
            print(f"Failed to execute trade for {trade_config.symbol}")
