import numpy as np
from statsmodels.tsa.arima.model import ARIMA
import pandas as pd
from prophet import Prophet

def forecast_multistep(data, p, d, q, steps):
    forecasted_values = []
    for i in range(steps):
        model = ARIMA(data, order=(p,d,q))
        fitted_model = model.fit()
        forecast = fitted_model.forecast(steps=1)
        forecasted_values.append(forecast[0])
        data.append(forecast[0])
    return forecasted_values

def prophet_prices_prediction(data, days):
    m = Prophet()
    df = pd.DataFrame(data, columns=['ds', 'y'])
    m.fit(df)
    future = m.make_future_dataframe(periods=days)
    forecast = m.predict(future)
    forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail()

    daily_arrays = []
    last_7_days = forecast.tail(7)
    for index, row in last_7_days.iterrows():
        daily_array = [row['ds'], row['yhat'], row['yhat_lower'], row['yhat_upper']]
        daily_arrays.append(daily_array)

    return daily_arrays

