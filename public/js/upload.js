const { response } = require("express");

document.querySelector('#post-button').addEventListener('click', function(e) {
    e.preventDefault();
    let inputTitle = document.querySelector("#new-title").value;
    let inputText = document.querySelector('#new-post').value;

    fetch('api/posts', {
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({
            title: inputTitle,
            post: inputText
        })
    })
    .then((response)=> response.json())
    .then((data) => {
        console.log('Success:', data);
        location.reload();
    })
})