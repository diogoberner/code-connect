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
const tagsList = document.getElementById("list-tags")

tagsList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-tag")) {
        const removeTag = e.target.parentElement
        tagsList.removeChild(removeTag)
    }
})

const avaliableTags = ["Front-End", "Back-End", "Full-Stack", "Programming", "HTML", "CSS", "JavaScript", "Data Science", "AI", "Java", "Python", "Ruby", "React", "Angular", "VueJS", "JSON"]

async function checkAvaliableTags(textTag) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(avaliableTags.includes(textTag))
        }, 1000)
    })    
}

tagsInput.addEventListener("keypress", async (e) => {
    
    if (e.key === "Enter"){
        e.preventDefault()
        const tagText = tagsInput.value.trim()

        
        if (await checkAvaliableTags(tagText)) {
            const newTag = document.createElement("li")
            newTag.innerHTML = `<p>${tagText}</p> <img src="./img/close-black.svg" class="remove-tag" />`
            tagsList.appendChild(newTag)
            tagsInput.value = ""
        } else {
            console.log("Tag não permitida!")
            tagsInput.value = ""
        }
    }
})