const fetch=require("node-fetch");
// console.log(fetch)
async function getTags() {
    const GET_ALL_TAGS = `
        query GetTags {
        allTags {
            name
            id
        }
        }`;

    const response = await fetch('http://0.0.0.0:3000/admin/api', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: GET_ALL_TAGS,
        }),
    });
    let data = await response.json();
    // console.log(data)
    let tags = Array.from(data.data.allTags, d => { return d.name });

    return tags;
};

async function start(){
   let tags= await getTags();
   console.log(tags)
}

start();

