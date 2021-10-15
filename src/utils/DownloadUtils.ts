export function downloadURI(uri: string, name: string) {
    let link: HTMLAnchorElement | undefined = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link = undefined;
}