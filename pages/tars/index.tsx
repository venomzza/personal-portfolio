import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function TarsRedirect() {
  const router = useRouter();
  useEffect(() => {
    // Redirect back to homepage; this page was removed/disabled
    router.replace('/');
  }, [router]);
  return null;
}
