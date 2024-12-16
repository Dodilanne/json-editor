export type ReadFileEvent = Event & { currentTarget: EventTarget & HTMLInputElement };

export async function readFile(event: ReadFileEvent): Promise<unknown> {
  return new Promise((resolve) => {
    const filePath = event.currentTarget.files?.[0];
    if (!filePath) return;
    const reader = new FileReader();
    reader.addEventListener("load", (loadEvent) => {
      const result = loadEvent.target?.result;
      if (typeof result !== "string") {
        throw new Error("Unsupported file encoding");
      }
      const json = JSON.parse(result);
      resolve(json);
    });
    reader.readAsText(filePath);
  });
}

export function writeFile(data: unknown) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
  );
  a.setAttribute("download", "data.json");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
