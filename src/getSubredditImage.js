self.onmessage = async function(message){
    let requestURL = 'https://www.reddit.com/r/' + message.data + ".json?sr_detail=1"
    // console.log(requestURL)
    // fetch(requestURL).then(function (response) {
    //     // The API call was successful!
    //     console.log('success!', response);
    // }).catch(function (err) {
    //     // There was an error
    //     console.warn('Something went wrong.', err);
    // });    self.postMessage(value)

    async function getUrl(){
        await fetch(requestURL).then(function (response) {
            // The API call was successful!
            // self.postMessage(response.json())
            return response.json();}).then(function (data) {
            // This is the JSON from our response
            console.log(data);}).catch(function (err) {
            // There was an error
            console.warn('Something went wrong.', err);});
    }

    self.postMessage(getUrl())

    // let requestURL = 'https://www.reddit.com/r/' + message.data + ".json?sr_detail=1"
    // async function getUrl(){
    //     await fetch(requestURL).then(function (response) {
    //         // The API call was successful!
    //         // self.postMessage(response.json())
    //         return response.json();}).then(function (data) {
    //         // This is the JSON from our response
    //         console.log(data);}).catch(function (err) {
    //         // There was an error
    //         console.warn('Something went wrong.', err);});
    // }


}