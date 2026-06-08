export default async function handler(req, res) {
  const { code } = req.query;
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    })
  });
  const data = await response.json();
  const token = data.access_token;
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <script>
      window.opener.postMessage(
        'authorization:github:success:${JSON.stringify({ token, provider: 'github' })}',
        '*'
      );
      window.close();
    </script>
  `);
}
