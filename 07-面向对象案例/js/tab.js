var that;
class Tab {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        this.ul = this.main.querySelector('.fisrstnav ul');
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }
    init() {
        this.undateNode();
        this.add.onclick = this.addTab;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.section[i].ondblclick = this.editTab;
        }
    }
    undateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.section = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
    }
    // 1.切换功能
    toggleTab() {
        that.clearClass();
        this.className = 'liactive';
        that.section[this.index].className = 'conactive';
    }
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.section[i].className = '';
        }
    }
    // 2.添加功能
    addTab() {
        var random = Math.random();
        that.clearClass();
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">测试' + random + '</section>';
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML('beforeend', section);
        that.init();

    }
    // 3.删除功能
    removeTab(e) {
        e.stopPropagation();
        var index = this.parentNode.index;
        console.log(index);
        that.lis[index].remove();
        that.section[index].remove();
        that.init();
        if(document.querySelector('.liactive')) return;
        index--;
        that.lis[index] && that.lis[index].click();
     }
    // 4.修改功能
    editTab() {
        var str = this.innerHTML;
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type = "text" />';
        var input = this.children[0];
        input.value = str;
        input.select();
        input.onblur = function() {
            this.parentNode.innerHTML = this.value;
        }
        input.onkeyup = function(e) {
            if(e.keyCode === 13) {
                this.blur();
            }
        }
     }
}
new Tab('#tab');