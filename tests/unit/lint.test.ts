import { describe, expect, it } from "vitest";
import { lintParams } from "../../src/features/rules/lint";

describe("lintParams", () => {
  it("flags missing required params", () => {
    const issues = lintParams({ params: { utm_source: "fb" }, required: ["utm_medium"] });
    expect(issues).toEqual([
      {
        type: "missing",
        field: "utm_medium",
        message: "utm_medium is required",
      },
    ]);
  });

  it("flags banned values and case", () => {
    const issues = lintParams({
      params: {
        utm_source: "FaceBook",
        utm_medium: "paid-social",
      },
      bannedValues: ["FaceBook"],
    });

    expect(issues).toMatchInlineSnapshot(`[
  {
    "field": "utm_source",
    "message": "FaceBook is not allowed",
    "type": "banned"
  },
  {
    "field": "utm_source",
    "fix": "facebook",
    "message": "utm_source should be lower_snake_case",
    "type": "case"
  },
  {
    "field": "utm_medium",
    "fix": "paid_social",
    "message": "utm_medium should be lower_snake_case",
    "type": "case"
  }
]`);
  });
});
