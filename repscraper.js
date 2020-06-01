const key = "b86a1d6ac9d6f96b9db60f5aeab11db9b4f09c92";
const root = "https://api.github.com";
const repoContents = "/repos/frankbryden/web-dev/contents/";
const projectList = "/repos/frankbryden/frankbryden.github.io/contents/projects.txt";
let myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};

class Item {
    constructor (title, data) {
        this.title = title;
        this.data = data;
    }
}

class GUI {
    constructor (){
        this.repoFetcher = new RepoFetcher();
    }

    init(){
        this.repoFetcher.fetchData();
    }
}

class RepoFetcher {
    constructor () {
        this.endpoint = root + repoContents;
        this.items = [];

    }

    async fetchData(){
        //const resp = await fetch(this.endpoint);
        //const data = await resp.json();
        const projectList = await this.fetchProjectList();
        console.log(projectList);
        for (let project of projectList){
            let projectHTML = await this.fetchContents(project + ".html");
            let projectJS = await this.fetchContents(project + ".js");
            let parts = project.split("/");
            let name = parts[parts.length - 1];
            this.items.push(new Item(name, {
                "html": projectHTML,
                "js": projectJS
            }));
        }
        
    }

    async fetchProjectList(){
        let contents = await this.fetchContents(projectList);
        return contents.split("\n");
    }

    async fetchContents(path){
        console.log("Fetching " + (root + path) + "...");
        /*const resp = await fetch(root + path);
        const raw = await resp.content;
        console.log(raw);
        let contents = raw.replace("\n", "");
        console.log("Before encoding " + contents);
        console.log("try 1 : " + btoa(contents));
        console.log("try 2 : " + atob(contents));*/
        let resp = await fetch(root + path);
        let jsonData = await resp.json();
        console.log(jsonData);
        let content = atob(jsonData.content.replace("\n", ""));

        return content;
    }


}

const myRequest = new Request('https://api.github.com', myInit);
const userAction = async () => {
    const response = await fetch(root + repoContents);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    
  }

let repoFetcher = new RepoFetcher();
repoFetcher.fetchData();