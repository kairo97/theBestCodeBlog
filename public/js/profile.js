document.querySelector("#new-post-form").addEventListener("submit",e=>{
    e.preventDefault();
    const chripObj = {
        chirp:document.querySelector("#post-input").value
    }
    console.log(chripObj)
    fetch("/api/posts",{
        method:"POST",
        body:JSON.stringify(chripObj),
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