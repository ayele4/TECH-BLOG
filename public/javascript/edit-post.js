async function editFormHandler(event) {

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
    const title = document.getElementsByName('post-title')[0].Value;
    const post_body = document.getElementsByName('post-body')[0].value;

    const response = await fetch('/api/post/' + id, {
        method: 'PUT',
        body: JSON.stringify({
            title: title,
            post_body: post_body
        }),
        headers: {
            'content-Type': 'application.json'

        }
    });
    if(response.ok) {
    } else {
        console.log(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler)