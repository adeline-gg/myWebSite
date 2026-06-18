/**
 * Backend simple pour le formulaire de contact
 * Utilise Express + Nodemailer
 */

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:8080",
    ],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting - 5 requêtes par 15 minutes par IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Trop de tentatives, veuillez réessayer dans 15 minutes.",
});

app.use("/api/contact", limiter);

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Vérification de la configuration email
transporter.verify((error, success) => {
  if (error) {
    console.error("Erreur de configuration email:", error);
  } else {
    console.log("✓ Serveur email prêt");
  }
});

// Validation des données
const validateContactForm = (data) => {
  const { name, email, subject, message } = data;

  if (!name || name.trim().length < 2) {
    return { valid: false, error: "Nom invalide" };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, error: "Email invalide" };
  }

  if (!subject || subject.trim().length < 3) {
    return { valid: false, error: "Sujet trop court" };
  }

  if (!message || message.trim().length < 10) {
    return { valid: false, error: "Message trop court (min. 10 caractères)" };
  }

  return { valid: true };
};

// Route de santé (pour health checks K8s)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Route principale du formulaire de contact
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    const validation = validateContactForm({ name, email, subject, message });
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: validation.error,
      });
    }

    // Construction de l'email
    const mailOptions = {
      from: `"Formulaire Contact Site" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || "contact@adelinegueret.fr",
      replyTo: email,
      subject: `Nouveau contact: ${subject}`,
      text: `
Nouveau message reçu via le formulaire de contact:

Nom: ${name}
Email: ${email}
Téléphone: ${phone || "Non renseigné"}
Sujet: ${subject}

Message:
${message}

---
Envoyé depuis le site adelinegueret.fr
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #6B46C1, #9F7AEA); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
    .content { background: #f7fafc; padding: 20px; border-radius: 0 0 10px 10px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #6B46C1; }
    .value { margin-top: 5px; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #718096; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📧 Nouveau message de contact</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">👤 Nom:</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">✉️ Email:</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>
      ${
        phone
          ? `
      <div class="field">
        <div class="label">📞 Téléphone:</div>
        <div class="value">${phone}</div>
      </div>
      `
          : ""
      }
      <div class="field">
        <div class="label">📋 Sujet:</div>
        <div class="value">${subject}</div>
      </div>
      <div class="field">
        <div class="label">💬 Message:</div>
        <div class="value">${message.replace(/\n/g, "<br>")}</div>
      </div>
      <div class="footer">
        Envoyé depuis le site adelinegueret.fr le ${new Date().toLocaleDateString(
          "fr-FR",
        )} à ${new Date().toLocaleTimeString("fr-FR")}
      </div>
    </div>
  </div>
</body>
</html>
      `,
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    // Email de confirmation au client (optionnel)
    if (process.env.SEND_CONFIRMATION === "true") {
      await transporter.sendMail({
        from: `"Adeline GUERET" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Confirmation de réception de votre message",
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Bonjour ${name},</h2>
    <p>Merci de nous avoir contactés. Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
    <p>Cordialement,<br>Adeline GUERET</p>
  </div>
</body>
</html>
        `,
      });
    }

    console.log(`✓ Email envoyé depuis ${email}`);

    res.status(200).json({
      success: true,
      message: "Message envoyé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de l'envoi du message. Veuillez réessayer.",
    });
  }
});

// Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

module.exports = app;
