const uploadBtn = document.getElementById("upload-btn")
const inputUpload = document.getElementById("image-upload")

uploadBtn.addEventListener("click", () => {
    inputUpload.click()
})

function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = () => {
            resolve({ url: reader.result, name: file.name })
        }

        reader.onerror = () => {
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
        } catch (error) {
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

    if (e.key === "Enter") {
        e.preventDefault()
        const tagText = tagsInput.value.trim()


        if (tagText !== "") {
            try {
                const existTag = await checkAvaliableTags(tagText)
                if (existTag) {
                    const newTag = document.createElement("li")
                    newTag.innerHTML = `<p>${tagText}</p> <img src="./img/close-black.svg" class="remove-tag" />`
                    tagsList.appendChild(newTag)
                    tagsInput.value = ""
                } else {
                    alert("Tag não foi encontrada!")
                    tagsInput.value = ""
                }
            } catch (error) {
                console.error("Erro ao verificar a existência da tag.")
                alert("Erro ao verificar a existência da tag. Verifique o console.")
            }
        }
    }
})

const publishBtn = document.querySelector(".button-publish")

async function publishProject(projectName, projectDesc, projectTags) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const itDidWork = Math.random() > 0.5
            console.log(Math.random())
            if (itDidWork) {
                resolve("Projeto publicado com sucesso!")
            } else {
                reject("Erro ao publicar o projeto!")
            }
        }, 2000)
    })
}

publishBtn.addEventListener("click", async (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const description = document.getElementById("description").value
    const tags = Array.from(tagsList.querySelectorAll("p")).map((tag) => tag.textContent)

    try {
        const result = await publishProject(name, description, tags)
        console.log(result)
        alert("Deu tudo certo!")
    } catch (error) {
        console.log("Deu errado: ", error)
        alert("Deu errado!")
    }
})

const discardBtn = document.querySelector(".button-discard")

discardBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const form = document.querySelector("form")
    form.reset()

    mainImage.src = "./img/imagem1.png"
    imageName.textContent = "imagem_project.png"

    tagsList.innerHTML = ""
})
