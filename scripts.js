const uploadBtn = document.getElementById("upload-btn")
const inputUpload = document.getElementById("image-upload")

uploadBtn.addEventListener("click", () => {
    inputUpload.click()
})

function readFileContent (file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = () => {
            resolve({ url: reader.result, name: file.name })
        }

        reader.onerror = () =>{
            reject(`Erro na leitura do arquivo ${file.name}`)
        }

        reader.readAsDataURL(file)
    })
}
const mainImage = document.querySelector(".main-image")
const imageName = document.querySelector(".container-image-name p")

inputUpload.addEventListener("change", async (e) => {
    const file = e.target.files[0]

    if (file) {
        try {
            const fileContent = await readFileContent(file)
        mainImage.src = fileContent.url
        imageName.textContent = fileContent.name
        } catch (error){
            console.log("Erro na leitura do arquivo")
        }
    }
})

const tagsInput = document.querySelector("#category")

tagsInput.addEventListener("keypress", (e) => {
    
    if (e.key === "Enter"){
        e.preventDefault()
        
        const tagText = tagsInput.value.trim()

        if (tagText !== "") {
            const tagsList = document.querySelector(".list-tags")
            const newTag = document.createElement("li")
            const tagName = document.createElement("p")
            tagName.textContent = e.target.value
            const tagImage = document.createElement("img")
            tagImage.src = "./img/close-black.svg"
            newTag.appendChild(tagName)
            newTag.appendChild(tagImage)
            tagsList.appendChild(newTag)
    
            tagsInput.value = ""
        }

    }
    

})