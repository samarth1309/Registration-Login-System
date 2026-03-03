
document.getElementById("signInForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const userData = {
        
        email: document.getElementById("email").value,
        password: document.getElementById("password").value

    };

    fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(userData)
    })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
        })
        .catch(err => console.log(err));
});