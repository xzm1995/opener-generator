module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: '只支持 POST 请求' });
    }

    const { apiKey, model, messages, temperature, maxTokens } = req.body;

    if (!apiKey || !model || !messages) {
        return res.status(400).json({ error: '缺少必要参数：apiKey、model 或 messages' });
    }

    try {
        const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: messages,
                temperature: parseFloat(temperature) || 0.7,
                max_tokens: parseInt(maxTokens) || 2000
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                error: data.error?.message || '豆包API调用失败',
                details: data
            });
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            error: '服务器内部错误',
            details: error.message
        });
    }
};
