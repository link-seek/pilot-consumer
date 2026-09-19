import { describe, it } from "node:test";
import assert from "node:assert/strict";
import worker from "./worker.js";

describe("pilot backend (workers)", () => {
  it("GET /health returns ok", async () => {
    const res = await worker.fetch(new Request("http://localhost/health"));
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { status: "ok" });
  });

  it("unknown path returns 404", async () => {
    const res = await worker.fetch(new Request("http://localhost/nope"));
    assert.equal(res.status, 404);
    assert.deepEqual(await res.json(), { status: "not_found" });
  });
});
