/**
 * Router
 * history 对象
*/

class Routers {
    constructor() {
        this.routes = {};
        this._bindPopState();
    }

    // 初始化路由
    init(path) {
        history.replaceState({path : path},null,path);
        this.routes[path] && this.routes[path]();
    }

    // 将路径和对应回调函数加入hashMap储存
    route(path, callback) {
        this.routes[path] = callback || function() {};
    }

    // 跳转
    go(path) {
        history.pushState({path: path}, null, path);
        this.routes[path] && this.routes[path]();
    }

    // 监听popstate事件
    _bindPopState() {
        window.addEventListener('popstate', e => {
            const path = e.state && e.state.path;
            this.route[path] && this.routes[path]();
        })
    }

}


window.Router = new Routers();
Router.init(location.pathname);
const content = document.querySelector('body');
const ul = document.querySelector('ul');
function changeBgColor(color) {
  content.style.backgroundColor = color;
}

Router.route('/', function() {
  changeBgColor('yellow');
});
Router.route('/blue', function() {
  changeBgColor('blue');
});
Router.route('/green', function() {
  changeBgColor('green');
});

ul.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    e.preventDefault();
    console.log(e.target.getAttribute('href'));
    Router.go(e.target.getAttribute('href'));
  }
});