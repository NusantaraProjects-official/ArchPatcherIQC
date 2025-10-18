export default async function handler(req, res) {
  try {
    const { text, chatTime, statusBarTime, bubbleColor, menuColor, textColor, fontName, signalName } = req.query;

    if (!text) {
      return res.status(400).json({ error: 'Text parameter required' });
    }

    const apiUrl = `https://anabot.my.id/api/maker/iqc?text=${encodeURIComponent(text)}&chatTime=${chatTime}&statusBarTime=${statusBarTime}&bubbleColor=%23${bubbleColor}&menuColor=%23${menuColor}&textColor=%23${textColor}&fontName=${fontName}&signalName=${signalName}&apikey=freeApikey`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`AnaBot API Error: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
