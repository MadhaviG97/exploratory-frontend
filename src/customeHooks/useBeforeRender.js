import { useState, useEffect } from "react";

export default function useBeforeRender(f) {
  const [hasRenderd, setHasRendered] = useState(false);

  useEffect(() => {
    setHasRendered(true);
  }, []);

  if (!hasRenderd) {
    f();
  }
}
