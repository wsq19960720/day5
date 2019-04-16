const gulp = require("gulp");
const scss = require("gulp-sass");
const minjs = require("gulp-uglify");
const mincss = require("gulp-clean-css");
const server = require("gulp-webserver");
const fs = require("fs");
const path = require("path");
const url = require("url");
gulp.task("js", () => {
    return gulp.src("./src/js/*.js")
        .pipe(minjs())
        .pipe(gulp.dest("./dist/js"))
})
gulp.task("css", () => {
    return gulp.src("./src/css/*.css")
        .pipe(mincss())
        .pipe(gulp.dest("./dist/css"))
})
gulp.task("scss", () => {
    return gulp.src("./src/css/scss/*.scss")
        .pipe(scss())
        .pipe(gulp.dest("./dist/scss"))
})
gulp.task("webser", () => {
    return gulp.src(".")
        .pipe(server({
            port: "8080",
            host: "localhost",
            open: true,
            livereload: true,
            directoryListing: true,
            middleware: (req, res) => {
                var paths = url.parse(req.url).pathname;
                if (req.url == "/") {
                    var view = fs.readFileSync(path.join(__dirname, "src", "index.html"))
                    res.end(view);
                } else {
                    var view = fs.readFileSync(path.join(__dirname, "src", paths))
                    res.end(view);
                }
                if (req.url == "/favicon.ico") return;
            }
        }))
})