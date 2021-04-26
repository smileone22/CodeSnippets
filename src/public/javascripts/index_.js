allmodal=document.querySelector('.modal')
modal = document.querySelector("#modal-code-snippet");
modal2 = document.querySelector('#modal-comment');
ids=[];

function handleAdd(evt){
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

    //let modal = document.querySelector(".modal");
    modal.style.display = "none";
    location.reload();
}   
function main(){
    
    const url='http://localhost:3000/code_snippets/';
    const xhr= new XMLHttpRequest();
    xhr.open('GET', url,true);
    
    xhr.addEventListener('load',function(evt){
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

                for (let c of element.comments){
                    let post_com= document.querySelector('main').appendChild(
                        document.createElement('li')
                    );
                    post_com.setAttribute('class','post-comments');
                    post_com.textContent=c;
                }

                let commentBtn= document.querySelector('main').appendChild(
                    document.createElement('input')
                );
                commentBtn.setAttribute("type", "button");
                commentBtn.setAttribute("class", "create-comments");
                commentBtn.setAttribute("id", element._id);
                commentBtn.value='Comment';
                
                if (element._id!==""){
                    ids.push(element._id);
                }
                
            });
            document.querySelector('#btn-show-modal-code-snippet').addEventListener('click', function(evt){
                console.log('clicked');
                modal.style.display = "block";
                document.querySelector("#create-code-snippet").addEventListener('click',handleAdd);
                
                document.querySelector('.close').addEventListener('click',function(evt){
                    console.log('end!!');
                    //let modal = document.querySelector(".modal-content");
                    //modal.style.display = "none";
                    modal2.style.display="none";
                    modal.style.display="none";
                });
            })
        
            for (let id of ids){
                console.log(id);
                document.getElementById(id).addEventListener('click',function(evt){
                    console.log('comment..');
                    modal2.style.display = "block";
                    clicked_id= evt.target.id;
        
                document.querySelector('#create-comment.submit').addEventListener('click',function(evt){
                const newComment= document.querySelector("#comment-text").value;
                
                console.log('trying to add comment here');
                console.log(clicked_id);
                const req = new XMLHttpRequest();
                req.open('POST', '/code_snippets/'+String(clicked_id)+'/comments/',true);
                console.log('/code_snippets/'+String(clicked_id)+'/comments/');
                req.onreadystatechange = function() { // Call a function when the state changes.
                    if (req.readyState === XMLHttpRequest.DONE && this.status === 200) {
                        console.log(req.responseText);// Request finished. Do processing here.
                    }
                }
                req.setRequestHeader("Content-Type", "application/json");
                
                req.send(JSON.stringify({id: clicked_id, comment:newComment}));
                console.log('comment ended');
            
                //let modal = document.querySelector(".modal");
                modal2.style.display = "none";
                });
            
                });
            }
        } 


    });

    xhr.send();
    

    // document.querySelector('#btn-show-modal-code-snippet').addEventListener('click', function(evt){
    //     console.log('clicked');
    //     modal.style.display = "block";
    //     document.querySelector("#create-code-snippet").addEventListener('click',handleAdd);

    //     document.querySelector('.close').addEventListener('click',function(evt){
    //         console.log('end!!');
    //         //let modal = document.querySelector(".modal-content");
    //         //modal.style.display = "none";
    //         modal2.style.display="none";
    //         modal.style.display="none";
    //     });
    // })

    // for (let id of ids){
    //     console.log(id);
    //     document.getElementById(id).addEventListener('click',function(evt){
    //         console.log('comment..');
    //         modal2.style.display = "block";
    //         clicked_id= evt.target.id;

    //     document.querySelector('#create-comment.submit').addEventListener('click',function(evt){
    //     const newComment= document.querySelector("#comment-text").value;
        
    //     console.log('trying to add comment here');
    //     console.log(clicked_id);
    //     const req = new XMLHttpRequest();
    //     req.open('POST', '/code_snippets/'+String(clicked_id)+'/comments/',true);
    //     console.log('/code_snippets/'+String(clicked_id)+'/comments/');
    //     req.onreadystatechange = function() { // Call a function when the state changes.
    //         if (req.readyState === XMLHttpRequest.DONE && this.status === 200) {
    //             console.log(req.responseText);// Request finished. Do processing here.
    //         }
    //     }
    //     req.setRequestHeader("Content-Type", "application/json");
        
    //     req.send(JSON.stringify({id: clicked_id, comment:newComment}));
    //     console.log('comment ended');
    
    //     //let modal = document.querySelector(".modal");
    //     modal2.style.display = "none";
    //     });
    
    //     });
    // }
    
    

    // //comment button click
    // for (let id of ids){
    //     console.log(id);
    //     document.getElementById(id).addEventListener('click',function(evt){
    //         console.log('comment..');
    //         modal2.style.display = "block";
    //         clicked_id= evt.target.id;

    // document.querySelector('#create-comment.submit').addEventListener('click',function(evt){
    //     const newComment= document.querySelector("#comment-text").value;
        
        
        
    //     console.log('trying to add comment here');
    //     console.log(clicked_id);
    //     const req = new XMLHttpRequest();
    //     req.open('POST', '/code_snippets/'+String(clicked_id)+'/comments/',true);
    //     console.log('/code_snippets/'+String(clicked_id)+'/comments/');
    //     req.onreadystatechange = function() { // Call a function when the state changes.
    //         if (req.readyState === XMLHttpRequest.DONE && this.status === 200) {
    //             console.log(req.responseText);// Request finished. Do processing here.
    //         }
    //     }
    //     req.setRequestHeader("Content-Type", "application/json");
        
    //     req.send(JSON.stringify({id: clicked_id, comment:newComment}));
    //     console.log('comment ended');
    
    //     //let modal = document.querySelector(".modal");
    //     modal2.style.display = "none";
    //     });
    
    //     });
    // }
    // //it should show the provided modal with a form for submitting a comment> does not process this code!! 
    // //it should also set the form's hidden field for id to the _id of the Code Snippet that is being commented

    
}


document.addEventListener("DOMContentLoaded", main);
