const express = require("express");
const router = express.Router();

router.get("/:chatbotId.js", (req, res) => {
  const chatbotId = req.params.chatbotId;
  const widgetUrl = `${process.env.BASE_URL}/widget/chat-widget.html?chatbotId=${chatbotId}`;

  const js = `
    (function(){
      const iframe = document.createElement('iframe');
      iframe.src = "${widgetUrl}";
      iframe.style.position = 'fixed';
      iframe.style.bottom = '80px';
      iframe.style.right = '20px';
      iframe.style.width = '400px';
      iframe.style.height = '600px';
      iframe.style.border = 'none';
      iframe.style.zIndex = '9999';
      iframe.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
      iframe.style.borderRadius = '12px';
      iframe.style.display = 'none';
      iframe.id = 'chatbot-widget-frame';
      document.body.appendChild(iframe);

      const toggle = document.createElement('div');
      toggle.innerHTML = '💬';
      toggle.style.position = 'fixed';
      toggle.style.bottom = '20px';
      toggle.style.right = '20px';
      toggle.style.width = '50px';
      toggle.style.height = '50px';
      toggle.style.borderRadius = '50%';
      toggle.style.background = '#007bff';
      toggle.style.color = '#fff';
      toggle.style.display = 'flex';
      toggle.style.alignItems = 'center';
      toggle.style.justifyContent = 'center';
      toggle.style.fontSize = '24px';
      toggle.style.cursor = 'pointer';
      toggle.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
      toggle.style.zIndex = '9999';
      document.body.appendChild(toggle);

      toggle.addEventListener('click', function() {
        const frame = document.getElementById('chatbot-widget-frame');
        if (frame.style.display === 'none') {
          frame.style.display = 'block';
        } else {
          frame.style.display = 'none';
        }
      });
    })();
  `;

  res.setHeader("Content-Type", "application/javascript");
  res.send(js);
});


module.exports = router;
