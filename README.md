# Kaotech Design & Consultancy Limited — Website

A responsive, five-page static website for Kaotech Design & Consultancy Limited.

## Pages

- `index.html` — Home, service cards, selected projects and leadership
- `about.html` — Company story, operating model, milestones, purpose, values and leadership
- `service.html` — Six service lines, specialist solutions and delivery process
- `project.html` — Project examples and current initiatives, with category filters
- `contact.html` — Office information, FAQs and project enquiry form

## Recent updates

- Replaced generic external photography with locally packaged, subject-matched engineering images: a fuel station, petroleum tank farm, water treatment plant, wastewater treatment basins, renewable energy installation, construction site, on-site engineering team, SCADA control room and bridge construction.
- Removed the CEO photograph from the website and replaced it with a custom illustrated engineering avatar.
- Simplified the About page so each main section has one clear section heading rather than a separate eyebrow heading plus a title.
- Added service detail pop-ups on the Home and Services pages. Each pop-up explains the selected service and includes a **Request this service** link.
- The service request link opens the Contact page with the selected service pre-filled in the enquiry form.
- The images used by the pages are stored in `assets/images/`; they do not rely on remote image URLs.

## Design system

The design uses the logo's engineering blue, metallic silver and gold accent, supported by deep navy and a cool light background.

- Engineering blue: `#087fbd`
- Deep navy: `#0a1d30`
- Metallic silver: `#c7d2d7`
- Gold accent: `#efb51b`
- Soft background: `#f4f7f8`

## How to preview

Open `index.html` directly in a modern browser, or serve the `keotech` folder with any static web server. No build process or package installation is required.

## Contact form note

The enquiry form prepares an email in the visitor's default email application addressed to `info@kaotechdesigns.com`; it does not send form data to a server. For direct web submissions and stored enquiries, connect a secure backend or form service before deployment.

## Assets

- `assets/kaotech-logo.jpg` — supplied company logo
- `assets/images/` — locally packaged industry photography and engineering avatar
- `assets/site.css` — responsive styles, page layouts and service modal design
- `assets/site.js` — mobile navigation, portfolio filters, service pop-ups, enquiry form handling, reveal effects and back-to-top control
- `reference-images/` — supplied reference screenshots, retained for reference and not used as live website images

Google Fonts are loaded from Google Fonts when internet access is available; the layout falls back to system sans-serif fonts when it is not.
