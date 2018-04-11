/**
 * 前端路由实践
 * hash 路由
 */
class Routers{

    constructor() {
        // 以键值对的形式存储路由
        this.routes = {};
        // 当前路由的URL
        this.currentUrl = '';
        // 记录出现过的hash
        this.history = [];
        // 指针，默认指向this.history的末尾，根据后退前进指向history中不同的hash
        this.currentIndex = this.history.length - 1;
        this.refresh = this.refresh.bind(this);
        this.backOff = this.backOff.bind(this);
        this.isBack = false;
        // 监听事件
        window.addEventListener('load',this.refresh, false);
        window.addEventListener('hashchange',this.refresh,false);
    }

    // 将path路径与对应的callback函数储存
    route(path, callback ){
        this.routes[path] = callback || function() {};
    }

    // 刷新
    refresh() {
        // 获取当前URL中的hash路径
        this.currentUrl = location.hash.slice(1) || '/';
        
        if (!this.isBack) {
            // 如果不是后退操作,且当前指针小于数组总长度,直接截取指针之前的部分储存下来

            // 此操作同时与浏览器自带后退功能的行为保持一致
            if (this.currentIndex < this.history.length - 1)
                this.history = this.history.slice(0, this.currentIndex + 1);

            // 将当前hash路由推入数组储存
            this.history.push(this.currentUrl);
            // 指针向前移动
            this.currentIndex++;
        }
        
        // 执行当前hash路径中的callback函数
        this.routes[this.currentUrl]();
        console.log('指针:', this.currentIndex, 'history:', this.history);
        this.isBack = false;
    }

    // 后退
    backOff() {
        // 后退操作设置为true
        this.isBack = true;
        this.currentIndex <= 0 
        ? (this.currentIndex = 0)
        : (this.currentIndex = this.currentIndex - 1);
        location.hash = `#${this.history[this.currentIndex]}`;
        this.routes[this.history[this.currentIndex]]();
    }
}

window.Router = new Routers();
const content = document.querySelector('body');
const button = document.querySelector('button');


// change Page background-color
function changeBgColor(color){
    content.style.backgroundColor = color;
}

Router.route('/',function(){
    changeBgColor('yellow');
});

Router.route('/blue',function(){
    changeBgColor('blue');
});

Router.route('/green',function(){
    changeBgColor('green');
});

button.addEventListener('click', Router.backOff, false);


