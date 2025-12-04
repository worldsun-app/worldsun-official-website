
export async function fetchStream<T>(
  url: string,
  options: RequestInit,
  onProgress: (progress: number) => void
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.body) {
    throw new Error("ReadableStream not available in response.");
  }

  const contentLength = response.headers.get('Content-Length');
  const total = contentLength ? parseInt(contentLength, 10) : 0;
  let loaded = 0;

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];

  return new Promise((resolve, reject) => {
    function read() {
      reader.read().then(({ done, value }) => {
        if (done) {
          onProgress(100);
          const body = new TextDecoder().decode(
            chunks.reduce((acc, chunk) => {
              const newAcc = new Uint8Array(acc.length + chunk.length);
              newAcc.set(acc);
              newAcc.set(chunk, acc.length);
              return newAcc;
            }, new Uint8Array(0))
          );
          try {
            resolve(JSON.parse(body) as T);
          } catch (e) {
            reject(new Error("Failed to parse response JSON."));
          }
          return;
        }

        if (value) {
          chunks.push(value);
          loaded += value.length;
          if (total > 0) {
            const progress = Math.round((loaded / total) * 100);
            onProgress(progress);
          }
        }

        read();
      }).catch(error => {
        console.error("Error reading stream:", error);
        reject(error);
      });
    }
    read();
  });
}
