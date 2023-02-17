let al = document.querySelectorAll("#article-link");
let acs = document.querySelectorAll("#article-content-summary");
let ah = document.querySelectorAll("#article-heading");

const url = 'https://www.bbc.com/news';

window.onload = fireEvent();

let links = [];
let contents = [];
let summaries = [];

async function fireEvent() {
    const response = await fetch(url, { mode: 'cors' });
    const data = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    for (let i = 0; i < 10; i++) {
        const most_popular = doc.querySelectorAll('li[data-entityid="most-popular-read-'+(i+1)+'"]');
        const firstHeadline = most_popular[0];
        const link = firstHeadline.querySelector('a').getAttribute('href');
        links.push('https://www.bbc.com' + link);
        al[i].innerText = 'https://www.bbc.com' + link;
        ah[i].innerText = i+1;
    }
    for (let i = 0; i < 10; i++) {
        const text = await get_bbc_text(links[i]);
        contents.push(text);
        acs[i].innerText = text;
    }
}

async function get_bbc_text(url) {
    const response = await fetch(url, { mode: 'cors' });
    const data = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const body = doc.body;
    const root = body.querySelector('main');
    let text = "";
    if (root != null){
        const comps = root.querySelectorAll('div[data-component="text-block"]');
        for (const block of comps) {
          text += block.textContent;
        }
    }
    return text;
}
