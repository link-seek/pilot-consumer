/// 试点最小后端（Cloudflare Workers 版）：只暴露 /health，供 CI/健康检查。
/// 与旧 Rust 版同构：/health -> {"status":"ok","timestamp":...}，其余 -> 404 {"status":"not_found"}。
/// 业务逻辑由后续迭代通过 issue 长出来。
export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/health") {
      return Response.json({ status: "ok", timestamp: Date.now(), version: "1.0.0" });
    }
    if (request.method === "GET" && url.pathname === "/ready") {
      return Response.json({ ready: true });
    }
    return Response.json({ status: "not_found" }, { status: 404 });
  },
};
