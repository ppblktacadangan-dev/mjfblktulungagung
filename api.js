const GAS_URL = "https://script.google.com/macros/s/AKfycbylFThQLtuEBaEd6JVi72F0pdkinsn9Yln4O8VmenCtvKLBV-dxqYnqgOajhJpDPDJZOg/exec";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json; charset=utf-8", "Allow": "POST" },
      body: JSON.stringify({ ok: false, error: "Gunakan metode POST." })
    };
  }

  try {
    const requestBody = event.isBase64Encoded
      ? Buffer.from(event.body || "", "base64").toString("utf8")
      : (event.body || "{}");

    // Kirim sebagai text/plain agar Apps Script membaca JSON dari e.postData.contents.
    const upstream = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: requestBody,
      redirect: "follow"
    });

    const responseBody = await upstream.text();
    return {
      statusCode: upstream.ok ? 200 : upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      },
      body: responseBody
    };
  } catch (error) {
    console.error("MJF API proxy error:", error);
    return {
      statusCode: 502,
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
      body: JSON.stringify({ ok: false, error: "Netlify gagal menghubungi Google Apps Script." })
    };
  }
};
