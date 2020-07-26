
class ElementWrapper {
	constructor(type) {
		// debugger;
		this.root = document.createElement(type)
	}
	setAttribute(name, value) {
	if(name.match(/^on([\s\S]+)$/)){
    	let eventName = RegExp.$1.replace(/^[\s\S]/,s=>s.toLowerCase());
    	console.log( RegExp.$1)
        this.root.addEventListener(eventName,value);
      }
      if(name === "className"){
      	name = "class";
      }
      this.root.setAttribute(name,value);
    }
	appendChild(vchild) {
		// debugger;
		vchild.mountTo(this.root)
	}
	mountTo(parent) {
		parent.appendChild(this.root)
	}
}


class TextWrapper {
	constructor(content) {
		this.root = document.createTextNode(content)
	}
	mountTo(parent) {
		parent.appendChild(this.root)
	}
}



export let ToyReact = {
	createElement (type, attributes, ...children) {
		// debugger;
		let element ;

		if(typeof type === 'string')
			element = new ElementWrapper(type);
		else
			element = new type;

		for(let name in attributes) {
			element.setAttribute(name, attributes[name])
		}
		let insertChildren = (children) => {

			for(let child of children) {
				if(typeof child === "object" && child instanceof Array) {
					insertChildren(children)
				} else {
					if (!(child instanceof ElementWrapper) && !(child instanceof TextWrapper) && !(child instanceof Component)){
						child = String(child)
					}
					if(typeof child === 'string') {
						child = new TextWrapper(child);
					}
					element.appendChild(child)
				}
				// debugger;
			}
		}

		insertChildren(children);
		return element;
	},
	render(vdom, element) {
		// debugger;
		vdom.mountTo(element)
	}
}





export class Component {
	constructor() {
		this.children = [];
		this.props = Object.create(null)
	}
	setAttribute(name, value) {
		this[name] = value;
		this.props[name] = value;

	}
	mountTo(parent) {
		let vdom = this.render()
		vdom.mountTo(parent);
	}
	appendChild(vchild) {
		this.children.push(vchild)
	}

	setState(state) {
      let merge = (oldState,newState) => {
        for(let p in newState){
          if(typeof newState[p] === "object" && newState[p] !== null){
            if(typeof oldState[p] !== "object"){
              if(newState[p] instanceof Array){
                oldState[p] = [];
              }else{
                oldState[p] = {};
              }
            }
            merge(oldState[p],newState[p]);
          }else{
            oldState[p] = newState[p];
          }
        }
      };
      if(!this.state && state){
        this.state = {};
      }
      merge(this.state,state);
      // this.update();
	}
}
