const _URL = '/admin/api';

async function baseFetch(q = "") {
    let response = await fetch(_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: q,
        }),
    });
    let data = await response.json();
    data = data.data;
    return data
};

function formatDate() {
    let t = new Date(),
        y = t.getFullYear(),
        month = (t.getMonth() + 1) < 10 ? '0' + (t.getMonth() + 1) : (t.getMonth() + 1),
        d = t.getDate() < 10 ? '0' + t.getDate() : t.getDate();

    return [y, month, d].join("")
};

function getDomainFromUrl(url = "") {
    var arrUrl = url.split("//");
    return arrUrl[1].split("/")[0];
};

function baseKnowledge(param = {
    isTop: true,
    orderBy: "createTime_DESC",
    skip: 0,
    first: 10
}) {
    return `
    query {
        allKnowledges(
            where: { 
                isTop: ${param.isTop}, 
                isPublic: true,
                #${param.isTop == true ? `#createTime_gt:"${formatDate()}"` : ""}
            },
            skip:${param.skip || 0},
            first:${param.first || 10},
            orderBy: "${param.orderBy}") {
            name
            createTime
            category {
            name
            }
            tags {
            name
            }
            brief
            url
            image{
                publicUrl
            }
        }
        }`;
};

function baseKnowledgeIds(param = {
    orderBy: "createTime_DESC",
    skip: 0,
    first: 10
}) {
    return `
    query {
        allKnowledges(
            where: { 
                isTop:false,
                isPublic: true,
            },
            skip:${param.skip || 0},
            first:${param.first || 10},
            orderBy: "${param.orderBy}") {
            name
            id
        }
        }`;
};

async function getCategory() {

    return await baseFetch(`
    query{
        allCategories{
            name
        }
        }
    `);
};

async function getKnowledgesOfTop() {
    return await baseFetch(baseKnowledge({
        isTop: true,
        orderBy: "createTime_DESC"
    }));
};

async function getKnowledgesByNew() {
    return await baseFetch(baseKnowledge({
        isTop: false,
        orderBy: "createTime_DESC"
    }));
}

async function getKnowledgesOneByOne(index = 0) {
    return await baseFetch(baseKnowledge({
        isTop: false,
        orderBy: "createTime_DESC",
        skip: index,
        first: 1
    }));
};

async function getKnowledgeIds(){
    return await baseFetch(baseKnowledgeIds({
        orderBy: "createTime_DESC",
        skip: 0,
        first: 10
    }));
}


function parseKnowledgeData(k = {}) {
    if (k.brief) {
        k.content = markdown.toHTML(k.brief);
        let div = document.createElement("div");
        div.innerHTML = k.content;
        k.brief = div.querySelector("p").innerText;
        k.readTime = (Math.round(div.innerText.length / 250) || 1) + "min";
    };
    if (k.category) {
        k.category = Array.from(k.category, c => c.name);
    };
    if (k.tags) {
        k.tags = Array.from(k.tags, c => c.name);
    };
    if (k.image) {
        k.image = k.image ? k.image.publicUrl : null;
    };

    return k
};