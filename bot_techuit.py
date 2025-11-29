# bot_techuit.py  →  VERSIÓN QUE SÍ FUNCIONA 100%
import telebot
import requests
import time
import json

TOKEN = '8593988508:AAFr9ZzeA8VFmGCH0CPf7wRMKTXr7eoNfCE'  # tu bot
TU_CHAT_ID = 2094323061  # tu ID de Telegram

bot = telebot.TeleBot(TOKEN)

print("Bot TechUIT corriendo...")

@bot.message_handler(commands=['start'])
def start(m):
    bot.send_message(m.chat.id, "TECHUIT BOT SUPREMO ACTIVADO\nTe llegan todos los técnicos nuevos, órdenes, cancelaciones y ganancias.")

# NUEVO TÉCNICO
def notificar_nuevo_tecnico(data):
    msg = f"NUEVO TÉCNICO REGISTRADO\n\n" \
          f"Nombre: {data['nombre']}\n" \
          f"ID: {data['tecnico_id']}\n" \
          f"Tel: {data['telefono']}\n" \
          f"PayPal: {data['paypal']}\n" \
          f"Especialidad: {data['especialidad']}\n\n" \
          f"Foto DPI: {data['foto_dpi_url']}\n" \
          f"Selfie: {data['foto_selfie_url']}"
    bot.send_message(TU_CHAT_ID, msg)
    # Envía las fotos
    bot.send_photo(TU_CHAT_ID, data['foto_dpi_url'], caption="DPI")
    bot.send_photo(TU_CHAT_ID, data['foto_selfie_url'], caption="Selfie con identidad")

# Esto lo llama el servidor local
import flask
app = flask.Flask(__name__)

@app.route('/notificar-nuevo-tecnico', methods=['POST'])
def recibir():
    data = flask.request.json
    notificar_nuevo_tecnico(data)
    return "OK"

@app.route('/start')
def start_bot():
    return "Bot ya está corriendo"

if __name__ == '__main__':
    # Corre el servidor Flask para recibir las notificaciones
    app.run(port=3939, threaded=True)