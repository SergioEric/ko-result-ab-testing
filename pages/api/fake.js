export default function handler(req, res) {
  setTimeout(() => res.status(200).json({ price: "$360,000" }), 2000);
}
