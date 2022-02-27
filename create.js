window.onload = () => {
    const fname = document.getElementById('fname')
    const lname = document.getElementById('lname')
    const email = document.getElementById('email')
    const button = document.getElementById('submit')

    const ID = 'e3820170-809c-4199-be2b-7535479496a5'

    button.addEventListener('click', () => {
        fetch('http://167.172.175.168/'+ID+'/Clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                firstName: fname.value,
                lastName: lname.value
            })
        }).then(res => {
            if(res.status === 200) document.location.href = './index.html'
        })
    })
}