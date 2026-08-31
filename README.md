# Pretty Little Layers website package

A responsive, multi-page static bakery website based on the supplied Pretty Little Layers mockup. It includes generated bakery photography, an easy-to-replace asset system, search metadata, structured data, a persistent front-end cart, and a demonstration checkout.

## Pages included

- `index.html` — Home
- `about.html` — About
- `menu.html` — Menu and starter pricing
- `custom-cakes.html` — Custom cake service and inquiry form
- `gallery.html` — Cake and dessert gallery
- `shop.html` — Front-end product shop
- `cart.html` — Persistent cart with quantity controls
- `checkout.html` — Pickup/delivery selection and mock order confirmation
- `contact.html` — Contact details and message form
- `faq.html` — Frequently asked questions
- `privacy.html` — Sample privacy policy
- `terms.html` — Sample terms and ordering policy

Shared styling is in `assets/css/styles.css`. Shared interactions are in `assets/js/main.js`; shop, cart, and checkout behaviour is in `assets/js/store.js`.

## Preview the website

For a quick look, open `index.html` in a browser. For the most reliable behaviour, serve the folder through any simple local web server or upload the entire folder to a static host such as Cloudflare Pages, Netlify, GitHub Pages, or traditional web hosting.

Do not move individual HTML pages away from the folder unless you also update their relative asset links.

## Replace the logo and icons

The package uses the logo artwork extracted from the supplied mockup:

- `assets/images/logo-pretty-little-layers-placeholder.png`
- `assets/images/logo-cake-icon-placeholder.png`
- `assets/images/favicon-placeholder.png`
- `assets/images/apple-touch-icon-placeholder.png`

To replace it, export the final logo as a transparent PNG with the same filename. A wide or nearly square logo works best. Replace the favicon with a square PNG at least 64×64 px and the app icon with a square PNG at least 180×180 px.

The current primary logo is a cleaned, high-resolution transparent version designed for the large hero overlay, navigation, and footer. The cake-only mark is used for the favicon and app icon. The earlier crop from the supplied mockup is retained as `logo-original-mockup-crop-backup.png` for reference.

## Visual strategy

The optimized palette is intentionally conversion-focused while staying true to the logo:

- Strawberry pink creates appetite appeal, excitement, and high-visibility order buttons.
- Peach adds warmth and a freshly baked feeling.
- Lavender gives the brand a distinctive premium, imaginative quality.
- Cream backgrounds keep the experience soft, calm, and easy to read.
- White borders and glossy shadows echo frosting and candy highlights without reducing accessibility.

The large transparent hero logo creates instant recognition from a distance. Strong primary calls to action use the highest-contrast pink treatment, while secondary actions remain visually quieter. Product photography stays dominant wherever customers are choosing what to order.

## Replace bakery photos

Keep the filenames below unchanged and replace each file inside `assets/images`. The layout will update automatically.

| Filename | Used for | Recommended crop |
| --- | --- | --- |
| `hero-cake-placeholder.jpg` | Home hero | Landscape, 3:2, at least 1800 px wide; subject right of centre |
| `custom-cakes-card-placeholder.jpg` | Category card, shop | Square, at least 1000×1000 px |
| `cupcakes-card-placeholder.jpg` | Category card, shop | Square, at least 1000×1000 px |
| `dessert-box-card-placeholder.jpg` | Category card, shop | Square, at least 1000×1000 px |
| `baker-about-placeholder.jpg` | Home/About portrait | Portrait, at least 1000×1400 px |
| `gallery-cake-01-placeholder.jpg` | Tiered cake | Square |
| `gallery-cake-02-placeholder.jpg` | Cupcakes | Square |
| `gallery-dessert-box-03-placeholder.jpg` | Dessert box | Square |
| `gallery-cake-04-placeholder.jpg` | Floral cake | Square |
| `gallery-cookies-05-placeholder.jpg` | Cookies | Square |
| `gallery-slices-06-placeholder.jpg` | Cake slices | Square |
| `og-social-preview-placeholder.jpg` | Social sharing preview | Landscape, ideally 1200×630 px |

Use compressed JPG or WebP photos. Aim for 150–350 KB per card image and under 500 KB for the hero. Keep the same descriptive subject when replacing a file, or update every matching `alt` attribute in the HTML.

## Update business information

Before launch, search all files for each sample value and replace every occurrence:

- `123 Sweet Lane`
- `Sugarville, CA 90210`
- `(123) 456-7890` and `+11234567890`
- `hello@prettylittlelayers.com`
- Sample opening hours
- Instagram and Facebook placeholder URLs
- Currency (`CAD`) if the business uses another currency
- Delivery fee (`12`) and delivery-area wording
- Sample prices, serving sizes, lead times, allergy wording, cancellation rules, and legal-policy dates

Prices and product details live in two places:

1. Visible menu text in `menu.html`.
2. Shop product data near the top of `assets/js/store.js`.

Keep those values aligned.

## Domain and SEO setup

The site is configured for `https://prettylittlelayers.ca` as its canonical public address. Visitors who use `www.prettylittlelayers.ca` should be permanently redirected to the root domain. This makes both addresses work while preventing duplicate search-engine listings.

The included `CNAME` file tells GitHub Pages to serve the site from `prettylittlelayers.ca`. In the GitHub repository, open **Settings → Pages**, publish from the `main` branch and root folder, enter `prettylittlelayers.ca` under **Custom domain**, and enable **Enforce HTTPS** once the certificate becomes available.

At the company where the domain's DNS is managed, add these records:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `cammcgug.github.io` |

The four AAAA records are optional, but if you use IPv6, keep the four A records too. Then:

- Remove conflicting `@` or `www` records before adding the new ones.
- Do not add a wildcard (`*`) DNS record for GitHub Pages.

DNS changes can take time to spread. Keep both the root and `www` records in place so GitHub can secure and redirect both hostnames.

Three common hosting configurations are included:

- `.htaccess` — Apache and many traditional web hosts
- `_redirects` — Netlify and compatible static hosts
- `vercel.json` — Vercel

For Cloudflare or another host, add both hostnames to the same site and create a permanent redirect from `www.prettylittlelayers.ca/*` to `https://prettylittlelayers.ca/$1`. The host must issue an SSL certificate covering both names.

Replace it in:

- Every HTML canonical tag
- Open Graph image and URL metadata
- JSON-LD structured data
- `sitemap.xml`
- `robots.txt`

Each public page already has a unique title and description. Review wording for the final city/service area. Update the address, phone, hours, price range, and social profiles in the home page LocalBusiness JSON-LD. Keep cart and checkout excluded from search indexing.

After publishing, submit `sitemap.xml` to Google Search Console and Bing Webmaster Tools. Validate structured data with Google’s Rich Results Test. Create a real 1200×630 social image and keep the existing placeholder filename, or update all related metadata.

## Responsive and mobile behaviour

The site includes layouts for large desktop, tablet, standard phone, and narrow phone widths. The navigation collapses to a menu button, the hero logo keeps its original aspect ratio, order buttons become full-width on small screens, cards and forms stack into one column, touch targets remain comfortably sized, and the cake photography moves below the hero copy instead of sitting behind important text.

When reviewing the finished deployment, test at approximately 1440 px, 1024 px, 768 px, 390 px, and 320 px wide. Also test both portrait and landscape orientation on a real phone.

## Connect the contact and custom-cake forms

The forms currently validate and display a success message only; they do not send information.

Two straightforward options:

1. Use a hosted form service such as Formspree, Basin, or Netlify Forms. Add the provider’s form endpoint and required attributes to the forms in `contact.html` and `custom-cakes.html`, then remove or adapt the demo form handler in `assets/js/main.js`.
2. Send forms to your own secure backend endpoint. Validate and sanitize every field on the server, add spam protection, send an acknowledgement email, and store only the information you need.

Never place private API keys in the HTML or JavaScript. Update the privacy policy to name the providers that receive form information.

## Connect real checkout and payments

The included shop is intentionally a mockup. It stores product IDs and quantities in browser `localStorage`, calculates a subtotal, applies a sample delivery fee, and creates a local confirmation number. It does not transmit orders, manage inventory, calculate tax, or accept payment.

For a real store, use a hosted commerce/payment flow such as Shopify, Square Online, Stripe Checkout, or WooCommerce:

1. Create matching products and prices in the provider.
2. Replace the mock submit handler in `assets/js/store.js` with a call to a secure server endpoint that creates a checkout session.
3. Redirect customers to the provider-hosted checkout page.
4. Verify completed payments through signed server-side webhooks before accepting an order.
5. Add tax, delivery radius, unavailable dates, inventory/capacity, order emails, refunds, and admin fulfilment tools.
6. Update Privacy and Terms pages with the provider, refund policy, cancellation window, tax rules, delivery terms, and legally required business details.

Do not collect or process raw card numbers in this static site.

## Generated image notes

The built-in OpenAI image generator created the bakery photography using the supplied mockup as a style/palette reference. The prompt set requested: a wide striped pastel hero cake; a floral drip cake; pastel cupcakes; an unbranded dessert gift box; a baker portrait; a two-tier floral cake; a rose-topped celebration cake; decorated heart cookies; and pastel cake slices. Every prompt specified realistic editorial food/lifestyle photography, soft diffused light, blush/lavender/peach/ivory colours, and no text, logos, labels, or watermarks.

The optimized brand pass used built-in ImageGen to create the transparent glossy logo overlay and a separate cake-only app icon from the supplied logo style. It also created the branded landscape social card with the exact text “Pretty Little Layers” and “Beautiful Cakes, Sweet Little Moments.”

## Final launch checklist

- Replace every sample business detail and placeholder social link.
- Confirm all prices, dates, delivery rules, serving guidance, and allergen statements.
- Replace the logo with the transparent master artwork if available.
- Connect and test forms, spam protection, order emails, and payment provider.
- Have Privacy and Terms reviewed for the actual business and location.
- Test keyboard navigation, mobile layouts, form errors, cart persistence, empty-cart flow, and confirmation flow.
- Test every link after deployment and run a performance/accessibility audit.
- Update canonical URLs, schema, sitemap, robots, and social preview for the final domain.
