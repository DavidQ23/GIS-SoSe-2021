async function communicate(_url: RequestInfo): Promise<void> {
    let response: Response = await fetch(_url);
    console.log("Response", response);
    let a: string = await response.json();
    console.log(a);
}

console.log("Start");
communicate("https://hs-furtwangen.github.io/GIS-SoSe-2021/content/2-chapter/L2.5/testjson.json");
console.log("End");