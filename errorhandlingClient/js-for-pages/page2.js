
import { SERVER } from "../settings.js"
import { encode } from "../utils.js"
import {handleHttpErrors} from "../fetchUtils.js"


export async function loadAllQuotes() {
    try{
        const loadAll = await fetch(SERVER + "/api/quotes")
            .then(res => handleHttpErrors(res))
        const rows = loadAll.map(q => `
    <tr>
        <td>${encode(q.id)}</td>
        <td>${encode(q.quote)}</td>
        <td>${encode(q.ref)}</td>
    </tr>
  `).join("")
        document.getElementById("table-body").innerHTML = rows;
    }catch (err){
        document.getElementById("error").innerText = err.message
    }
}