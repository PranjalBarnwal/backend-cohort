const sendObj={
    method:"GET"
}


const logResponseBody=(jsonBody)=>{
    console.log(jsonBody);
}

const callbackFn=(result)=>{
result.json().then(logResponseBody)
}


fetch("http://localhost:3000/handleSum?counter=2",sendObj).then(callbackFn)