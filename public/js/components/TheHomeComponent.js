import TheMovieThumbnail from './TheMovieThumbnailComponent.js';

export default {
    name: "TheHomeComponent",

    props: ['currentuser'],

    template: `
    <div class="container">
        <div class="row">
            <div class="col-12 order-2 order-md-1 col-md-3 media-container">
                <h4 class="media-title">{{currentMediaDetails.movies_title}}</h4>
                <p class="media-details" v-html="currentMediaDetails.movies_storyline"></p>
                <span class="media-time">{{currentMediaDetails.movies_runtime}}</span>
                <span class="media-year">Released in {{currentMediaDetails.movies_year}}</span>
            </div>

            <div class="col-12 order-1 order-md-2 col-md-9 media-container">
                <video autoplay controls muted :src="'video/' + currentMediaDetails.movies_trailer" class="fs-video"></video>
            </div>
        </div>

        <div class="row"> <!-- 2-up for nav and media info -->
            <nav class="col-12 col-sm-3 side-nav">
                <ul class="media-type">
                    <router-link v-for="media in mediaTypes" :to="media.url">    
                        <li :data-type="media.description">
                            <span>
                                <i v-bind:class="[media.iconClass]"></i>
                            </span>
                            
                            <span class="d-none d-md-block">{{ media.description }}</span>
                        </li>
                    </router-link>
                </ul>
            </nav>

            <div class="col-12 col-sm-9 media-info">
                <!-- genres for video -->
                <ul class="media-genres">
                    <li>
                        <a @click.prevent="filterMovies('action')" href="action">Action</a>
                    </li>
                    <li>
                        <a @click.prevent="filterMovies('comedy')" href="comedy">Comedy</a>
                    </li>
                    <li>
                        <a @click.prevent="filterMovies('family')" href="family">Family</a>
                    </li>
                    <li>
                        <a @click.prevent="filterMovies('fantasy')" href="fantasy">Fantasy</a>
                    </li>
                    <li>
                        <a @click.prevent="filterMovies('adventure')" href="adventure">Adventure</a>
                    </li>
                    <li>
                        <a @click.prevent="filterMovies('all')" href="all">All</a>
                    </li>
                </ul>

                <div class="thumb-wrapper clearfix">
                    <img v-for="media in retrievedMedia" :src="'images/video/' + media.movies_cover" alt="media thumb" class="img-thumbnail rounded float-left media-thumb" @click="switchCurrentMedia(media)">
                </div>
            </div>       
        </div> <!-- end 2-up for media info -->
    </div>
    `,

    data() {
        return {
            // push first (or random) media object here (selected / filtered on create)
            currentMediaDetails: {},

            // could add more media types here in future
            mediaTypes: [
                { iconClass: "fas fa-headphones", description: "audio", url: "/audio" },
                { iconClass: "fas fa-film", description: "video", url: "/home" },
                { iconClass: "fas fa-tv", description: "television", url: "television" }
            ],

            retrievedMedia: [],
        }
    },

    created: function() {
        this.loadMedia(null, 'movies');
        this.$emit('setuser', this.currentuser);
        // fetch('./TheHomeComponent.js')
        //     .then(res => res.json())
        //     .then(data => this.movies = this.filteredMovies = data)
    },

    methods: {
        filterMovies(genre) {
            if (genre === 'all') {
                this.loadMedia(null, 'movies')
            } else {
                this.loadMedia(genre, 'movies')
            }
        },

        loadMedia(filter, mediaType) {
            // fetch data here
            let url = (filter == null) ? `/api/${mediaType}` : `/api/${mediaType}/${filter}`;

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    this.retrievedMedia = data;

                    // pick a random media object from the array
                    this.currentMediaDetails = data[Math.floor(Math.random() * data.length)];
                })
            .catch((err) => console.error(err));
        },

        switchCurrentMedia(media) {
            this.currentMediaDetails = media;
        }
    },

    components: {
        moviethumb: TheMovieThumbnail,
    }
}