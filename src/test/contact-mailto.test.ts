import { describe, expect, it } from "vitest";
import { buildMailto } from "@/components/portfolio/Contact";
import { profile } from "@/data/portfolio";

describe("contact form mailto", () => {
  it("addresses messages to the portfolio owner's email", () => {
    const url = buildMailto(profile.email, { name: "Ana", email: "ana@x.io", subject: "Hi", message: "Hello" });
    expect(url.startsWith("mailto:abaidullahali92@gmail.com?")).toBe(true);
  });

  it("falls back to a default subject that names the sender", () => {
    const url = buildMailto(profile.email, { name: "Ana", email: "ana@x.io", subject: " ", message: "Hello" });
    expect(decodeURIComponent(url)).toContain("subject=Portfolio contact from Ana");
  });
});
