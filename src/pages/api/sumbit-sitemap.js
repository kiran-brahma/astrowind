// api/submit-sitemap.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'POST') { // Explicitly handle POST requests
    const sitemapUrl = `https://${process.env.VERCEL_URL}/sitemap-0.xml`;

    try {
      await fetch(`http://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
      console.log('Sitemap submitted to Google');

      await fetch(`http://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
      console.log('Sitemap submitted to Bing');

      res.status(200).send('Sitemap submitted successfully.');
    } catch (error) {
      console.error('Error submitting sitemap:', error);
      res.status(500).send('Error submitting sitemap.');
    }
  } else {
    res.status(405).end(); // Method Not Allowed for other request types
  }
}
