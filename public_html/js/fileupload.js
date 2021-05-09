window.addEventListener("load", function () {
    var maxFileSize = '500mb';
    var uploader = new plupload.Uploader({
        runtimes: 'flash,html5,silverlight,browserplus,gears,html4',
        browse_button: 'pickfiles',
        max_file_count: 1,
        multi_selection: false,
        container: document.getElementById('container'),
        url: '/fileUpload/upload',
        chunk_size: '2000kb',
        max_retries: 2,
        filters: {
            max_file_size: maxFileSize,
            mime_types: [{extensions: "mp4"}]
        },
        init: {
            PostInit: function () {
                document.getElementById('filelist').innerHTML = '';
                // var $fileInput = $('#container').find('input[type="file"]');
                // $fileInput.attr('onchange', 'readVideo(event)');
            },
            Browse: function(up) {
                // Called when file picker is clicked
                console.log('[Browse]');
                $('#filelist').empty();
                $.each(uploader.files, function(i, file) {
                    uploader.removeFile(file);
                });
                // uploader.splice();
                // uploader.refresh();
            },
            FilesAdded: function (up, files) {

                plupload.each(files, function (file) {
                    console.log(file)
                     readVideo(file.getSource().getSource());
                    document.getElementById('filelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
                });

                // uploader.start();
            },
            UploadProgress: function (up, file) {
                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
            },
            UploadComplete: function (up, files) {
                // Called when all files are either uploaded or failed
                alert('gata boss');
            },
            Error: function (up, err) {
                // DO YOUR ERROR HANDLING!
                console.log(err);
                if (err.message == 'File size error.') {
                    alert('File too large. Maximum file size allowed ' + maxFileSize);
                }
            }
        }
    });
    uploader.init();


    $(document).on('click', '.upload', function (e) {
        e.preventDefault();
        uploader.start();
    });

});



function readVideo(file) {
    const videoSrc = document.querySelector("#video-source");
    const videoTag = document.querySelector("#video-tag");


        var reader = new FileReader();

        reader.onload = function (e) {
            console.log('loaded')
            $(videoTag).show();
            videoSrc.src = e.target.result

            videoTag.addEventListener('loadeddata', function() {
                // Video is loaded and can be played
                console.log('loaded full')
            }, false);
            videoTag.load();

        }.bind(this)

        reader.readAsDataURL(file);

}



//var $fileInput = $('#container').find('input[type="file"]');
// $(document).on('change', 'input[type="file"]', function (e) {
//     console.log(e.target.files);
//     readVideo(e);
// });

// function readVideo(event) {
//     const videoSrc = document.querySelector("#video-source");
//     const videoTag = document.querySelector("#video-tag");
//
//     console.log(event.target.files)
//     if (event.target.files && event.target.files[0]) {
//         var reader = new FileReader();
//
//         reader.onload = function (e) {
//             console.log('loaded')
//             $(videoTag).show();
//             videoSrc.src = e.target.result
//
//             videoTag.addEventListener('loadeddata', function() {
//                 // Video is loaded and can be played
//                 console.log('loaded full')
//             }, false);
//             videoTag.load();
//
//         }.bind(this)
//
//         reader.readAsDataURL(event.target.files[0]);
//     }
// }
