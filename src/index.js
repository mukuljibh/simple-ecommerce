const input = document.getElementById("myInput")
const target = document.getElementById("target")
input.addEventListener("input", (event) => {
    const input = event.target.value;
    if (input.length > 3) {
        fetch(`http://localhost:3000/search?qwery=${input}`)
            .then(response => response.json())
            .then((data) => {
                target.innerHTML = ""
                if (data.msg.length != 0) {
                    data.msg.forEach((data) => {
                        const container = document.createElement('div');
                        container.className = "border-2  w-60 h-80 inline-flex flex-col justify-end"
                        const imageDiv = document.createElement('div');
                        imageDiv.className = "h-fit self-center"
                        const img = document.createElement('img');
                        img.src = data.Image
                        img.width = "100"
                        img.height = "100"
                        imageDiv.appendChild(img)
                        container.appendChild(imageDiv)
                        const descriptionDiv = document.createElement('div');
                        descriptionDiv.className = "bg-zinc-100 font-bold text-center text-lg"
                        const productName = document.createElement('h1');
                        productName.textContent = data.Name
                        const description = document.createElement('p');
                        description.textContent = data.Description
                        description.className = "text-sm font-semibold"
                        const price = document.createElement('p');
                        price.textContent = `Rs ${data.Price}`
                        descriptionDiv.appendChild(productName)
                        descriptionDiv.appendChild(description)
                        descriptionDiv.appendChild(price)
                        container.appendChild(descriptionDiv)
                        target.appendChild(container)
                    })
                }
            }).catch((err) => {
                console.log("error")
            })
    }
})
