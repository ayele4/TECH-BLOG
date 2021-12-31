async function newFormHndler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').Value;
    const post_body = querySelector('textarea[name="post-body"]').value;

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_body
        }),
        headers: {
            'content-Type': 'application/json'
        }
    }),

    if(response.ok) {
        document.location.replace('/dashboard');
        } else {
            console.log(response.statusText);
        }
    }
 document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);