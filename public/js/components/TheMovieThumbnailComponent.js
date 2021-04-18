export default {
    name: "TheMovieThumbnail",

    props: ["movie"],

    template: `
    <div class="movie-thumb">
        <img class="img-thumbnail rounded float-left media-thumb" @click="loadPlayer(movie)" :src='"images/video/" + movie.movies_cover' alt="movie thumb">
    </div>
    `,

    methods: {
        loadPlayer(movie) {
            debugger;
        }
    }
}