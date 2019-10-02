// Load RSS feed

function load_rss() {

    $.ajax({
            headers: { "Accept": "application/xml"},
            type: 'GET',
            url: 'https://cors-anywhere.herokuapp.com/https://basna.ir/fa/rss/allnews',
            crossDomain: true,
            beforeSend: function(xhr){
                // xhr.withCredentials = true;
                xhr.setRequestHeader(
                    'X-Requested-With',
                    {
                        toString: function() { return 'XMLHttpRequest'; }
                    }
                );
            },
            success: function(data, textStatus, request){
                var $xml = $(data);
                $('.modal-body').html('');
                $xml.find("item").each(function() {
                    var $this = $(this),
                        item = {
                            title: $this.find("title").text(),
                            link: $this.find("link").text(),
                            description: $this.find("description").text(),
                            pubDate: $this.find("pubDate").text(),
                            author: $this.find("author").text()
                    }
                    $('.modal-body').append(`
                    <div class="row">
                    <a href="` + item.link + `">` + item.title + `</a>
                    <p>` + item.description + `</p>
                    <span>` + item.pubDate + `</span>
                    </div>
                    `);
                });
            }
    });

}

// Load categories

$.get("data/categories.json" , function(data, status){
    data.forEach(obj => {
        $('#categories').append(`
            <a onclick="load_cat(` + obj['id'] + `)" class="list-group-item list-group-item-action">` + obj['title'] + `</a>
        `);
    });
});

function load_cat(id) {
    $("#items").html(`
    <div class="spinner-border text-success" role="status">
        <span class="sr-only">در حال بارگزاری...</span>
    </div>
    `);
    $.get("data/category_" + id + ".json" , function(data, status){
        $("#items").html('');
        data.forEach(obj => {
            $('#items').append(`
            <tr>
                <th scope="row">` + obj['index'] + `</th>
                <td>
                <span>
                ` + obj['content'] + `
                </span>
                </td>
                <td>
                <span>
                ` + obj['date'] + `
                </span>
                </td>
                <td>
                <a href="?p=read&c=` + id + `&i=` + obj['index'] + `" class="btn btn-sm btn-danger my-1 my-sm-0">
                    <span class="fas fa-zoom mr-1"></span>
                    دریافت اطلاعات</a>
                </td>
            </tr>
          `);
        });
    });
}