// UserInterface Logic file

import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// importing all three classes to my UI logic
import { SearchGiphyService, RandomGif, TrendingGif } from "./giphy-service.js";

// importing my app logo image

import jsImage from "./assets/images/js-badge.svg";



// working with the imported classes

$(document).ready(function () {

    // for the imported Javascript logo for application
    let iconImg = $(".appImg");
    iconImg.attr("href", jsImage);

    $(".user-form").submit(function (event) {
        // preventing the submit button from refreshing 
        event.preventDefault();

        // taking in the user-emotion value

        const userGif = $("#user-emotion").val();
        // clearing out the form fields after user submits

        $("#user-emotion").val("");


        // a function that will work with the response I get and get me the searched gif

        function getSearchedGif(myFirstGiphyResponse) {
            // here I run a branch to determine if there is a data property in myFirstGiphyResponse, If there is then its a successful call


            if (myFirstGiphyResponse.data) {
                // getting and storing the gif embed url property
                const firstEmbeddedGifUrl = myFirstGiphyResponse.data[0].embed_url;

                // showing(in this case prepending) the gifs in the application for user
                $(".giphy-shower").prepend(
                    `
                <br> <br>
                    <h5>You entered; ${userGif}, here is a gif for you</h5> 
                <iframe src="${firstEmbeddedGifUrl}" height="300" width="290" frameborder="0" allowfullscreen></iframe>`
                );

            }
            else {
                // if there isn't any data property in myFirstGiphyResponse parameter, I handle the error as follows

                $(".giphy-shower").prepend(
                    // accessing the message property present in myFirstGiphyResponse to show my users the error they have
                    `
                    <br> <br>
                    <h5>There was an error processing your Request: ${myFirstGiphyResponse.message}</h5>    
                    <h5>Please Try again</h5>    
                `
                );
            }

        }

        // making use of the class I imported

        SearchGiphyService.getSearchedGif(userGif)

            // no semicolons all because of the .then() I want to use to handle the successful response
            .then(function (gottenSearchedGif) {
                getSearchedGif(gottenSearchedGif);
            })



    });


    $("#other-features").click(function () {

        let userPick = $("#new-features").find(":selected").val();
        console.log(userPick);

        if (userPick === "random") {

            // a function for random gifs that would be called when I handle me successful response

            function getRandomGif(mySecondGiphyResponse) {
                if (mySecondGiphyResponse.data) {
                    const secondEmbeddedGifUrl = mySecondGiphyResponse.data.embed_url;

                    // showing(in this case prepending) the gifs in the application for user
                    $(".gif-shower-two").prepend(
                        `
                            <br> <br>
                            <h5>A Random gif for user</h5> 
                            <iframe src="${secondEmbeddedGifUrl}" height="300" width="290" frameborder="0" allowfullscreen></iframe>`
                    );
                }
                else {

                    // if there isn't a main property in mySecondGiphyResponse, then handle the error as follows
                    $(".gif-shower-two").prepend(
                        `
                        <br> <br>
                        <h5>There was an error processing your Request: ${mySecondGiphyResponse.message}</h5>    
                        <h5>Please Try again</h5>    
                    `
                    );
                }

            }

            RandomGif.getRandomGif(userPick)

                .then(function (gottenRandomGif) {
                    getRandomGif(gottenRandomGif);
                })

        }
        else if (userPick === "trend") {

            function getTrendGif(myThirdGiphyResponse) {
                if (myThirdGiphyResponse.data) {
                    const thirdEmbeddedGifUrl = myThirdGiphyResponse.data[0].embed_url;

                    // showing(in this case prepending) the gifs in the application for user
                    $(".gif-shower-two").prepend(
                        `
                        <br> <br>
                        <h5>A Trending gif for user</h5> 
                        <iframe src="${thirdEmbeddedGifUrl}" height="300" width="290" frameborder="0" allowfullscreen></iframe>`
                    );

                }
                else {
                    $(".gif-shower-two").prepend(
                        `
                        <br> <br>
                        <h5>There was an error processing your Request: ${myThirdGiphyResponse}</h5>    
                        <h5>Please Try again</h5>    
                `
                    );
                }

            }

            // working with the TrendingGif class I imported
            TrendingGif.getTrendingGif(userPick)

                // a .then() that will handle the successful response by having a callback function 

                .then(function (gottenTrendGif) {
                    getTrendGif(gottenTrendGif);
                })


        }

    });


});





