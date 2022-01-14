console.log('Welcome to Post Master');

// Utlity functions 
// 1.) Utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// Initializing No. of parameters for parameter box
let addedParamsCount = 0;
// Hide if JSON is selected(i.e. initially it will be hidden)
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// If users clicks on custom parameters, hide JSON box.
let paramsRadio = document.getElementById('customParam');
let JsonBox = document.getElementById('requestJsonBox');
paramsRadio.addEventListener('click', () => {
    parametersBox.style.display = 'block';
    JsonBox.style.display = 'none';
    params.style.display='block';
})

// If users clicks on JSON, hide parameters box.
let JsonRadio = document.getElementById('JSON');
JsonRadio.addEventListener('click', () => {
    JsonBox.style.display = 'block';
    parametersBox.style.display = 'none';
    params.style.display='none';
})

// If the user clicks on plus buttton, add more parameters

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let params = document.getElementById('params');
    addedParamsCount += 1;
    let str = ` <form class="row g-3 my-2">
                    <div id="parametersBox my-3 mx-3">
                        <div class="row col-auto">
                            <legend class="col-form-label col-sm-2 pt-0">Parameter ${addedParamsCount + 1}</legend>
                            <div class="col">
                                <input type="text" class="form-control" id="parameterKey${addedParamsCount + 1}" placeholder="Enter Parameter ${addedParamsCount + 1} Key"
                                    aria-label="Enter Parameter ${addedParamsCount + 1} Key">
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" id="parameterValue${addedParamsCount + 1}"
                                    placeholder="Enter Parameter ${addedParamsCount + 1} Value" aria-label="Enter Parameter ${addedParamsCount + 1} Value">
                            </div>
                            <div class="col-auto">
                               <button class="btn btn-primary mb-3 deleteParam">-</button>
                            </div>
                        </div>
                    </div>
                </form>`

    //Convert Element string to DOM node 
    let paramElement = getElementFromString(str);
    params.appendChild(paramElement);

    // Delete Button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.target.parentElement.parentElement.parentElement.parentElement.remove();
        })
    }
});

// Submit button
let submit = document.getElementById('submitBtn');
submit.addEventListener('click', () => {
    // Show Please wait in the response box to request Patience from the User
    document.getElementById('responsePrism').innerHTML = "Please Wait... while We Fetch Response";

    // Fetch all the values that user has entered
    let url = document.getElementById('urlInput').value;
    let requestType = document.querySelector('input[name="RequestRadios"]:checked').value;
    let contentType = document.querySelector('input[name="ContentRadios"]:checked').value;

    // If User has selected parameters option instead of JSON, collect all the parameters in an object.
    if (contentType == 'Parameters') {
        data = {};

        for (i = 0; i < addedParamsCount + 1; i++) {
            if (document.getElementById(`parameterKey${addedParamsCount + 1}`) != undefined) {
                let key = document.getElementById(`parameterKey${addedParamsCount + 1}`).value;
                let value = document.getElementById(`parameterValue${addedParamsCount + 1}`).value;
                data[key] = value;
            }
            else { }
            data = JSON.stringify(data);
        }
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }
    console.log(data);
    console.log(url);
    console.log(contentType);
    console.log(requestType);

    // If the request type is GET, invoke fetch api to create a post request.
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET'
        }).then(response => response.text())
        .then((text) => {
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        })
    }

    // If the request type is POST, invoke fetch api to create a post request.
    else{
        fetch(url, {
            method: 'POST',
            headers:{
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(response => response.text())
        .then((text) => {
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        })
    }
})

// To-Do-> Add Confirmation for deletion of parameters
// Check get using randomuser.me/api
// For get and post use- JSON placeholder