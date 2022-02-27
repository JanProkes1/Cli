const ID = 'e3820170-809c-4199-be2b-7535479496a5'

window.onload = () => {
    const container = document.getElementById('users')

    fetch('http://167.172.175.168/' + ID + '/Clients').then(res => res.json()).then(users => {
        for (let i = 0; i < users.length; i++) {
            const card = document.createElement('div')
            card.className = 'card m-3'
            card.style.width = '18rem'
            const body = document.createElement('div')
            body.className = 'card-body'
            body.innerHTML = `
                <h5 class="card-title">${users[i].lastName} ${users[i].firstName}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${users[i].email}</h6>
            `

            const comments = document.createElement('button')
            comments.innerHTML = 'Comments'
            comments.addEventListener('click', () => {
                const modal = new bootstrap.Modal(document.getElementById('exampleModal'))
                modal.show()
                reloadComments(users, i)

                const send = document.getElementById('send')
                const comment = document.getElementById('comment')

                send.addEventListener('click', () => {
                    fetch('http://167.172.175.168/' + ID + '/Clients/' + users[i].id + "/Comments", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            body: comment.value
                        })
                    }).then(res => res.json()).then(data => reloadComments(users, i))
                })
            })

            const del = document.createElement('button')
            del.innerHTML = 'Remove'
            del.addEventListener('click', () => {
                fetch('http://167.172.175.168/' + ID + '/Clients/' + users[i].id, {
                    method: 'DELETE'
                }).then(res => location.reload())
            })

            const upt = document.createElement('button')
            upt.innerHTML = 'Update'
            upt.addEventListener('click', () => {
                body.innerHTML = `
                <h5 class="card-title"><input type="text" value="${users[i].lastName}" class="lastName"> <input type="text" class="firstName" value="${users[i].firstName}"></h5>
                <h6 class="card-subtitle mb-2 text-muted"><input class="email" type="email" value="${users[i].email}"></h6>
            `
                const ok = document.createElement('button')
                ok.innerHTML = 'OK'
                ok.addEventListener('click', () => {
                    fetch('http://167.172.175.168/' + ID + '/Clients/' + users[i].id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: body.querySelector('.email').value,
                            firstName: body.querySelector('.firstName').value,
                            lastName: body.querySelector('.lastName').value,
                        })
                    }).then(res => res.json()).then(data => window.location.reload())
                })
                body.appendChild(ok)
                body.appendChild(del)
                body.appendChild(comments)

            })

            body.appendChild(comments)
            body.appendChild(upt)
            body.appendChild(del)
            card.appendChild(body)
            container.appendChild(card)
        }
    })
}

function reloadComments(users, i) {
    const modalB = document.getElementById('body-modal')
    modalB.innerHTML = ''
    fetch('http://167.172.175.168/' + ID + '/Clients/' + users[i].id + "/Comments").then(res => res.json()).then(data => {
        for (let j = 0; j < data.length; j++) {
            const element = document.createElement('div')
            element.innerHTML = data[j].body
            modalB.appendChild(element)
        }
    })
}