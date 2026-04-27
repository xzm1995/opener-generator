// Cloudflare Workers 版本
export default {
  async fetch(request, env, ctx) {
    // 只处理 POST 请求
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const { model, messages, temperature, max_tokens } = await request.json();

      const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.ARK_API_KEY}`
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: temperature || 0.7,
          max_tokens: max_tokens || 2048
        })
      });

      const data = await response.json();
      
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};
