# 💸 Moolre API Integration (Node.js)

This project demonstrates an integration of **Moolre’s Transfer API** and **SMS API** using **Node.js**.  
It sends a payment (transfer) from a Moolre account and then triggers an SMS notification when the payment is successful.

---

##  Features

- Send money from a Moolre account to a mobile money number or bank account  
- Send an SMS notification upon successful transfer  
- Built with **Node.js**, **Express**, and **Axios**  
- Uses environment variables for secure key management  

---

##  Tech Stack

- **Node.js**
- **Express.js**
- **Axios**
- **dotenv**

---

##  Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR-USERNAME/Moolre-Api-integration.git
cd Moolre-Api-integration
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a `.env` File

Create a `.env` file in the project root and add your **Moolre API keys**:

```
MOOLRE_PUBLIC_KEY=pk_test_xxxxxxxxx
MOOLRE_SECRET_KEY=sk_test_xxxxxxxxx
```

> ⚠️ Never commit your `.env` file. It’s already listed in `.gitignore`.

---

##  Running the App

### Start the server:

```bash
node index.js
```

or with **nodemon** (if installed):

```bash
npm run dev
```

### Example test:

Send a request (via **Postman**, **Insomnia**, or **cURL**) to:

```
POST http://localhost:3001/transfer
```

With a body like:

```json
{
  "amount": 5,
  "receiver": "0559490111",
  "message": "Payment sent successfully!"
}
```

---

## 🧠 How It Works

1. The app sends a **transfer request** to the Moolre Transfer API.
2. When Moolre responds with a success status, the app calls the **SMS API**.
3. The recipient receives an SMS confirming the transaction.

---

## 📁 Project Structure

```
Moolre-Api-integration/
│
├── index.js          # Main Express server
├── test_sms.js       # Optional: standalone SMS test script
├── package.json      # Dependencies and scripts
├── .env              # Environment variables (not committed)
└── .gitignore        # Ignored files (includes .env)
```

---

## 🧑‍💻 Author

**Your Name**
🌐 GitHub: [@YOUR-USERNAME](https://github.com/sassante)
📧 Email: [your.email@example.com](mailto:sandraasante201@gmail.com)

---

## 📜 License

This project is licensed for demonstration purposes only.
© 2025 YOUR NAME — All rights reserved.

```




