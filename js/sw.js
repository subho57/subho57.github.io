const CACHE_VERSION = 'cache-v1' // increment this when updating the web site

// add more static assets to cache
const filesToCache=[
    "index.html",
    "images/activity/blogger.png",
    "images/activity/cc.png",
    "images/activity/hackerrank.png",
    "images/activity/hackthebox.png",
    "images/activity/udemy.png",
    "images/favicons/favicon.ico",
    "images/projects/content.jpg",
    "images/projects/content_finder.jpg",
    "images/projects/ems.jpg",
    "images/projects/ems_cover.jpg",
    "images/subho57.jpg",
    "images/subho57_new.jpg",
    "images/subho57_new.jpeg",
    "fonts/ionicons790f.woff",
    "fonts/ionicons790f.ttf",
    "fonts/ionicons790f.woff"
]
self.addEventListener(
    'install',
    function (event) {

        // start caching assets
        console.log('Installing service worker...')
        event.waitUntil(
            // open a new cache space
            caches.open(CACHE_VERSION)
                .then(function (cache) {
                    return cache.addAll(filesToCache)
                })
        )

    })


self.addEventListener(
    'activate',
    async function (event) {
        event.waitUntil(
            // delete any other cache which is not the current version
            self.caches.keys().then(function (cacheKeys) {
                cacheKeys.forEach(function (cacheKey) {
                    if (cacheKey != CACHE_VERSION) {
                        self.caches.delete(cacheKey)
                    }
                })
                return true
            })
        )
    }
)


self.addEventListener(
    'fetch',
    function (event) {
        event.respondWith(
            // check cache for a response
            caches.match(event.request)
                .then(async function (cachedResponse) {

                    // try to serve with cache first
                    if (cachedResponse) {
                        return cachedResponse
                    }
                    // else try to serve from network
                    try {
                        let freshResponse = await fetch(event.request)
                        if (freshResponse) {
                            return freshResponse
                        }
                    }
                    // show offline page if server is not reachable
                    catch (error) {

                        var offlinePageResponse = new Response(
                            '',
                            {
                                status: 302,
                                statusText: 'Found',
                                headers: {
                                    Location: 'index.html'
                                }
                            }
                        )
                        return offlinePageResponse
                        
                    }
                })
        )
    }
)


console.log('Service Worker loaded!')