this.onmessage = async(e) => {
    console.log(e);
    let res = await baseFetch("人工农")
    console.log(res);
}

const _URL = "https://www.baidu.com/s?tn=news&word=";

async function baseFetch(q = "") {
    let response = await fetch(_URL + q, {
        method: 'GET',
        mode: 'no-cors',
    });
    let data = await response.json();
    data = data.data;
    return data
};