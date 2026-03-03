
document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault();


    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        country: document.getElementById("country").value,
        phone: document.getElementById("phone").value,
        password: document.getElementById("password").value


    };
    console.log("User Data to be sent:", userData);  // 🔥 DEBUGGING

    fetch("http://127.0.0.1:5000/register", {
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