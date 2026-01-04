export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;
    if (!name || !email || !message || message.replace(/\s/g, '').length < 5) {
      return res.status(400).json({ success: false, error: "Invalid message" });
    }
    console.log("Message received:", { name, email, message });
    return res.status(200).json({ success: true, message: "Message received!" });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
