// server/index.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// coloque seu Access Token no .env (NUNCA commit em público)
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN; // ex: "TEST-xxxxxxxxx" ou "APP_USR-xxxx"
if(!MP_ACCESS_TOKEN){
  console.warn("ATENÇÃO: Defina MP_ACCESS_TOKEN no .env");
}

app.post('/create_preference', async (req, res) => {
  try {
    const { items } = req.body;
    if(!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'items required' });

    const body = {
      items: items.map(it => ({
        title: String(it.title).slice(0,60),
        quantity: Number(it.quantity) || 1,
        currency_id: 'BRL',
        unit_price: Number(it.unit_price)
      })),
      back_urls: {
        success: process.env.BACK_URL_SUCCESS || "https://your-site.com/success.html",
        failure: process.env.BACK_URL_FAILURE || "https://your-site.com/failure.html",
        pending: process.env.BACK_URL_PENDING || "https://your-site.com/pending.html"
      },
      auto_return: "approved"
    };

    const resp = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MP_ACCESS_TOKEN}`
      },
      body: JSON.stringify(body)
    });

    const data = await resp.json();
    return res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log("Server running on port", PORT));
// ----------------- CARRINHO -----------------
let carrinho = [];
// --- IGNORE ---