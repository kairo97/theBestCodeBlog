document.querySelector("#new-post-form").addEventListener("submit",e=>{
    e.preventDefault();
    const postObj = {
        title:document.querySelector('#new-title-input').value,
        post:document.querySelector("#new-post-input").value
    }
    console.log(postObj)
    fetch("/api/posts",{
        method:"POST",
        body:JSON.stringify(postObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})