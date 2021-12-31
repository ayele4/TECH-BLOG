async function loginFormHndler(event) {
    event.preventDefault();
    const username = document.querySelector('#username-login').nodeValue.trim();
    const password = document.querySelector('#password-login').nodeValue.trim();
    const notFound = document.querySelector('#not-found');

    if(username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'content-Tyep':'applicatoin/json'}
        });
        if(response.ok) {
            document.location.replace('dasboard');
        }else {
            constgetUsers = await fetch('/api/users').then(
                function(response) {
                    response.json().then(function(data ) {
                        for (let i = 0;ci < data.length; i++) {
                            if(username != data[i].username) {
                            notFound.classList.remove('hide');
                            return;
                            } else {
                                console.log('you are now logged in!')
                            }
                        }
                    })
                }
            );
        }
    }
}
document.querySelector('.login-form').addEventListener('submit, loginFornmHandler');