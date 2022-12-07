// business Logic file


// all the classes we created here just creates an API call wrapped in a promise, there is no need for any query or DOM alteration

// class for searching giphy based on user's input
export class SearchGiphyService {

    // the static method is just a method that returns a promise object, and we are returning a promise object because we did not store the promise in a variable just like we did before
    static getSearchedGif(userGif) {
        // using the return keyword for returning our promise so our function is not undefined


            // using the return keyword to fetch giphy's search endpoint url and passing user's value in it

            return fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${userGif}&limit=1&offset=0&rating=g&lang=en`)
            // no semicolons in fetch because of the .then()

            // since a fetch also returns a promise, we can use .then() on it 
            // the .then() will be used here will determine if I get a resolved promise(which should return me the data) or a rejected Promise(In this case I throw in an Error)

            .then( function(giphySearchResponse){
                // checking to see if giphyResponse has an ok property, if it does, then I have a successful response... If it doesn't I throw in an error that would be handled in the cath block
                if(!giphySearchResponse.ok){
                    // displaying the statusText property when handling my Errors
                    throw Error(giphySearchResponse.statusText);
                }
                    // calling the .json() method on my giphyResponse if I do get a successful call
                    giphySearchResponse.json();
            })

            // the catch block is where I handle the error I threw above in the if statement
            .catch( function(giphyError){
                // returning the giphyError parameter itself when I get an error
                return giphyError;
            })



    }

}

// a class for implementing random gifs for users

export class RandomGif {

    // a static method running the random API call
    // the static method is just a method that returns a promise object, and we are returning a promise object because we did not store the promise in a variable just like we did before

    static getRandomGif() {

            // fetching giphy's random endpoint(an endpoint is just like a url used for api calls)
            return fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=&rating=g`)

            //handling the Promise fetch would be returning for me with a .then()

            // a .then() that helps me to determine both a successful and an unsuccessful call
            // don't forget; a .then() method takes in an anonymous function
            .then( (giphyRandomResponse)=>{
                // using a branch to determine a resolved or a rejected promise
                if(!giphyRandomResponse.ok){
                    throw Error(giphyRandomResponse.statusText);
                }
                return giphyRandomResponse.json();
            })

            // a catch block for handling the error thrown above
            .catch( function(giphyRandomError){
                return giphyRandomError;
            })
    }
}


// a class for implementing trending gifs for users

export class TrendingGif {

    // a static method for running the trending gif API call
    
    static getTrendingGif() {



            // fetching a giphy trend endpoint url for users

            return fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&tag=&rating=g`)

            .then( (giphyTrendResponse)=>{
                if(!giphyTrendResponse.ok){
                    throw Error(giphyTrendResponse);
                }
                return giphyTrendResponse.json();
            })

            // the .catch block for handling the errors thrown above
            .catch((giphyTrendError)=>{
                return giphyTrendError;
            })
    }
}