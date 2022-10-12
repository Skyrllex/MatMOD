var min = 0; max=1000; //RANDOM FLOAT
var maxim=25000000; //restriction of elements

function CheckPoint(n) ////checking the correspondence of the entered number
{
    if(n>min && n<maxim){
        let k = Number(n)
        return Complete(k);
    }
    else
        return Execution(n);
}
function refresh(){
window.location.reload (); 
}
window.onbeforeunload = function() {
    localStorage.setItem("point", $('#Point').val());
}

window.onload = function() {
    var name = localStorage.getItem("point");
    if (name !== null) {
        $('#Point').val("point"); return Complete(Number($('#Point').val("point")));
    }
}

function Complete(n) //successfully
{
    var Elem="Количество точек: " + n;
    alert(Elem);
    getArrayRandom(n);
}

function Execution(n) // unsuccessfully
{
    var Elem="Неверно введенны данные. Количество точек должно быть число от "+ min +" до " + maxim +". Вы ввели: " + n;
    alert(Elem);
    document.getElementById('Point').value="";
}

function getRadomFloat(min,max) // get random element 
{
    return Math.random() *(max-min) +min;
}

function getArrayRandom(n) //creating an array
{

    var arrX = [];
    for (var i=0, t=n; i<t; i++) {
    arrX.push(getRadomFloat(0,max));
    }
    var arrY = [];
    for (var i=0, t=n; i<t; i++) {
    arrY.push(getRadomFloat(0,max));
    }
    
    metodTwo(arrX,arrY, n);
    //GoDraw(arrX,arrY,n);
}

function GoDraw(X,Y,n, IX, IY, arrK) //draw on canvas
{
    //initialization
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
   
    //clear canvas
    context.clearRect(0, 0, max, max);
    context.beginPath();
    
    holst(X,Y,n, context); //need this function because we need clear canvas when draw new rect

    var k=0; // number of mouse positions 
    var rect=[]; // array of mouse positions

    //the function of reading mouse clicks
     canvas.addEventListener('mouseup', function (e) {
        //the x and y position of the mouse
        //offset relative to the canvas
        var x = e.pageX - e.target.offsetLeft,
        y = e.pageY - e.target.offsetTop;
        //adding to the beginning of the array
        rect.unshift(x,y);
        //number +2(x,y)
        k=k+2;

        //we need (x, y, x2, y2) for rect 
        if (k==4)
        {   
            context.clearRect(0, 0, max, max); //clear holst
            holst(X,Y,n, context);  //draw point and line
            //line option
            context.strokeStyle = "blue";
            context.lineWidth = 3;
            //draw rect
            context.beginPath();
            context.strokeRect(rect[0], rect[1], rect[2]-rect[0], rect[3]-rect[1]); //rect(beginX, beginY, wight, height)
            context.stroke();

            var rez=0;//sum in rect
            var time = performance.now(); //timer start
            //sum rect
            for (var i=0; i<n; i++) { 
              if ((X[i]>rect[0]&&X[i]<rect[2]&&Y[i]>rect[1]&&Y[i]<rect[3])|| (X[i]<rect[0]&&X[i]>rect[2]&&Y[i]<rect[1]&&Y[i]>rect[3])||(X[i]>rect[0]&&X[i]<rect[2]&&Y[i]<rect[1]&&Y[i]>rect[3])||(X[i]<rect[0]&&X[i]>rect[2]&&Y[i]>rect[1]&&Y[i]<rect[3]))
                rez=rez+1;
            }
            time = performance.now() - time;//timer stop
            var Elem = 'Время выполнения метода 1: ' + time;
            //passing value
            document.getElementById('rez').value = 'Метод 1:  ' + rez;
            document.getElementById('times2').value = Elem;
            //
            //method TWO
            var x1,x2,x3,x4,y1,y2,y3,y4;

            if( rect[0]<rect[2]&& rect[1]<rect[3]||rect[0]>rect[2]&& rect[1]>rect[3])
            {
                if (rect[0]<rect[2]&& rect[1]<rect[3]){
                    x1=rect[0];
                    x2=rect[2];
                    y1=rect[1];
                    y2=rect[3];
                }
                else if (rect[0]>rect[2]&& rect[1]>rect[3]){
                    x1=rect[2];
                    x2=rect[0];
                    y1=rect[3];
                    y2=rect[1];
                }
                x3=x2;
                x4=x1;
                y3=y1;
                y4=y2;
            }

            if ((rect[0]>rect[2]&& rect[1]<rect[3])||(rect[0]<rect[2]&& rect[1]>rect[3])){
                if (rect[0]>rect[2]&& rect[1]<rect[3]){
                    x3=rect[0];
                    x4=rect[2];
                    y3=rect[1];
                    y4=rect[3];
                }
                else if (rect[0]<rect[2]&& rect[1]>rect[3]){
                    x3=rect[2];
                    x4=rect[0];
                    y3=rect[3];
                    y4=rect[1];
                }
                x1=x4;
                x2=x3;
                y1=y3;
                y2=y4;
                }

            var time2 = performance.now(); //timer start        
            var rez2= Math.abs(easySort(IX, IY, X, Y, x3, y3, n, arrK)-  easySort (IX, IY, X, Y, x2, y2, n, arrK)- easySort (IX, IY, X, Y, x1, y1, n, arrK)+ easySort (IX, IY, X, Y, x4, y4, n, arrK));
            time2 = performance.now() - time2;//timer stop
            var Elem = 'Время выполнения метода 2: ' + time2;
            document.getElementById('rez2').value = 'Метод 2: ' + rez2;
            document.getElementById('times1').value = Elem;
            k=0;//because we need rect again
            //console.log(times);
            //console.log(times2);   
            x1, x2,x3,x4,y1,y2,y3,y4=null;
            rez2=null;
        }
         
    });

}

function holst(X,Y, n, context){
    //line option
    context.lineWidth = 20;
    context.strokeStyle = "red";
    //line x
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(0,max);
    context.lineCap = "round";
    context.stroke();
    //line y
    context.beginPath();
    context.moveTo(0,max);
    context.lineTo(max,max);
    context.lineCap = "round";
    context.stroke();

    //line option
    context.lineWidth = 8;
    context.strokeStyle = "black";
    //drawing an array
    for(var i=0;i<n; i++)
    {
        context.beginPath();
        //context.lineTo(X[i],Y[i]); //for chrom and other
        //context.moveTo(X[i],Y[i]);
        context.arc(X[i], Y[i], 1, 0, Math.PI*2); //for safari and everyone
        context.lineCap = "round";
        context.stroke();
    }
} 

function metodTwo(X, Y, n){
    var timeobrabotka = performance.now();
    //okay lets go
    var IX = X.slice();//copy array
    IX.sort(compareNumeric); //sort

    var IY = Y.slice();//copy array
    IY.sort(compareNumeric); //sort
    //we need index element okay
   
    sortforIdex(X,IX,n);
    sortforIdex(Y,IY,n);
    var arrK =[];
    //create array
    var l= n+1;
    for (var i = 0; i<l; i++)
    {
        arrK[i]= new Array(l);
    }

   for (var i = 0; i<l; i++)
   {
       arrK[i][0]=0;
   }

   for (var i=1;i<l;i++){
        for (var j=1;j<l;j++)
    {
        if (X[IY[j-1]] <= X[IX[i-1]])
        arrK[i][j]=arrK[i][j-1]+1;
        else  arrK[i][j]=arrK[i][j-1];
    }
}

    timeobrabotka = performance.now() - timeobrabotka
    GoDraw(X, Y, n, IX, IY, arrK);
    console.log(timeobrabotka);
    document.getElementById('times5').value = 'Предобработка = ' +timeobrabotka;
    //console.log(arrK);
}

function compareNumeric(a, b) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
}

function easySort (IX, IY, X, Y, rectx, recty, n, arrK)
{
    var x = midlSort(IX, X, rectx, n);
    var y = midlSort(IY, Y, recty, n);
    return arrK[x][y];
}

function midlSort(I,arr, rect, n){
    var top=0, bot=n, mid;
    while(bot - top> 1)
    {
        mid = Math.round((top+bot)/2);
        if (arr[I[mid]] < rect ) 
        top =mid;
        else bot = mid; 

    } 
    if (arr[I[bot]] < rect)
    return bot+1;
    if (arr[I[top]] > rect)
    return top;
    else
return bot;
  
}


function sortforIdex(arr1, arr2, n){
    var k=0;
    while (k<n){  //read index x
        for (var i=0; i<n; i++)
        if (arr2[k] == arr1[i]){
            arr2[k] = i;
            k++;        
        }
    }

}
function metodThree(X,Y,n){

    var IX = X.slice();
    IX.sort(compareNumeric);
    sortforIdex(X,IX,n);

    var three = new Three(X[IX[n/2]]);
    delete IX[n/2];
    
    var IY = Y.slice();
    delete IY[IX[n/2]];
    IY.sort(compareNumeric); 
    //we need index element okay
    child = sortforIdex(Y,IY,n);

    

}

function metodThree(){
    const BTS = new BinarySearchThree();
    BTS.insert(11);
    console.log(BTS);

}

class Node {
    constructor(data){
        this.data = data; //node value
        this.left = null; //left node child reference
        this.right = null; //right node child reference
    }
}

class BinarySearchThree{
    constructor(){
        this.root=null; //root bat
    }
    insert(data) {
        let newNode= new Node(data);
    
        if (this.root === null){
            this.root == newNode;
        } else {
            this.insertNode(this.root, newNode); //helper method below
        }
    }
    
    insertNode(node, newNode) {
        if (newNode.data < node.data){
            if (node.left===null){
                node.left = newNode;
            } else {
                this.isertNode(node.left, newNode)
            }
        } else {
            if (node.right===null){
                node.right= newNode;
            } else {
                this.isertNode(node.right, newNode)
            }
        }
    }
    
    inOrderTraverse(node, callback) {
        if(node != null){
            this.inOrderTraverse(node.left, callback);
            callback(node.data);
            this.inOrdetTraverse(node.right, callback);
        }
    }
    
    preOrderTraverse(nose,callback){
        if (node != null){
            callback(node.data);
            this.preOrderTraverse(node.left, callback);
            this.preOrderTraverse(note.right, callback);
        }
    }
    
    postOrderTraverse(node, callback){
        if (node != null){
            this.postOrderTraverse(node.left, callback);
            this.postOrderTraverse(node.right, callback);
            callback(node.data);
        }
    }
    
    search(node, data){
        if (node === null){
            return null;
        } else if (data < node.data){
            return this.search(node.left, data);
        } else if (data > node.data){
            return this.search(node.right, data);
        } else {
            return node;
        }
    }

    minNode(node){
        if (node.left == null)
        return node;
        else return this.findMinNode(node.left);
    }
    remove(data){
        this.root = this.removeNode(this.root, data);
    }
    removeNode(node, data){
        if (node==null){
            return null;
        } else if (data < node.data){
            node.left = this.removeNode(node.left, data);
            return node;
        } else if (data > nose.data){
            node.right = this.removeNode(node.right, data);
            return node;
        } else {
            if (node.left == null && node.right === null){
                node = null;
                return node;
            }
            if (node.left === null){
                node = node.right;
                return node;
            } else if (node.right === null){
                node = node.left;
                return nose;
            }
            let newNode = this.minNode(node.right);
            node.data = newNode.data;
            node.right = this.removeNode(node.right, newNode.data);
            return node;
        }
    }
    
}



