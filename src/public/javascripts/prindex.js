// Write your client side Javascript code here
// as a single page web app. 
    // constructs an http request by retrieving the values of form elements
    // requests data from url constructed in the background (AJAX)
    // parses the result of the background request
    // modifies the DOM appropriately


// Implement routes to create an API for retrieving code snippets and adding new ones
// Implement routes to create an API for retrieving code snippets and adding new ones
// Use JavaScript to trigger background requests to the API from the form submit buttons
allmodal=document.querySelector('.modal')
modal = document.querySelector("#modal-code-snippet");
modal2 = document.querySelector('#modal-comment');
titles=[];
function handleAdd(evt){
    evt.preventDefault();
    const newSnippetTitle= document.querySelector("#code-snippet-title").value;
    const newSnippetCode= document.querySelector("#code-snippet-code").value;
    console.log(newSnippetTitle);
    console.log(newSnippetCode);
    const req = new XMLHttpRequest();
    req.open('POST', '/code_snippets/',true);
    req.onreadystatechange = function() { // Call a function when the state changes.
        if (req.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log(req.responseText);// Request finished. Do processing here.
        }
    }
    req.setRequestHeader("Content-Type", "application/json");
    
    req.send(JSON.stringify({title:newSnippetTitle, code:newSnippetCode}));
    console.log('send ended');

    let modal = document.querySelector(".modal");
    modal.style.display = "none";
    location.reload();
}


function main(){
    const url='http://localhost:3000/code_snippets/';
    const xhr= new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load',function(){
        if (xhr.status>=200 && xhr.status<400){
            const posts=JSON.parse(xhr.responseText);
            posts.forEach(element => {
                let post_title= document.querySelector('main').appendChild(
                    document.createElement('div')
                );
                post_title.setAttribute('class','post-title');
                post_title.textContent=element.title;
                
                let post_code= document.querySelector('main').appendChild(
                    document.createElement('div')
                );
                post_code.setAttribute('class','post-code');
                post_code.textContent=element.code;

                let post_com= document.querySelector('main').appendChild(
                    document.createElement('li')
                );
                post_com.setAttribute('class','post-comments');
                post_com.textContent=element.comment;

                let commentBtn= document.querySelector('main').appendChild(
                    document.createElement('input')
                );
                commentBtn.setAttribute("type", "button");
                commentBtn.setAttribute("class", "update-comments");
                commentBtn.setAttribute("id", element.title);
                commentBtn.value='Comment';
                
                if (element.title!==""){
                    titles.push(element.title);
                }
                
            });

        } 
    });

    document.querySelector('#btn-show-modal-code-snippet').addEventListener('click', function(evt){
        console.log('clicked');
        modal.style.display = "block";
    })

    document.querySelector("#create-code-snippet").addEventListener('click',handleAdd);
    document.querySelector('.close').addEventListener('click',function(evt){
        console.log('end!!');
        //let modal = document.querySelector(".modal-content");
        //modal.style.display = "none";
        //modal2.stype.display="none";
        modal.style.display="none";

    });


    for (let i=0;i<titles.length; i++){
        console.log(titles[i]);
        document.getElementById(titles[i]).addEventListener('click',function handleComment(evt){
            console.log('comment..');
            modal2.style.display = "block";
        });
    }
    //document.querySelector('.update-comments').addEventListener('click',handleComment);
    // const btns=document.querySelectorAll('.commentButton');
    // btns.forEach((btn)=> {
    //     btn.addEventListener('click', (event)=> {
    //         console.log("We are adding!")
    //         let cmodal= document.querySelector("#modal-comment");
    //         cmodal.style.display = "block";
    //     }, true);
    // });

    // const comments= document.querySelectorAll('.modal-comment');
    // for (let i;i<comments.length;i++){
    // comments[i].addEventListener('click',handleComment);
    // }
    xhr.send();
   
}


document.addEventListener("DOMContentLoaded", main);


