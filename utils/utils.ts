

export const callMyServer = async function (
    endpoint: string,
    isPost:boolean = false,
    postData:string = ''
  ) {
    let optionsObj
    if (isPost) {
        optionsObj = {
            method: "POST",
            headers: {
                "Content-type": "application/json" 
            },
            body: postData
        }
    } else {
        optionsObj = {
            method: "GET",
            headers: {
                "Content-type": "application/json" 
            },
            body: postData
        }
    }
    const response = await fetch(endpoint, optionsObj);
    if (response.status === 500) {
      await handleServerError(response);
      return;
    }
    const data = await response.json();
    console.log(`Result from calling ${endpoint}: ${JSON.stringify(data)}`);
    return data;
  };

  const handleServerError = async function (responseObject: Response) {
    const error = await responseObject.json();
    console.error("I received an error ", error);
    if (error.hasOwnProperty("error_message")) {
      showOutput(`Error: ${error.error_message} -- See console for more`);
    }
  };

  export const showOutput = function (textToShow: string) {
    if (textToShow == null) return;
    const output = document.querySelector("#output");
    output!.textContent = textToShow;
  };

  