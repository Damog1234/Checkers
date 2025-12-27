export default async function handler(req, res) {
  const { username } = req.query;
  const guildId = "1237055789441487021";
  try {
    const response = await fetch(`https://mee6.xyz/api/plugins/levels/leaderboard/${guildId}`);
    const data = await response.json();
    const player = data.players.find(p => p.username.toLowerCase() === username.toLowerCase());
    if (player) res.status(200).json({ ...player, rank: player.rank + 1 });
    else res.status(404).json({ error: "Not found" });
  } catch (e) {
    res.status(500).json({ error: "API Error" });
  }
}
