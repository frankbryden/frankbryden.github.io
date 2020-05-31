const key = "b86a1d6ac9d6f96b9db60f5aeab11db9b4f09c92";
const root = "https://api.github.com";
const repoContents = "/repos/frankbryden/web-dev/contents/";
const projectList = "/repos/frankbryden/frankbryden.github.io/contents/";//projects.txt";
let myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};

class Item {
    constructor (title, link) {
        this.title = title;
        this.link = link;
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
        const projectList = this.fetchProjectList()
        /*for (let entry of data){
            if (entry.type == "dir"){
                //we need to request contents of outer directory - find the .html inside
                let path = this.fetchRootHtmlPath(entry.path);
                this.items.push(new Item(entry.name, path));
            }
        }*/
    }

    async fetchProjectList(){
        let contents = this.fetchContents(projectList);
        console.log(contents);
        for (let project of contents){
            if (file.name.endsWith(".html")){
                return file.download_url;
            }
        }
    }

    async fetchContents(path){
        console.log("Fetching " + (root + path) + "...");
        const resp = await fetch(root + path, {
            mode: "no-cors",
            headers: {
                "ref": "dev"
            }
        });
        return await resp.json();
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