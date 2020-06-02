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
        this.contentDiv = document.getElementById("content");
        this.menuDiv = document.getElementById("menu");
    }

    init(){
        this.repoFetcher.fetchData().then(this.loadMenu.bind(this));
        console.log(this.repoFetcher.items);
    }

    loadMenu(){
        let itemID = 0;
        let loadItem = this.loadItem.bind(this);
        for (let item of this.repoFetcher.items){
            //Create button
            let button = document.createElement("button");
            
            //Attach event listener and set ID to a local copy of the incremental id var
            let idCopy = itemID;
            button.addEventListener('click', (e) => {
                loadItem(idCopy);
            });
            button.id = item.title + "-btn";

            //Set the button text
            button.innerHTML = item.title;

            //add the button class to style it
            button.classList.add("button");
            
            //Add the button to the page
            this.menuDiv.appendChild(button);
            itemID += 1;
        }
    }

    loadItem(itemID){
        //clear the current element
        while (this.contentDiv.firstChild) {
            this.contentDiv.removeChild(this.contentDiv.firstChild);
          }
        
        console.log(`Loading item with id ${itemID}`);
        let item = this.repoFetcher.items[itemID];

        //Create div to which we will attach our shadow root
        let div = document.createElement("div");

       

        div.classList.add(item.title);
        let shadowRoot = div.attachShadow({'mode': 'open'});
        shadowRoot.innerHTML = item.data.html;
        
        this.contentDiv.appendChild(div);

        //the script tag which will contain the script for the project.
        //this element will be attached to the shadow
        let script = document.createElement("script");
        script.textContent = "(() => {" + item.data.js
                    .replace(`document.getElementById("myCanvas")`, `document.querySelector("#content > div").shadowRoot.querySelector("#myCanvas")`)
                    + "})();";
        
        shadowRoot.appendChild(script);
        console.log(item);
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
        console.log(this.items);
        
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

let gui = new GUI();
gui.init();