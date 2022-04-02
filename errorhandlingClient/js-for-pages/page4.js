import { SERVER } from "../settings.js"
import {makeOptions,handleHttpErrors} from "../fetchUtils.js"

const SERVER_URL = SERVER + "/api/quotes"

export function page4Handlers() {
  document.getElementById("btn-find").onclick = findQuote
  document.getElementById("btn-edit").onclick = editQuote
  document.getElementById("btn-delete").onclick = deleteQuote
}


async function findQuote() {
  document.getElementById("error").innerText =""
  const id = getIdFromInputField()
  try{
    const findQuote = await fetch(`${SERVER_URL}/${id}`)
        .then(res => handleHttpErrors(res))
        .then(foundQuote =>{
          document.getElementById("quote").value = foundQuote.quote
          document.getElementById("author").value = foundQuote.ref
        })
  } catch (err){
    document.getElementById("error").innerText = err.message
    document.getElementById("quote").value = ""
    document.getElementById("author").value =""
  }
}

async function editQuote() {
  try{
  const id = getIdFromInputField()
    const editedQuote = {
      id: id,
      quote: document.getElementById("quote").value,
      ref: document.getElementById("author").value
    }
    const options = makeOptions("PUT",editedQuote)
    await fetch(SERVER_URL + "/" + id, options)
       .then(res => handleHttpErrors(res))
        clearFields()
  } catch (err){
    document.getElementById("error").innerText = err.message
  }

}
async function deleteQuote() {
  const id = getIdFromInputField()
  await fetch(SERVER_URL + "/" + id, {
    method: "DELETE"
  }).then(res => {
    res.text()
  })
  clearFields()
}

function clearFields() {
  document.getElementById("quote-id").value = ""
  document.getElementById("quote").value = ""
  document.getElementById("author").value = ""
}

function getIdFromInputField() {
  const id = document.getElementById("quote-id").value
  if (id === "") {
    throw new Error("No ID Provided")
  }
  return id
}
