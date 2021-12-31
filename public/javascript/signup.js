async function signipFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').Value.trim();
    const password = document.quryselector('#password-signup').Value.trim();
    const takenUsername = document.querySelector('#taken');

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'content-Type': 'application/json'}
        });

        if(response.ok) {
            takenUsername.classList.add('hide');
            document.location.replace(dashboard);
        } else {
             const getUsers = await fetch('/api/users').then(
                 function(response) {
                     response.json().then(function(data) {
                         for (let i = 0; i < data.length; i++) {
                             if(username === data[i].username) {
                                 takenUsername.classList.remove('hide');
                                 return;
                             }
                         }
                     })
            });
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);