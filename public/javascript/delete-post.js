async function deleteFormHandler() {
    event.preventDefault();

    const response = await fetch('/api/posts/' + id,  {
        method: 'DELETE',
        body: JSON.stringify({
        post_id: id

        }),
        headers: {
            'content-Type': 'aplication/json'
        }
    });
    if(response.ok) {
            document.location.replace('/dashboared/');
    } else {
        console.log(response.statusText);
    }
}
  document.querySelector('.delet=post-btn').addEventListener('click', deletFormHnadler);      