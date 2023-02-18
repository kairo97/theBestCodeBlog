document.querySelector("#new-post-form").addEventListener("submit",e=>{
    e.preventDefault();
    const postObj = {
        post:document.querySelector("#post-input").value
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