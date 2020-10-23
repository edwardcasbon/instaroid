import 'whatwg-fetch';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';

/**
 * Get an Instagram's posts details.
 * 
 * @param {string} id ID of the instagram post.
 * @return {Promise} A promise containing the post details on success, or message on reject.
 */
const getPost = id => {
    const post = new Promise((resolve, reject) => {
        fetch(`https://www.instagram.com/p/${id}/`)
            .then(response => response.text())
            .then(response => {

                // Get the data from the Instagram response.
                const regex = /<script type=\"text\/javascript\">window._sharedData = (.*);<\/script>/ig;
                const script = response.match(regex);
                
                if (!script) {
                    reject('No data found');
                }

                // Parse the data as JSON.
                let json = JSON.parse(
                    script[0]
                        .replace('<script type="text/javascript">window._sharedData = ', '')
                        .replace(';</script>', '')
                );
                
                // If we have data, then resolve the promise with the info we need, else reject.
                if (!( 
                    json && 
                    json.entry_data && 
                    json.entry_data.PostPage
                )) {
                    reject('No post data found');
                } else {
                    resolve({
                        image: json.entry_data.PostPage[0].graphql.shortcode_media.display_url,
                        author: json.entry_data.PostPage[0].graphql.shortcode_media.owner.username,
                    });
                }
            })
            .catch(err => {

                // If there's a problem fetching, then error out, and reject the promise.
                window.console.error(err);
                reject(err);
            });
    });

    // Return the post promise.
    return post;
};

export {
    getPost,
};