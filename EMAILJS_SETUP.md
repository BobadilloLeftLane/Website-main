# EmailJS Setup - 5 minuta bez servera! 🚀

## Zašto EmailJS?
- ✅ **Potpuno besplatno** (200 emailova mesečno)
- ✅ **Bez servera** (sve radi u browseru)
- ✅ **Bez AWS/Lambda** konfiguracije
- ✅ **5 minuta setup**
- ✅ **Auto-reply** podrška

---

## Setup koraci:

### 1. Napravi EmailJS nalog

1. Idi na: https://www.emailjs.com/
2. Klikni **Sign Up** (besplatno)
3. Verifikuj email adresu

### 2. Dodaj Email Service

1. U EmailJS dashboard-u, idi na **Email Services**
2. Klikni **Add New Service**
3. Izaberi **Gmail** (ili bilo koji drugi provider)
4. **Za Gmail:**
   - Klikni **Connect Account**
   - Login sa **nova-solutions@novastudiosolutions.com** (ili bilo koji Gmail)
   - Odobri pristup
5. **Alternativno (PrivateEmail):**
   - Izaberi **Custom SMTP Service**
   - SMTP Server: `mail.privateemail.com`
   - Port: `465`
   - Username: `nova-solutions@novastudiosolutions.com`
   - Password: `Buca999.`
   - Secure: ✅ SSL/TLS
6. Klikni **Create Service**
7. **Sačuvaj Service ID** (npr. `service_abc123`)

### 3. Kreiraj Email Template

1. Idi na **Email Templates**
2. Klikni **Create New Template**
3. **Template Settings:**
   - Template Name: `contact_form`
   - Subject: `Nova kontakt forma - {{project_type}}`
   - To Email: `nova-solutions@novastudiosolutions.com`

4. **Email Content (HTML):**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #00D4FF; border-bottom: 2px solid #00D4FF; padding-bottom: 10px;">
    Nova Kontakt Forma
  </h2>

  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Ime:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> <a href="mailto:{{from_email}}">{{from_email}}</a></p>
    <p><strong>Kompanija:</strong> {{company}}</p>
    <p><strong>Telefon:</strong> {{phone}}</p>
    <p><strong>Tip projekta:</strong> {{project_type}}</p>
    <p><strong>Budžet:</strong> {{budget}}</p>
    <p><strong>Vremenski okvir:</strong> {{timeline}}</p>
  </div>

  <div style="background: #fff; padding: 20px; border-left: 4px solid #00D4FF; margin: 20px 0;">
    <p><strong>Poruka:</strong></p>
    <p style="white-space: pre-wrap;">{{message}}</p>
  </div>

  <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

  <p style="font-size: 12px; color: #666;">
    Poslato sa www.novastudiosolutions.com<br>
    Reply-To: {{reply_to}}
  </p>
</div>
```

5. Klikni **Save**
6. **Sačuvaj Template ID** (npr. `template_xyz789`)

### 4. (OPCIONO) Auto-Reply Template

Ako želiš da klijent dobije automatski odgovor:

1. Kreiraj novi template: `contact_form_autoreply`
2. **Settings:**
   - Subject: `Potvrda prijema - Nova Studio Solutions`
   - To Email: `{{from_email}}` ← **Važno!**

3. **Content:**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #00D4FF;">Hvala na kontaktu!</h2>

  <p>Poštovani/a {{from_name}},</p>

  <p>Primili smo vašu poruku i kontaktiraćemo vas u roku od <strong>24 sata</strong>.</p>

  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Detalji vašeg upita:</strong></p>
    <ul style="list-style: none; padding: 0;">
      <li>✓ Tip projekta: {{project_type}}</li>
      <li>✓ Budžet: {{budget}}</li>
      <li>✓ Vremenski okvir: {{timeline}}</li>
    </ul>
  </div>

  <p>Naš tim će detaljno razmotriti vašu poruku.</p>

  <p style="margin-top: 30px;">
    S poštovanjem,<br>
    <strong>Nova Studio Solutions Tim</strong>
  </p>

  <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

  <div style="font-size: 12px; color: #666;">
    <strong>Nova Studio Solutions</strong><br>
    Email: nova-solutions@novastudiosolutions.com<br>
    Web: www.novastudiosolutions.com
  </div>
</div>
```

### 5. Kopiraj Keys

1. Idi na **Account** (gore desno)
2. Kopiraj **Public Key** (npr. `abcdefgh12345678`)

### 6. Dodaj Environment Variables

Kreiraj `.env` file u root folderu:

```bash
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcdefgh12345678
```

**Za production (AWS Amplify):**

1. Idi na Amplify Console
2. Otvori tvoj app > **Environment variables**
3. Dodaj:
   - `VITE_EMAILJS_SERVICE_ID` = `service_abc123`
   - `VITE_EMAILJS_TEMPLATE_ID` = `template_xyz789`
   - `VITE_EMAILJS_PUBLIC_KEY` = `abcdefgh12345678`

### 7. Test lokalno

```bash
npm run dev:frontend
```

Idi na http://localhost:3006, popuni contact formu i testiraj!

### 8. Deploy

```bash
git add .
git commit -m "Add EmailJS integration for contact form"
git push
```

AWS Amplify će automatski deployovati! 🚀

---

## Verifikacija template parameters

Proveri da su svi parametri u template-u povezani:

✅ Template parametri koji se koriste:
- `{{from_name}}` ← data.name
- `{{from_email}}` ← data.email
- `{{company}}` ← data.company
- `{{phone}}` ← data.phone
- `{{project_type}}` ← data.projectType
- `{{budget}}` ← data.budget
- `{{timeline}}` ← data.timeline
- `{{message}}` ← data.message
- `{{reply_to}}` ← data.email

---

## Troubleshooting

### Email se ne šalje?
1. Proveri da su svi env variables postavljeni
2. Proveri da je Email Service povezan (zelena lampica u EmailJS dashboard-u)
3. Proveri browser console za greške
4. Proveri EmailJS dashboard > **Logs** za detaljnije info

### Gmail blokira slanje?
1. Koristi **App Password** umesto običnog password-a
2. Omogući "Less secure app access" (u Gmail security settings)
3. Ili koristi EmailJS **Gmail service** (direktna OAuth2 konekcija)

### 403 Forbidden greška?
- Public Key nije validan
- Email Service nije aktivan
- Template ID nije validan

---

## Besplatni tier limits

EmailJS besplatni tier:
- ✅ **200 emailova/mesečno** (dovoljno za contact form)
- ✅ Neograničen broj templates
- ✅ Auto-reply podrška
- ✅ CAPTCHA zaštita (opciono)

Ako ti treba više, paid plan:
- $15/mesec = 1000 emailova
- $35/mesec = 5000 emailova

---

## Sigurnost

EmailJS automatski štiti od:
- ❌ Spam abuse (rate limiting)
- ❌ Bot attacks (CAPTCHA opciono)
- ❌ Email injection attacks

**Public key je siguran** - može biti u frontend kodu, jer EmailJS kontroliše slanje na backend-u.

---

## Status: ✅ GOTOVO!

Contact forma sada radi potpuno **bez servera**, **bez AWS-a**, **bez backend koda**!

Sve što trebaš je:
1. ✅ Napravi EmailJS nalog (besplatno)
2. ✅ Konfiguriši service + template (5 min)
3. ✅ Dodaj env variables
4. ✅ Push to GitHub → Deploy!

---

**Next step:** Napravi EmailJS nalog i konfiguriši service + template!
