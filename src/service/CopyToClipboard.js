export default async function CopyToClipboard(text) {
  await navigator.clipboard.writeText(text);
}
