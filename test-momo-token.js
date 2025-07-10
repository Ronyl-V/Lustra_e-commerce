import axios from 'axios';

const MOMO_BASE_URL = 'https://sandbox.momodeveloper.mtn.com';
const MOMO_SUBSCRIPTION_KEY = '5bc95cc7abba46168dd6c22ad8c06c43'; // ta clé ici
const MOMO_API_USER = 'f95ea960-51c0-4fab-af33-48ef439d03ee';
const MOMO_API_KEY = '';

async function getMomoAccessToken() {
  const res = await axios.post(
    `${MOMO_BASE_URL}/collection/token/`,
    {},
    {
      headers: {
        "Ocp-Apim-Subscription-Key": MOMO_SUBSCRIPTION_KEY,
        Authorization: `Basic ${Buffer.from(`${MOMO_API_USER}:${MOMO_API_KEY}`).toString("base64")}`,
      },
    }
  );
  return res.data.access_token;
}

getMomoAccessToken()
  .then(token => console.log("Token généré:", token))
  .catch(err => console.error("Erreur token:", err.response?.data || err.message));
