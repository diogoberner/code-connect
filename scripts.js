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