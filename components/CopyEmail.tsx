"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="btn btn-ghost copy"
      data-done={done}
      onClick={() =>
        navigator.clipboard.writeText(email).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 2000);
        })
      }
    >
      {done ? "Copied" : "Copy address"}
    </button>
  );
}
