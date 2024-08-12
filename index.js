import { env } from './env.js';

var doc = document.querySelector('html');
var tagWrapper = doc.querySelector('.tags');
var tags = [];
var arrTags = [];
var apiKey = env.oAuthConsumerKey;

var options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

addEventListener('DOMContentLoaded', () => {
    resetTagWrapper();
    var limit = 20;
    var retrieveMore = function(offset) {
        var url = new URL(`https://${env.apiBaseURL}${env.apiBlog}/posts?offset=${offset}`);
        url.searchParams.set('api_key', apiKey);
        var template = `<li>Loading</li>`;
        tagWrapper.innerHTML = template;
        fetch(url, options)
            .then((response) => response.json())
            .then((response) => {
                if (response) {
                    var posts = response?.response?.posts;
                    var totalPosts = response?.response?.total_posts;
                    var postLength = posts.length;
                    // lets push all of our tags to a new array
                    posts.map((item) => item.tags.map((tag) => tags.push(tag.toLowerCase())));
                    if (totalPosts >= offset && postLength !== 0) {
                        retrieveMore(offset + limit);
                    } else if (offset >= totalPosts) {
                        resetTagWrapper();
                        arrTags = [...new Set(tags.sort())];
                        setTags();
                    }
                }
            })
            .catch(err => console.log(err));
    }
    retrieveMore(0);

    var setTags = function() {
        arrTags.forEach((item) => {
            var itemHREF = item.replaceAll(' ', '+');
            var template = `<li><a href='https://${env.apiBlog}/tagged/${itemHREF}' target='_blank'>${item}</li>`;
            tagWrapper.innerHTML += template;
        });
    };

    function resetTagWrapper() {
        tagWrapper.replaceChildren();
    }
});
